const getConnection = require('../connection')
 
 const menu = (req,res) =>{
    //fetch product from database
    res.send("My Menu")
}

 const placeOrder = (req,res) =>{
    //place an order from menu
}

//Export
module.exports = {
    menu,
    placeOrder
};