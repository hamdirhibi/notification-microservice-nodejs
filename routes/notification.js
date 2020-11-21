const express = require("express");
const router = express.Router();
const notificationControlller = require("../controllers/notification");
const checkAuth = require("../middleware/checkAuth");




router.post("/", checkAuth, notificationControlller.newNotification);
router.get("/user/:id", checkAuth ,  notificationControlller.getNotificationsByUser);
router.get("/company/:id", checkAuth ,  notificationControlller.getNotificationsByCampany);


module.exports = router ; 
    