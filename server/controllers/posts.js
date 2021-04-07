import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

export const getPost = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).send(postMessages);
  } catch (error) {
    res.status(404).send(error);
  }
};
export const createPost = async (req, res) => {
  try {
    // The toISOString() method converts a Date object into a string, using the ISO standard.
    // The standard is called ISO-8601 and the format is: YYYY-MM-DDTHH:mm:ss.sssZ
    const post = req.body;
    const newPost = new PostMessage({
      ...post,
      creator: req.userId,
      createdAt: new Date().toISOString(),
    });
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const updatePost = async (req, res) => {
  try {
    // console.log("updatePost req received at backend");
    const _id = req.params.id;
    const post = req.body;
    // console.log("id received at backend:", _id);
    // console.log("post received at backend:", post);
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).send("Id not found");
    }
    const response = await PostMessage.findByIdAndUpdate(
      _id,
      { ...post, _id },
      {
        new: true,
      }
    );
    res.send(response);
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Requested id was not found");
    }
    await PostMessage.findByIdAndRemove(id);
    res.send("post was deleted");
  } catch (error) {}
};

export const likePost = async (req, res) => {
  try {
    const _id = req.params.id;

    //req.userId is coming from the middleware used before calling likePost and it have id
    if (!req.userId) return res.json({ message: "user not authenticaated" });

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.send("requested id was not found");
    }

    const post = await PostMessage.findById(_id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      //like a post
      post.likes.push(req.userId);
    } else {
      //get index of his specific like and  dislike a post
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const likeCountResponse = await PostMessage.findByIdAndUpdate(_id, post, {
      new: true,
    });
    //we have to send proper valid response as this response will be fetched by axios , and it wil update store
    res.json(likeCountResponse);
  } catch (error) {
    console.log(error);
  }
};
