import { pool } from "@/app/lib/db";

export default async function TestPage() {
  const res = await pool.query("SELECT * FROM account");
  const accounts = res.rows;

  return (
    <div>
      <h1>Tabla account</h1>
      <pre>{JSON.stringify(accounts, null, 2)}</pre>
    </div>
  );
}