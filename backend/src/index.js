import express from "express";
import cors from "cors";
import prisma from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// create data
app.post("/api/v1", async (req, res) => {
  try {
    const { headers, rows, tableName, datatypeName } = req.body;
    const result = await prisma.dynamicTable.create({
      data: {
        tableName,
        datatypeName,
        headers,
        rows,
      },
    });
   
    res.status(201).json({ ...result });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

// insert a new record
app.post("/api/v1/add", async (req, res) => {
  try {
    const dataAdd = req.body;
    const FindData = await prisma.dynamicTable.findFirst({
      where: {
        tableName: dataAdd.tableName,
        datatypeName: dataAdd.datatypeName,
      },
      orderBy: {
        id: "asc",
      },
    });
    const addedRows = FindData.rows;
    addedRows.push(dataAdd.value);
    const result = await prisma.dynamicTable.update({
      where: {
        id: FindData.id,
      },
      data: { rows: addedRows },
    });
    res.status(201).json({ ...result });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

//get all table details
app.get("/api/v1", async (req, res) => {
  try {
    const dataView = req.body;
    const FindData = await prisma.dynamicTable.findFirst({
      where: {
        tableName: dataView.tableName,
        datatypeName: dataView.datatypeName,
      },
      orderBy: {
        id: "asc",
      },
    });
    // console.log("records found",FindData);
    res.status(200).json({ msg: "Data found successfully" });
  } catch (err) {
    console.error(err.message);
  }
});

//update data
app.put("/api/v1/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dataEdit = req.body.data;
    const FindData = await prisma.dynamicTable.findFirst({
      where: {
        tableName: dataEdit.tableName,
        datatypeName: dataEdit.datatypeName,
      },
      orderBy: {
        id: "asc",
      },
    });
    let updatedRows = FindData.rows;
    updatedRows[+id] = dataEdit.value;
    const result = await prisma.dynamicTable.update({
      where: {
        id: FindData.id,
      },
      data: { rows: updatedRows },
    });
    res.status(200).json({ ...result });
  } catch (err) {
    console.error(err.message);
  }
});

//delete data
app.delete("/api/v1/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dataDelete = req.body;
    const FindData = await prisma.dynamicTable.findFirst({
      where: {
        tableName: dataDelete.tableName,
        datatypeName: dataDelete.datatypeName,
      },
      orderBy: {
        id: "asc",
      },
    });
    const delVal = FindData.rows[+id];
    let updatedRows = FindData.rows.filter((row) => row !== delVal);
    const result = await prisma.dynamicTable.update({
      where: {
        id: FindData.id,
      },
      data: { rows: updatedRows },
    });
    res.status(200).json({ ...result });
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
