import express from "express";
import routes from "./routes";
import cors from 'cors';
var path = require("path");

import "./database";

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
<<<<<<< HEAD
    this.server.use(function (req, res, next) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      next();
    });
=======
    this.server.use(cors());
>>>>>>> 24271f530d2f24d9806d5a4e722e3bb3727de8f9
    this.server.set("view engine", "ejs");
    this.server.set("views", path.join(__dirname, "views"));
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
