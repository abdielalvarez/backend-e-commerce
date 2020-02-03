const MongoConnect = require('../lib/mongo');
const bcrypt = require('bcryptjs');

class UserService {
  constructor() {
    this.mongodb = new MongoConnect()
    this.collection = 'users'
  }

  async getUser({ email }) {
    try {
      const [user] = await this.mongodb.getAll(this.collection, { email })  
      return user
    } catch (error) {
      throw new Error(error);
    }
  }

  async createUser(user) {
    try {
      const { name, lastName, email, password } = user
      // console.log('USER:', user)
      const hashedPassword = await bcrypt.hash(password, 10);

      const createdUser = await this.mongodb.create(this.collection, {
        name, lastName, email, password: hashedPassword
      }) 

      return createdUser
    } catch (error) {
      throw new Error(error);
    }
  }

  async getOrCreateUser({ user }) {
    const queriedUser = await this.getUser({ email: user.email });

    if (queriedUser) {
      return queriedUser;
    }

    await this.createUser({ user });
    return await this.getUser({ email: user.email });
  }

  async updateUserById( id, { ...data }) {
    try {
      const candyId = await this.mongodb.updateUserById(this.collection, id, data);
      return candyId;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = UserService;