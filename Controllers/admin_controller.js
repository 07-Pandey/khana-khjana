const getConnection = require('../connection.js');
//amit
const menu = (req,res) =>{
    //fetch product from database
    const connection = getConnection();
    const sql = `SELECT * FROM inventory`
    connection.query(sql ,(err,result)=>{
        if(err) {
            res.status(500).send('Internal Server Error')
        };
        res.json(result)
    })

    res.send("My Menu")
}
//amit
const placeOrder = (req,res) =>{
    //place an order from menu
}

const cancelOrder = (req,res) =>{
    //admin can cancle an order
    res.send("My mymynmyn")

}

const orderHistory = (req,res) =>{
    //admin can acess previous order history
}

const getBill = (req,res) =>{
    //admin can download previos bill for particullar order
}

const getInventory  = (req,res) =>{
    //admin can access inventory all items
}

const addItem = (req,res) =>{
    //admin can add new item in inventory
}

const updateItem = (req,res) =>{
    //admin can update perticular iem
}

const deleteitem = (req,res) =>{
    //admin can delete perticular item
};

module.exports = {
    menu,
    placeOrder,
    cancelOrder,
    orderHistory,
    getBill,
    getInventory,
    addItem,
    updateItem,
    deleteitem
};

