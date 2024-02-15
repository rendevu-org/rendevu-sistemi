const Person = require("../models/person");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  try {
    const person = await Person.create(req.body);
    res.status(StatusCodes.CREATED).json({
      id: person._id,
      name: person.name + " " + person.lastName,
      email: person.email,
      phone: person.phone,
    });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "register error : " + error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const person = await Person.findOne({ email });
    if (!person) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "person not found" });
    }

    const isMatch = password === person.password;
    if (!isMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "wrong password" });
    } else {
      res.status(StatusCodes.OK).json({ person });
    }
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "login error : " + error });
  }
};

module.exports = {
  register,
  login,
};
