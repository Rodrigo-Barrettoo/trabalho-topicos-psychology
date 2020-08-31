import Sequelize from 'sequelize';

import Patient from '../app/models/Patient';
import Psychologist from '../app/models/Psychologist';
import Call from '../app/models/Call';
import AttendanceHistory from '../app/models/AttendanceHistory';

import databaseConfig from '../config/database';

const models = [Patient, Psychologist, Call, AttendanceHistory]

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig)

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
