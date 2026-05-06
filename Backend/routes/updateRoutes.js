const router = require("express").Router();
const { addUpdate, getUpdates } = require("../controllers/updateController");

router.post("/", addUpdate);
router.get("/:bookingId", getUpdates);

module.exports = router;