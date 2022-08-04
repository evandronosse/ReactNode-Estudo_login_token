import User from "../models/User";
import { createPasswordHash } from "../services/auth";
//metodos do user
class UsersController {
  //metodo de listagem
  async index(req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  //metodo show(pesquisa por ID)
  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json();
      }
      return res.json(user);
    } catch (err) {
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  //método de criação de usuario
  async create(req, res) {
    try {
      //buscar dados do front
      const { email, password } = req.body;
      //primeiro verificar se ja existe
      const user = await User.findOne({ email });
      if (user) {
        //retorn res corta a rolagem do app
        return res
          .status(422)
          .json({ message: `User ${email} already exist.` });
      }
      //criptograda o password
      const encryptedPassword = await createPasswordHash(password);

      //Cadastra novo usuario caso inexistente
      const newUser = await User.create({
        email,
        password: encryptedPassword,
      });
      return res.status(200).json(newUser);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  //Atualizar
  async update(req, res) {
    try {
      const { id } = req.params;
      const { email, password } = req.body;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json();
      }
      //criptograda o password
      const encryptedPassword = await createPasswordHash(password);
      await user.updateOne({ email, password: encryptedPassword });
      return res.status(200).json();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json();
      }
      await user.deleteOne();
      return res.status(200).json();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }
}

export default new UsersController();
