import User from "../models/User";
import Repository from "../models/Repository";

class RepositoriesController {
  //metodo de listagem
  async index(req, res) {
    try {
      //pega o user_id que vem da URL
      const { user_id } = req.params;
      const user = await User.findById(user_id);

      if (!user) {
        return res.status(404).json();
      }

      const repositories = await Repository.find({
        userId: user_id,
      });

      return res.json(repositories);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }
  async create(req, res) {
    try {
      //pega o user_id que vem da URL
      const { user_id } = req.params;
      //pega os itens abaixo do body
      const { name, url } = req.body;
      //verifico se ele existe
      const user = await User.findById(user_id);
      //verifica se o user ja existe
      if (!user) {
        return res.status(404).json();
      }
      //carrega o repositorio
      const repository = await Repository.findOne({
        userId: user_id,
        name,
      });
      //verifica se o repository ja existe
      if (repository) {
        return res
          .status(422)
          .json({ message: `Repository ${name} 'already exists.` });
      }
      //cria um repositorio
      const newRepository = await Repository.create({
        name,
        url,
        userId: user_id,
      });
      return res.status(201).json(newRepository);
    } catch (err) {}
  }
  async destroy(req, res) {
    try {
      //pega o user_id que vem da URL
      const { user_id, id } = req.params;
      //verifico se ele existe
      const user = await User.findById(user_id);
      //verifica se o user ja existe
      if (!user) {
        return res.status(404).json();
      }
      //carrega o repositorio
      const repository = await Repository.findOne({
        userId: user_id,
        id,
      });
      if (!repository) {
        return res.status(404).json();
      }
      await repository.deleteOne();
      return res.status(200).json();
    } catch (err) {}
  }
}
export default new RepositoriesController();
