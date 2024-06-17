const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../Controllers/goalController");
const {protect} = require("../Middleware/authMiddleWare")


// Crud route calling
router.route("/").get(protect,getGoals).post(protect,setGoal);
router.route("/:id").delete(protect,deleteGoal).put(protect,updateGoal);


module.exports = router;
