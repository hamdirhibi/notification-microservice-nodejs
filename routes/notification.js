const express = require("express");
const router = express.Router();
const notificationControlller = require("../controllers/notification");
const checkAuth = require("../middleware/checkAuth");




router.post("/", checkAuth, notificationControlller.newNotification);
router.put("/:notificationId", checkAuth, notificationControlller.newNotification);
router.get("/:userId", checkAuth ,  notificationControlller.getNotifications);
router.get("/", checkAuth ,  notificationControlller.getall);


module.exports = router ; 
    