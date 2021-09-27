'use strict';

const firebase = require('../db');
const item = require('../models/itemModel');
const firestore = firebase.firestore();

const addItem = async(req,res,next) => {
    try{
        const data = req.body;
        await firestore.collection('items').doc().set(data);
        res.send('Item saved successfully')
    }catch(error){
        res.status(400).send(error.message);
    }
}

module.exports = {
    addItem
}