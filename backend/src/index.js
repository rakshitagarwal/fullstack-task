import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./config/db.js";
dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ROUTES

app.post('/add', async (req, res) =>{

})
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const testDB = async () => {
  // await prisma.user.create({
  //   data: {
  //     name: "John Doe",
  //     email: "jondoe@gmail.com",
  //     id: 3,
  //   },
  // });

  const users = await prisma.user.findMany();
  console.log(users);
};
testDB();

app.listen(PORT, () => {
  console.log(` app listening on port ${PORT}!`);
});
