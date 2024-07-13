import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function GET() {
	const connectionConfig = {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		ssl: {
			rejectUnauthorized: false,
		},
	};

	try {
		const connection = await mysql.createConnection(connectionConfig);
		await connection.connect();
		await connection.end();
		return NextResponse.json(
			{ message: "Database connection successful!" },
			{ status: 200 }
		);
	} catch (error: any) {
		console.error("Database connection failed:", error);
		return NextResponse.json(
			{ error: "Database connection failed", details: error.message },
			{ status: 500 }
		);
	}
}
