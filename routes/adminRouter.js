const express = require("express");
const router = express.Router();
const {menu, placeOrder, cancelOrder, orderHistory, getBill, getInventory,addItem, updateItem, deleteitem } = require("../Controllers/admin_controller")

router.get("/",menu)
router.post("/order",placeOrder)
router.delete("/order/:id",cancelOrder)
router.get("/order/history",orderHistory)
router.get("/order/:id/download",getBill)
router.get("/inventory",getInventory)
router.post("/inventory/item",addItem)
router.put("/inventory/item/:id",updateItem)
router.delete("/inventory/item/:id",deleteitem)

module.exports = router