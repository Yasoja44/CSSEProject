'use strict';

const firebase = require('../db');
const order = require('../models/orderModel');
const firestore = firebase.firestore();



const getAllOrders = async(req,res,next) => {
    try{
        const orders = await firestore.collection('orders');
        const data = await orders.get();
        const orderArray = [];
        if (data.empty){
            res.status(404).send('No order record found')
        }else{
            data.forEach(doc =>{
                const Order = new order(
                    doc.id,
                    doc.data().orderName,
                    doc.data().supplierName,
                    doc.data().status,
                    doc.data().deliveryStatus,
                    doc.data().confirmation,
                    doc.data().Total
                );
                orderArray.push(Order);
            });
            res.send(orderArray);
        }
    }catch(error){
        res.status(400).send(error.message);
    }
}

const getOneOrder = async(req,res,next) => {
    try{
        const id = req.params.id;
        const order = await firestore.collection('orders').doc(id);
        const data = await order.get();
        if (!data.exists){
            res.status(404).send('No order record found')
        }else{
            res.send(data.data());
        }
    }catch(error){
        res.status(400).send(error.message);
    }
}

const updateOrder= async(req,res,next) => {
    try{
        const id = req.params.id;
        const data = req.body;

        const order = await firestore.collection('orders').doc(id);
        await order.update(data);
        res.status(200).send('Order data updated successfully');

    }catch(error){
        res.status(400).send(error.message);
    }
}



module.exports = {

    getAllOrders,
    getOneOrder,
    updateOrder,

}