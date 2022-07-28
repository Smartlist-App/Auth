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
export default async function excuteQuery({ query, values }) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}
