const express =
require("express");

const router =
express.Router();

const protect =
require("../middleware/authMiddleware");

const {

  getUserStats,

  getWorkerStats,

} = require(
  "../controllers/dashboardController"
);

console.log(getUserStats);
console.log(getWorkerStats);


// ==========================
// USER DASHBOARD
// ==========================

router.get(

  "/user-stats",

  protect,

  getUserStats
  

);

// ==========================
// WORKER DASHBOARD
// ==========================

router.get(

  "/worker-stats",

  protect,

  getWorkerStats

 

);

module.exports = router;