import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/posts.js";
import userRoutes from "./routes/user.js";
import dotenv from "dotenv";

const app = express();
app.use(cors());
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use("/posts", router);
app.use("/user", userRoutes);

// const CONNECTION_URL =
//   "mongodb+srv://memories:04212104@cluster0.peeqi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
  })
  .then(() => app.listen(PORT, () => console.log(`Connected to port ${PORT}`)))
  .catch((e) => console.log(e));

mongoose.set("useFindAndModify", false);
