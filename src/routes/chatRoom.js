const router = require("express").Router();
const chatRoom = require("../controllers/chat-room");

router.get("/get-room/:id", chatRoom.getRoom);
router.get("/get-rooms", chatRoom.getRooms);
router.post("/create-room", chatRoom.createRoom);

module.exports = router;
