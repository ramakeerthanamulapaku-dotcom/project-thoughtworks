const express =
  require("express");

const router =
  express.Router();

const protect =
  require("../middleware/authMiddleware");

const {

  sendMessage,

  getMessages,

  markAsRead,

  deleteMessage,

} = require(
  "../controllers/chatController"
);

// ==========================
// SEND MESSAGE
// ==========================

router.post(
  "/send",

  protect,

  sendMessage
);

// ==========================
// GET CHAT MESSAGES
// ==========================

router.get(
  "/:bookingId",

  protect,

  getMessages
);

// ==========================
// MARK MESSAGE AS READ
// ==========================

router.put(
  "/read/:id",

  protect,

  markAsRead
);

// ==========================
// DELETE MESSAGE
// ==========================

router.delete(
  "/delete/:id",

  protect,

  deleteMessage
);

module.exports = router;