import mongoose from "mongoose";
import config from "./config";
import crypto from "crypto";
import User from "./models/User";
import Category from "./models/Category";
import Product from "./models/Product";


const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('categories');
    await db.dropCollection('products');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [user1, user2] = await User.create({
    username: "user1",
    displayUsername: "Walter White",
    phone: "0500500500",
    password: "123",
    token: crypto.randomUUID()
  }, {
    username: "user2",
    displayUsername: "Jesse Pinkman",
    phone: "0700755755",
    password: "123",
    token: crypto.randomUUID()
  });

  const [cat1, cat2, cat3] = await Category.create({
    title: "Phones"
  }, {
    title: "Laptops"
  },{
    title: "Accessories"
  });

  await Product.create({
    customer: user1,
    category: cat1,
    title: "Iphone 14",
    description: "Color: white, Memory: 256gb",
    price: 870,
    image: "fixtures/iphone14.jpg"
  }, {
    customer: user2,
    category: cat1,
    title: "Iphone 14 Pro",
    description: "Color: gold, Memory: 1tb",
    price: 1100,
    image: "fixtures/iphone14pro.jpg"
  }, {
    customer: user1,
    category: cat2,
    title: "MacBook Air 2020",
    description: "Color: gold, Memory: 512gb, chip: M1",
    price: 900,
    image: "fixtures/macbookair.jpg"
  }, {
    customer: user1,
    category: cat2,
    title: "MacBook Pro 2022",
    description: "Color: space-gray, Memory: 2tb, chip: M2",
    price: 1750,
    image: "fixtures/macbookprom2.jpg"
  }, {
    customer: user2,
    category: cat3,
    title: "Magic mouse",
    description: "Color: gray",
    price: 100,
    image: "fixtures/magicmouse.jpg"
  }, {
    customer: user2,
    category: cat3,
    title: "Magic keyboard",
    description: "Color: gray",
    price: 250,
    image: "fixtures/magickeyboard.jpg"
  })
};

  void run();