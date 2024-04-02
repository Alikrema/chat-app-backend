const router = require("express").Router();
const chatRoom = require("../controllers/chat-room");
const auth = require("../middleware/auth");

router.get("/get-room/:id", auth, chatRoom.getRoom);
router.get("/get-rooms", auth, chatRoom.getRooms);
router.post("/create-room", auth, chatRoom.createRoom);

module.exports = router;
