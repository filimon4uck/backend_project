import express from "express";
import morgan from "morgan";
import cors from "cors";
 import mongoose from "mongoose";

import contactsRouter from "./routes/contactsRouter.js";
import moviesRouter from "./routes/moviesRouter.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/movies", moviesRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});


const USER = "Filimon4uck";
const PASSWORD = "53DQXPQ2K0HQbe0u";

const DB_HOST = "mongodb+srv://Filimon4uck:53DQXPQ2K0HQbe0u@cluster0.akagh5c.mongodb.net/my_movies?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});
  }).catch(error => {
    console.log(error.message)
    process.exit(1);
    
   });
