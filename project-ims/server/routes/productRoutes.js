const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.products);
router.get('/products', (req, res) => {
    res.redirect('/');
});
router.get('/products/new', productController.addProductForm);
router.post('/products/add', productController.addProduct);
router.get('/products/:id', productController.viewProduct);
router.get('/products/:id/edit', productController.editProductForm);
router.put('/products/:id', productController.editProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;