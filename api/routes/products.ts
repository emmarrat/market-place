import express from "express";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";
import {IProduct} from "../types";
import Product from "../models/Product";

const productsRouter = express.Router();


productsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    if (!req.file || !req.body.title || !req.body.description || !req.body.price || !req.body.category) {
      return res.status(500).send({message: "all fields are required!"})
    }

    const productData: IProduct = {
      customer: user._id,
      category: req.body.category,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      image: req.file.filename,
    };

    const product = new Product(productData);

    await product.save();
    return res.send(product);

  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

productsRouter.get('/', async (req, res) => {
  try {
    const queryCategory = req.query.category as string;

    if (queryCategory) {
      const sortedProducts = await Product.find({category: queryCategory}, '_id title price image');
      return res.send(sortedProducts);
    }
    const products = await Product.find({}, '_id title price image');
    return res.send(products);
  } catch {
    return res.sendStatus(500);
  }
});

productsRouter.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    const products = await Product.findById(productId)
      .populate({path: 'customer', select: ['displayUsername', 'phone']})
      .populate({path: 'category', select: 'title'});
    return res.send(products);
  } catch {
    return res.sendStatus(500);
  }
});

productsRouter.delete('/:id', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const productId = req.params.id;
    const productById = await Product.findById(productId);
    if (!productById) {
      return res.status(500).send({error: 'Product not found!'});
    }

    const product = await Product.findOne({_id: productId, customer: user._id});

    if (!product) {
      return res.status(403).send({error: 'Access for deleting denied!'});
    }
    const deletedProduct = await product.deleteOne();

    res.send({message: 'Product deleted', deletedProduct})
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});


export default productsRouter;