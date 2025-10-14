import { userModel } from "../../schema/user.schema.js";
import { compare } from "bcrypt";
import jwt from 'jsonwebtoken';

export const login = async (request, response) => {
  const body = request.body;
  const JWT_SECRET = process.env.JWT_SECRET

  const email = body.email;
  const password = body.password;

  const user = await userModel.findOne({ email });

  if (user) {
    const hashedPassword = user.password;
    const isValid = await compare(password, hashedPassword);
    if (isValid) {
      const accessToken = jwt.sign({
        data:user
      }, JWT_SECRET, {expiresIn : '1h'});

      response.json(accessToken);
    } else {
      response.status(404).json({ message: "wrong password" });
    }
  } else {
    response.status(404).json({ message: "need to register" });
  }
};
