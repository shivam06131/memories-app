import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (!existingUser)
      return res.status(404).json({ message: "user not found" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "invalid Crdintials" });

    const token = jwt.sign(
      //jwt.sign(payload , secret , expiry)
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong at server/controllers/user.sj",
      error,
    });
  }
};

export const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(404).json({ message: "user already exits" });

    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ message: "pasword does not match , try again" });

    const hashedPassword = await bcrypt.hash(password, 12);
    //await is important
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    // sign(first argument is payload , second is secret , third is expires in)
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong at server/controllers/user.sj",
      error,
    });
  }
};
