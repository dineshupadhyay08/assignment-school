import mysql from "mysql2/promise";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

// Local DB connection
const localDB = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
};

async function exportLocalDB() {
  try {
    const connection = await mysql.createConnection(localDB);
    const [tables] = await connection.query("SHOW TABLES");

    let sqlDump = "";

    for (let row of tables) {
      const tableName = Object.values(row)[0];

      // Table structure
      const [createTable] = await connection.query(`SHOW CREATE TABLE ${tableName}`);
      sqlDump += createTable[0]["Create Table"] + ";\n\n";

      // Table data
      const [rows] = await connection.query(`SELECT * FROM ${tableName}`);
      for (let r of rows) {
        const values = Object.values(r)
          .map(v => (v === null ? "NULL" : `'${v.toString().replace(/'/g, "''")}'`))
          .join(", ");
        sqlDump += `INSERT INTO ${tableName} VALUES (${values});\n`;
      }
      sqlDump += "\n";
    }

    fs.writeFileSync("schooldb_export.sql", sqlDump);
    console.log("✅ Local DB exported: schooldb_export.sql");
    connection.end();
  } catch (err) {
    console.error("❌ Export failed:", err);
  }
}

exportLocalDB();
