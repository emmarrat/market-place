import express from "express";
import Category from "../models/Category";
import {ICategory} from "../types";

const categoriesRouter = express.Router();

categoriesRouter.get('/', async (req, res) => {
  try {
    const categories: ICategory[] = await Category.find();
    return res.send(categories);
  } catch {
    return res.sendStatus(500);
  }
});


export default categoriesRouter;
