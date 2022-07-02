import Sequelize from 'sequelize';
import Address from '../app/models/address';
import Image from '../app/models/image';
import Store from '../app/models/store';
import User from '../app/models/user';
import PetType from '../app/models/pet_type'; 
import Breed from '../app/models/breed';

import databaseConfig from '../config/database';
import Pet from '../app/models/pet';

const models = 
[
  Address, 
  User, 
  Image, 
  Store, 
  PetType,
  Breed,
  Pet
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
