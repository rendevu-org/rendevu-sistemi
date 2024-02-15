const rendevu = require("../models/rendevu");
const { StatusCodes } = require("http-status-codes");

const createRendevu = async (req, res) => {
  try {
    const newRendevu = await rendevu.create(req.body);
    res.status(StatusCodes.CREATED).json({ newRendevu });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "createRendevu error : " + error });
  }
};

const getAllRendevu = async (req, res) => {
  try {
    const allRendevu = await rendevu.find().populate("person");
    res.status(StatusCodes.OK).json({ allRendevu });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "getAllRendevu error : " + error });
  }
};

const deleteRendevu = async (req, res) => {
  try {
    const { id: rendevuId } = req.params;
    const deletedRendevu = await rendevu.findByIdAndDelete(rendevuId);
    if (!deletedRendevu) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `No rendevu with id : ${rendevuId}` });
    }
    res.status(StatusCodes.OK).json({ deletedRendevu });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "deleteRendevu error : " + error });
  }
};

module.exports = {
  createRendevu,
  getAllRendevu,
  deleteRendevu,
};
