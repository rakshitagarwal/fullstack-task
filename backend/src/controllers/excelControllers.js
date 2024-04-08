import query from "../queries/usedQueries.js"; // Importing the query functions for database operations

// Controller function to create a new table
const createTable = async (req, res) => {
  try {
    // Destructuring request body to extract necessary data
    const { headers, rows, tableName, datatypeName } = req.body;
    // Saving the table to the database using the query function
    const result = await query.saveTable(headers, rows, tableName, datatypeName);
    // Sending a successful response with the result
    res.status(201).json({ ...result });
  } catch (err) {
    // Handling errors and sending an error response
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

// Controller function to insert data into an existing table
const insertData = async (req, res) => {
  try {
    // Extracting data from the request body
    const dataAdd = req.body;
    // Finding the table in the database
    const FindData = await query.findTable(dataAdd.tableName, dataAdd.datatypeName);
    // Getting the rows from the found table
    const addedRows = FindData.rows;
    // Adding the new value to the rows
    addedRows.push(dataAdd.value);
    // Updating the table in the database with the new rows
    const result = await query.updateTable(FindData.id, addedRows);
    // Sending a successful response with the result
    res.status(201).json({ ...result });
  } catch (err) {
    // Handling errors and sending an error response
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

// Controller function to update data in an existing table
const updateData = async (req, res) => {
  try {
    // Extracting parameters from the request
    const { id } = req.params;
    const dataEdit = req.body.data;
    // Finding the table in the database
    const FindData = await query.findTable(dataEdit.tableName, dataEdit.datatypeName);
    // Getting the rows from the found table
    const updatedRows = FindData.rows;
    // Updating the specific row with the new value
    updatedRows[+id] = dataEdit.value;
    // Updating the table in the database with the updated rows
    const result = await query.updateTable(FindData.id, updatedRows);
    // Sending a successful response with the result
    res.status(200).json({ ...result });
  } catch (err) {
    // Handling errors and logging them
    console.error(err.message);
  }
};

// Controller function to delete data from an existing table
const deleteData = async (req, res) => {
  try {
    // Extracting parameters from the request
    const { id } = req.params;
    const dataDelete = req.body;
    // Finding the table in the database
    const FindData = await query.findTable(dataDelete.tableName, dataDelete.datatypeName);
    // Getting the value to be deleted
    const delVal = FindData.rows[+id];
    // Filtering out the deleted value from the rows
    const deletedRows = FindData.rows.filter((row) => row !== delVal);
    // Updating the table in the database with the deleted rows
    const result = await query.updateTable(FindData.id, deletedRows);
    // Sending a successful response with the result
    res.status(200).json({ ...result });
  } catch (err) {
    // Handling errors and logging them
    console.error(err.message);
  }
};

// Object containing all Excel-related controller functions
const excelControllers = {
  createTable,
  insertData,
  updateData,
  deleteData,
};

export default excelControllers; // Exporting the Excel controllers for use in other modules
