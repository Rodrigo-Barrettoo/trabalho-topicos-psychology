import express from "express";
import routes from "./routes";
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
    this.server.use(function (req, res, next) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      next();
    });
    this.server.set("view engine", "ejs");
    this.server.set("views", path.join(__dirname, "views"));
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
