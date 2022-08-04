import express, { Router } from "express";
import cors from "cors";
import routes from "./routes";
import "./database";

class App {
  //para quando chamar o app a primeira vez ja inclui tudo com o constructor
  //armazenar informações de fora que passamos
  //entre parantes do constructor, se vc colocar {usuario}, dentro do construcotr coloca this.id=usuario.id, quando chamar, a classe vira um obj e atribuir tudo a ele
  //exemplo:
  //   constructor(usuario) {
  //     this.id=usuario.id;
  //   }

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }
  //configurar middleware
  middlewares() {
    this.server.use(express.json());
    //configs para origens
    this.server.use(cors());
  }
  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
