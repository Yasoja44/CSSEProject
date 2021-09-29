const express = require('express');
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




//policy one routes
router.post('/policyOne',addPolicy);
router.get('/policyOnes',getAllPolicyOne);
router.get('/policyOne/:id',getOnePolicyOne);
router.put('/policyOne/:id',updatePolicyOne);
router.delete('/policyOne/:id',deletePolicyOne);


module.exports = {
    routes: router
}