const Order = require("../models/Order");

exports.postOrder = async (req, res) => {
  
  try {
    const { email, productname, adress, phone } = req.body;
    const newOrder = new Order({ email, productname, adress, phone } );
    await newOrder.save();
    res.status(200).send({ msg: "order added successfully", newOrder });
  } catch (error) {
    res.status(400).send({ msg: "cannot add order!!!", error });
  }
};

exports.getOrders = async (req,res) => {
    try {
        const listOrders = await Order.find();
        res.status(200).send({msg : 'This is the list Orders',  listOrders})
        
    } catch (error) {
        res.status(400).send({msg : 'cannot get all Orders', error})
    }
  }


  exports.deleteOrder = async (req,res) => {
    try {
        const{_id}= req.params;
        await Order.findOneAndDelete({_id})
        res.status(200).send({msg : "Order deleted"})
    } catch (error) {
        res.status(400).send({msg : "cannot delete this Order", error})      
    }
}       
