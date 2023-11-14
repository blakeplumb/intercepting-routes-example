import sqlite3 from "sqlite3";
import { CREATE_PEOPLE_TABLE } from "./queries.mjs";

// Connecting to or creating a new SQLite database file
const db = new sqlite3.Database(
  "./sql/people.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the SQlite database.");
  }
);

// Serialize method ensures that database queries are executed sequentially
db.serialize(() => {
  db.run(CREATE_PEOPLE_TABLE, (err) => {
    if (err) {
      return console.error(err.message);
    }

    console.log("Created people table.");

    db.run(`DELETE FROM people`, (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("All rows deleted from people");

      db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log("Closed the database connection.");
      });
    });
  });
});
