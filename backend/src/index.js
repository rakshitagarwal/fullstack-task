import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./config/db.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

//ROUTES//

// create / insertion
app.post("/api/v1", async (req, res) => {
  try {
    const { userData } = req.body;
    const newTodo = await prisma.user.create({
      data: userData,
    });
    if (newTodo) console.log(newTodo);
    res.status(201).json({ msg: "data created successfully" });
  } catch (err) {
    console.error(err.message);
  }
});

//get all data
app.get("/api/v1", async (req, res) => {
  try {
    const allTodos = await prisma.user.findMany();
    res.status(200).json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get one data
app.get("/api/v1/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("get data", req.params);

    const todo = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });
    console.log(todo);
    res.status(200).json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update data
app.put("/api/v1/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("update data", req.body);
    const { description } = req.body;
    const updateTodo = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        description: description,
      },
    });
    console.log(updateTodo);
    res.status(200).json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete data
app.delete("/api/v1/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("delete data", req.params);

    const deleteTodo = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    console.log(deleteTodo);
    res.status(200).json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

// testing
const testDB = async () => {
  const users = await prisma.user.findMany();
  if (users )console.log('Database connection established');
};
testDB();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
