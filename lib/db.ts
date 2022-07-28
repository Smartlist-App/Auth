import mysql from "serverless-mysql";

const port: any = process.env.MYSQL_PORT;

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    port: parseInt(port),
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  },
});

const apiDb = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    port: parseInt(port),
    database: "smartlist_api",
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  },
});

export default async function executeQuery({ query, values }) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}

export async function executeApiQuery({ query, values }) {
  try {
    const results = await apiDb.query(query, values);
    await apiDb.end();
    return results;
  } catch (error) {
    return { error };
  }
}
