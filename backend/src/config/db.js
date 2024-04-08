import { PrismaClient } from "@prisma/client"; // Importing PrismaClient from the Prisma ORM library

const prisma = new PrismaClient(); // Creating a new instance of PrismaClient

export default prisma; // Exporting the PrismaClient instance for use in other modules
