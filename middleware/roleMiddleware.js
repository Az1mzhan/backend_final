import "dotenv/config";
import jwt from "jsonwebtoken";

export default (roles) => {
  return (req, res, next) => {
    if ((req.method = "OPTIONS")) next();

    try {
      const token = req.headers.authorization.split(" ")[1];

      if (!token)
        return res.status(403).send({ result: "The user is not authorized" });

      const { roles: userRoles } = jwt.verify(token, process.env.JWT_KEY);
      let hasRole = false;

      userRoles.forEach((role) => {
        if (roles.includes(role)) hasRole = true;
      });
    } catch (err) {
      console.error(err);

      res.status(403).send({ result: "Status is denied" });
    }
  };
};
