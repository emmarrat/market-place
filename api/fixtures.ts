import mongoose from "mongoose";
import config from "./config";
import crypto from "crypto";
import User from "./models/User";
import Category from "./models/Category";


const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('categories');
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
};

  void run();