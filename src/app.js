import express from "express";
import routes from "./routes";
import cors from 'cors';
import path from 'path';

import "./database";

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.set("view engine", "ejs");
    this.server.set("views", path.join(__dirname, "views"));
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
