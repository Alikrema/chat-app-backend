const router = require("express").Router();
const message = require("../controllers/messages");

router.get("/get-room-messages/:chatRoomId", message.getChatRoomMessages);

module.exports = router;
