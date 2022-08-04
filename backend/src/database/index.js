import mongoose from "mongoose";

import config from "../config/database";

class Database {

  
  constructor() {

    this.connection = mongoose.connect(config.url, {
      //párametros de conexão
      // useNetUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
