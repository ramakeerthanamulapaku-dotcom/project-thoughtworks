const router = require("express").Router();

router.post("/", (req, res) => {
  res.send("Payment success (dummy)");
});

module.exports = router;