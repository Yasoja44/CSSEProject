'use strict';

const firebase = require('../db');
const orderItems = require('../models/orderItemModel');
const firestore = firebase.firestore();



const getAllItemsByOrder = async(req,res,next) => {
    try{
        const orderItem = await firestore.collection('orderItems').where('OrderId','==',req.params.id);
        const data = await orderItem.get();
        const orderItemArray = [];
        if (data.empty){
            res.status(404).send('No item record found')
        }else{
            data.forEach(doc =>{
                const OrderItem = new orderItems(
                    doc.id,
                    doc.data().OrderId,
                    doc.data().itemId,
                    doc.data().itemName,
                    doc.data().qty,
                    doc.data().sub_total
                );
                orderItemArray.push(OrderItem);
            });
            res.send(orderItemArray);
        }
    }catch(error){
        res.status(400).send(error.message);
    }
}




module.exports = {

    getAllItemsByOrder

}