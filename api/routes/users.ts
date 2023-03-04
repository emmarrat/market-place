import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User';

const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      displayUsername: req.body.displayUsername,
      phone: req.body.phone,
      password: req.body.password,
    });

    user.generateToken();
    await user.save();
    return res.send({message: 'Registered successfully!', user});
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

usersRouter.post('/sessions', async (req, res, next) => {
  const user = await User.findOne({username: req.body.username});

  if (!user) {
    return res.status(400).send({error: 'Username not found'});
  }

  const isMatch = await user.checkPassword(req.body.password);

  if (!isMatch) {
    return res.status(400).send({error: 'Password is wrong'});
  }

  try {
    user.generateToken();
    await user.save();
    return res.send({message: 'Username and password correct!', user});

  } catch (e) {
    return next(e);
  }
});


usersRouter.delete('/sessions', async (req, res, next) => {
  try {
    const token = req.get('Authorization');
    const success = {message: 'OK!'};

    if (!token) {
      return res.send(success)
    }
    const user = await User.findOne({token});

    if (!user) {
      return res.send(success);
    }

    user.generateToken();
    await user.save();
    return res.send(success);

  } catch (e) {
    return next(e);
  }
});

export default usersRouter;