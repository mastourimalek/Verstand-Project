// 1 require express
const express = require("express");
const { postOrder, getOrders, deleteOrder } = require("../controllers/order");

// 2  express router
const router = express.Router();

//Routes

router.post("/postOrder",postOrder);
router.get('/allOrders', getOrders)

router.delete('/:_id', deleteOrder);

// export
module.exports = router;