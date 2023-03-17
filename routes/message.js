// 1 require express
const express = require("express");
const {
  postMessage,
  getMessages,
  deleteMessage,
} = require("../controllers/message");

// 2  express router
const router = express.Router();

//Routes

router.post("/postMessage", postMessage);
router.get("/allMessages", getMessages);

router.delete("/:_id", deleteMessage);

// export
module.exports = router;
