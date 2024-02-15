const express = require("express");
const router = express.Router();

const {
  createRendevu,
  deleteRendevu,
  getAllRendevu,
} = require("../controllers/rendevu");

router.route("/").post(createRendevu).get(getAllRendevu);
router.route("/:id").delete(deleteRendevu);
