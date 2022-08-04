import jwt from "jsonwebtoken";
import User from "../models/User";
import { checkPassword } from "../services/auth";
import authConfig from "../config/auth";

class SessionController {
  async create(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    //verificar se o usuario existe
    if (!user) {
      return res.status(401).json({ error: "User / password invalid" });
    }

    //verifica se o usuario usou a senha correta
    if (!checkPassword(user, password)) {
      return res.status(401).json({ error: "User / password invalid" });
    }
      
    //criar o token
    const { id } = user;
    return res.json({
        user: {
            id,
            email
        },
        token: jwt.sign({ id }, authConfig.secret, {
            expiresIn: authConfig.expiresIn,
        })
    });
  }
}

export default new SessionController();
