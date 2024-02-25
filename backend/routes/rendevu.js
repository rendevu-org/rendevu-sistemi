const express = require("express");
const router = express.Router();

const {
  createRendevu,
  deleteRendevu,
  getAllRendevu,
  getRendevu,
} = require("../controllers/rendevu");

router.route("/").post(createRendevu).get(getAllRendevu);
router.route("/delete/:id").delete(deleteRendevu);
router.route("/getRendevu/:id").get(getRendevu);

module.exports = router;
