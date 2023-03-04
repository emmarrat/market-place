import mongoose, {Types} from 'mongoose';
import User from "./User";
import Category from "./Category";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: "Customer not found!"
    }
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Category.findById(value),
      message: "Category not found!"
    }
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0.01, "The price cannot be less than 0.01"]
  }
});

const Post = mongoose.model('Post', ProductSchema);

export default Post;

