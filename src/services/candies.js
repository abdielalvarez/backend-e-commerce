const MongoConnect = require('../lib/mongo');

class CandyService {
  constructor() {
    this.mongodb = new MongoConnect()
    this.collection = 'candies'
  }

  async getCandies() {
    try {
      const candies = await this.mongodb.getAll(this.collection, {});
      return candies;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async getCandyById(id) {
    try {
      const candy = await this.mongodb.get(this.collection, id);
      return candy;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async createCandy(candy) {
    try {
      const id = await this.mongodb.create(this.collection, candy);
      return id;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateCandyById( id, { ...data }) {
    try {
      const candyId = await this.mongodb.update(this.collection, id, data);
      return candyId;
    } catch (error) {
      throw new Error(error);
    }
  }

  async patchCandyById( id, { ...data }) {
    try {
      const candyId = await this.mongodb.patch(this.collection, id, data);
      return candyId;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteCandyById(id) {
    try {
      await this.mongodb.delete(this.collection, id);
      return id;
    } catch (error) {
      throw new Error(error);
    }
  }

}

module.exports = CandyService;