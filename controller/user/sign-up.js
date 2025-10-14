import { hash } from "bcrypt";

import { userModel } from "../../schema/user.schema.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET

export const signup = async (request, response) => {
  const body = request.body;

  const username = body.username;
  const email = body.email;
  const password = body.password;
  const saltRound = 10;
  const hashedPassword = await hash(password, saltRound);

  const isExisting = await userModel.findOne({ email });

  if (isExisting) {
    response
      .status(404)
      .json({ message: "user already exists please use another email" });
  } else {
    const createdUser = await userModel.create({
      username: username,
      email: body.email,
      password: hashedPassword,
    });

    const accessToken = jwt.sign(
      {
        data: createdUser,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    response.json(accessToken);
  }
};
