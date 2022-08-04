import { Router } from "express";
import helloController from "./controllers/helloController";
import UsersController from "./controllers/usersController";
import RepositoriesController from "./controllers/RepositoriesController";
import auth from "./middlewares/auth";
import SessionsController from "./controllers/sessionController";

const routes = new Router();

//Constroller publico
routes.post('/sessions', SessionsController.create);
routes.get("/hello", helloController.index);

//middleware de validação
routes.use(auth);

//Constroller privado

//RESTfull
//listagem sempre index
routes.get("/users", UsersController.index);
//quando entra um parametro de pesquisa, usar o show
routes.get("/users/:id", UsersController.show);
//Criar um novo usuario
routes.post("/users", UsersController.create);
//atualizar
routes.put("/users/:id", UsersController.update);
//delete
routes.delete("/users/:id", UsersController.destroy);

//repositories
routes.get("/users/:user_id/repositories", RepositoriesController.index);
routes.post("/users/:user_id/repositories", RepositoriesController.create);
routes.delete("/users/:user_id/repositories", RepositoriesController.destroy);

export default routes;
