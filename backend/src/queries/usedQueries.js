import prisma from "../config/db.js"; // Importing Prisma client for database operations

// Function to save a new table in the database
const saveTable = async (headers, rows, tableName, datatypeName) => {
  // Creating a new dynamic table record in the database with the provided data
  const query = await prisma.dynamicTable.create({
    data: {
      tableName,
      datatypeName,
      headers,
      rows,
    },
  });
  // Returning the result of the database operation
  return query;
};

// Function to find a table in the database based on table name and datatype name
const findTable = async (tableName, datatypeName) => {
  // Finding the first dynamic table record that matches the provided criteria
  const query = await prisma.dynamicTable.findFirst({
    where: {
      tableName: tableName,
      datatypeName: datatypeName,
    },
    orderBy: {
      id: "asc",
    },
  });
  // Returning the result of the database operation
  return query;
};

// Function to update a table in the database with new data
const updateTable = async (id, updatedData) => {
  // Updating the rows of the dynamic table record with the provided ID
  const query = await prisma.dynamicTable.update({
    where: {
      id,
    },
    data: { rows: updatedData },
  });
  // Returning the result of the database operation
  return query;
};

// Object containing all query functions for database operations
const query = {
  saveTable,
  findTable,
  updateTable,
};

export default query; // Exporting the query object for use in other modules
