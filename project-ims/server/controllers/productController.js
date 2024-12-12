const mongoose = require('mongoose');
const Product = require('../../models/product');

mongoose.connect('mongodb://127.0.0.1:27017/inventory')
        .then(() => {
            console.log('Connection Open');
        })
        .catch(err => {
            console.log(`Error: ${err}`);
        })

exports.products = async (req, res) => {
    const products = await Product.find({});
    res.render('products/', {products});
}

exports.addProductForm = (req, res) => {
    res.render('products/new');
}

exports.addProduct = async (req, res) => {
    const product = new Product(req.body);
    // console.log(product);
    await product.save();
    res.redirect('/');
}

exports.viewProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('products/view', {product});
}

exports.editProductForm = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('products/edit', {product});
}

exports.editProduct = async (req, res) => {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, {...req.body});
    await product.save();
    res.redirect(`/products/${id}`);
}

exports.deleteProduct = async(req, res) => {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    res.redirect('/');
}