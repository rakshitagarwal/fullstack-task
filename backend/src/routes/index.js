import express from "express";
import excelControllers from "../controllers/excelControllers.js";
const router = express.Router();

// create data
router.post("/", excelControllers.createTable);

// insert a new record
router.post("/add", excelControllers.insertData);

//update data
router.put("/:id", excelControllers.updateData);

//delete data
router.delete("/:id", excelControllers.deleteData);

export default router;
