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

    if(!req.file || !req.body.title || !req.body.description || !req.body.price || !req.body.category) {
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

export default productsRouter;