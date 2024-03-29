import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { validationResult } from "express-validator";
import { generateAccessToken } from "../jwt/generateAccessToken.js";
import axios from "axios";
import Role from "../models/Role.js";

class AuthController {
  getRegisterForm = (req, res) => {
    try {
      res.render("pages/register");
    } catch (err) {
      console.error(err);

      res.status(400).send({
        result: "Couldn't render the registration form",
      });
    }
  };

  getLoginForm = (req, res) => {
    try {
      res.render("pages/login");
    } catch (err) {
      console.error(err);

      res.status(400).send({
        result: "Couldn't retrieve the login form",
      });
    }
  };

  register = async (req, res) => {
    try {
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty())
        return res.status(400).send({ result: validationErrors.array() });

      const {
        username,
        password,
        email,
        firstName,
        lastName,
        birthday,
        country,
        isAdmin,
      } = req.body;
      const isRegistered = await User.findOne({ username });

      if (isRegistered) {
        return res
          .status(400)
          .send({ result: "The user with this username already exists" });
      }

      const hashPassword = bcrypt.hashSync(password, 7);

      let roles = [];
      const mainRole = isAdmin ? "ADMIN" : "USER";

      roles = [...roles, mainRole];

      const user = new User({
        username,
        password: hashPassword,
        roles: roles,
        email: email,
        firstName: firstName,
        lastName: lastName,
        birthday: birthday,
        country: country,
      });

      await user.save();

      res
        .status(200)
        .send({ result: "The user has been successfully registered" });
    } catch (err) {
      console.error(err);

      res.status(400).send({ result: "Registration error" });
    }
  };

  login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      const validPassword = bcrypt.compareSync(password, user.password);

      if (!user || !validPassword)
        return res
          .status(400)
          .send({ result: "Invalid login or (and) password" });

      const token = generateAccessToken(user._id, user.roles);

      res.status(200).send({ token });
    } catch (err) {
      console.error(err);

      res.status(400).json({ result: "Login error" });
    }
  };

  getAdminPage = async (req, res) => {
    try {
      const users = await User.find({});

      if (!users || users.length === 0)
        return res.status(400).send({ result: "Users are not registered" });

      res.render("pages/admin", { users: users });
    } catch (err) {
      console.error(err);

      res.status(403).send({ result: "Access is denied" });
    }
  };
}

export default new AuthController();
