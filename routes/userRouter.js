const express = require("express");
const router = express.Router();
const {menu, placeOrder} = require("../controllers/userController");

router.get("/",menu)
router.post("/order",placeOrder)

module.exports = router