import jwt from "jsonwebtoken";

export default (req, res, next) => {
  if (req.method === "OPTIONS") next();

  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token)
      return res.status(403).send({ result: "The user is not authorized" });

    req.user = jwt.verify(token, process.env.JWT_KEY);
    next();
  } catch (err) {
    console.error(err);

    res.status(403).send({ result: "The user is not authorized" });
  }
};
