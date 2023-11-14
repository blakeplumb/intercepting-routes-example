import sqlite3 from "sqlite3";
import { open } from "sqlite";

const dbConnect = {
  open: () =>
    open({
      filename: "./sql/people.db", // Specify the database file path
      driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
    }),
};

export const setConnection = (callback) => {
  dbConnect.open = callback;
};

export default dbConnect;
