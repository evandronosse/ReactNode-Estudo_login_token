import bcrypt from "bcryptjs";

export const createPasswordHash = async (password) => {
  return bcrypt.hash(password, 8)
}

export const checkPassword = (user, password) => {
  //comparando o que está entrando com o que ja tenho no user
  return bcrypt.compare(password, user.password);
}