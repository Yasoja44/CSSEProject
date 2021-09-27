const express = require('express');
const {addSupplier,getAllSuppliers,getOneSupplier,updateSupplier,deleteSupplier} = require('../controllers/supplierController');
const {addItem} = require('../controllers/itemController')


const router = express.Router();

//supplier routes
router.post('/supplier',addSupplier);
router.get('/suppliers',getAllSuppliers);
router.get('/supplier/:id',getOneSupplier);
router.put('/supplier/:id',updateSupplier);
router.delete('/supplier/:id',deleteSupplier);

//item routes
router.post('/item',addItem);


module.exports = {
    routes: router
}