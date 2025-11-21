import jwt from "jsonwebtoken.js";

export const generateToken = (user) => {

  const token = jwt.sign(
    { id: user.id, email: user.email },
     process.env.JWT_SECRET,
    { expiresIn: "12h" }
  );

  return token;
};
