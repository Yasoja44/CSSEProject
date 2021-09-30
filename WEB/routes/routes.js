const express = require('express');
const {deleteItem} = require("../controllers/itemController");
const {getAllItem} = require("../controllers/itemController");
const {getOneItem} = require("../controllers/itemController");
const {updateItem} = require("../controllers/itemController");
const {getAllItemsBySuppliers} = require("../controllers/itemController");
const {addSupplier,getAllSuppliers,getOneSupplier,updateSupplier,deleteSupplier} = require('../controllers/supplierController');
const {addItem} = require('../controllers/itemController')
const {addPolicy,getAllPolicyOne,getOnePolicyOne,updatePolicyOne,deletePolicyOne} = require('../controllers/policyOneController');



const router = express.Router();

//supplier routes
router.post('/supplier',addSupplier);
router.get('/suppliers',getAllSuppliers);
router.get('/supplier/:id',getOneSupplier);
router.put('/supplier/:id',updateSupplier);
router.delete('/supplier/:id',deleteSupplier);

//item routes
router.post('/item',addItem);
router.get('/items',getAllItem);
router.get('/item/:id',getOneItem);
router.put('/item/:id',updateItem);
router.delete('/item/:id',deleteItem);
router.get('/getAllItemsBySuppliers/:id',getAllItemsBySuppliers);



//policy one routes
router.post('/policyOne',addPolicy);
router.get('/policyOnes',getAllPolicyOne);
router.get('/policyOne/:id',getOnePolicyOne);
router.put('/policyOne/:id',updatePolicyOne);
router.delete('/policyOne/:id',deletePolicyOne);


module.exports = {
    routes: router
}
