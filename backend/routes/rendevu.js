const express = require("express");
const router = express.Router();

const {
  createRendevu,
  deleteRendevu,
  getAllRendevu,
} = require("../controllers/rendevu");

router.route("/").post(createRendevu).get(getAllRendevu);
router.route("/delete/:id").delete(deleteRendevu);

module.exports = router;
