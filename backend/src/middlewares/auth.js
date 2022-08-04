import jwt from "jsonwebtoken";
import authConfig from "../config/auth";
import { promisify } from "util";

export default async (req, res, next) => {
  //recuperar o token
  const authHeader = req.headers.authorization;
  //verifica se tem token
 
  if (!authHeader) {
    return res.status(401).json({ error: "Token was not provided" });
  }
  //coloco o espaço para uma separação e pegar apenas o token
  const [, token] = authHeader.split(' ');
 
  try {
    //pega tudo que tinha e embute em tudo que eu ja tinha
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
   
    req.userId = decoded.id;
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token." });
  }
};
