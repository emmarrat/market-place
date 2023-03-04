import mongoose from "mongoose";
import config from "./config";
import crypto from "crypto";
import User from "./models/User";


const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('comments');
    await db.dropCollection('posts');
    await db.dropCollection('users');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [user1, user2] = await User.create({
    username: "user1",
    displayUsername: "Walter White",
    password: "123",
    token: crypto.randomUUID()
  }, {
    username: "user2",
    displayUsername: "Jesse Pinkman",
    password: "123",
    token: crypto.randomUUID()
  });

};

  void run();