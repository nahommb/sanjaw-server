import jwt from "jsonwebtoken";

export const generateToken = ({id,email}) => {

  const token = jwt.sign(
    { id: id, email: email },
     process.env.JWT_SECRET,
    { expiresIn: "12h" }
  );

  return token;
};
