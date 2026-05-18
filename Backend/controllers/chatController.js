const Message =
  require("../models/Message");

const Booking =
  require("../models/Booking");

// ==========================
// SEND MESSAGE
// ==========================

const sendMessage =
  async (req, res) => {

    try {
      
       console.log(req.body);
      console.log(req.user);


      const {

        bookingId,

        receiverId,

        text,

        image,

        messageType,

      } = req.body;

      // VALIDATION
      if (
        !bookingId ||
        !receiverId
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Missing required fields",

        });

      }

      // CHECK BOOKING
      const booking =
        await Booking.findById(
          bookingId
        );

      if (!booking) {

        return res.status(404).json({

          success: false,

          message:
            "Booking not found",

        });

      }

      // CREATE MESSAGE
      const message =
        await Message.create({

          bookingId,

          senderId:
            req.user._id,

          receiverId,

          text:
            text || "",

          image:
            image || "",

          messageType:
            messageType ||
            "text",

        });

      // POPULATE USER
      const populatedMessage =
        await Message.findById(
          message._id
        )

        .populate(
          "senderId",
          "name profilePic role"
        )

        .populate(
          "receiverId",
          "name profilePic role"
        );

      res.status(201).json({

        success: true,

        message:
          populatedMessage,

      });

    } catch (error) {

      console.log(
        "SEND MESSAGE ERROR:",
        error
      );

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

// ==========================
// GET CHAT MESSAGES
// ==========================

const getMessages =
  async (req, res) => {

    try {

      const bookingId =
        req.params.bookingId;

      const messages =
        await Message.find({

          bookingId,

        })

        .populate(
          "senderId",
          "name profilePic role"
        )

        .populate(
          "receiverId",
          "name profilePic role"
        )

        .sort({
          createdAt: 1,
        });

      res.status(200).json({

        success: true,

        messages,

      });

    } catch (error) {

      console.log(
        "GET MESSAGE ERROR:",
        error
      );

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

// ==========================
// MARK AS READ
// ==========================

const markAsRead =
  async (req, res) => {

    try {

      const message =
        await Message.findById(
          req.params.id
        );

      if (!message) {

        return res.status(404).json({

          success: false,

          message:
            "Message not found",

        });

      }

      message.isRead = true;

      await message.save();

      res.status(200).json({

        success: true,

        message:
          "Message marked as read",

      });

    } catch (error) {

      console.log(
        "READ MESSAGE ERROR:",
        error
      );

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

// ==========================
// DELETE MESSAGE
// ==========================

const deleteMessage =
  async (req, res) => {

    try {

      const message =
        await Message.findById(
          req.params.id
        );

      if (!message) {

        return res.status(404).json({

          success: false,

          message:
            "Message not found",

        });

      }

      // ONLY SENDER CAN DELETE
      if (
        message.senderId.toString() !==
        req.user._id.toString()
      ) {

        return res.status(403).json({

          success: false,

          message:
            "Unauthorized",

        });

      }

      await message.deleteOne();

      res.status(200).json({

        success: true,

        message:
          "Message deleted",

      });

    } catch (error) {

      console.log(
        "DELETE MESSAGE ERROR:",
        error
      );

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

// ==========================
// EXPORTS
// ==========================

module.exports = {

  sendMessage,

  getMessages,

  markAsRead,

  deleteMessage,

};