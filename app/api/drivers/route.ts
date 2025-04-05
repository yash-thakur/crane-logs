import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/db";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const driver = await prisma.driver.create({
			data: body,
		});
		return NextResponse.json(driver, { status: 201 });
	} catch (error) {
		console.error("Error creating driver:", error);
		return NextResponse.json(
			{ error: "Error creating driver" },
			{ status: 400 }
		);
	}
}

export async function GET(request: NextRequest) {
	try {
		const searchParams = request.nextUrl.searchParams;
		const id = searchParams.get("id");

		if (id) {
			// Get a single driver
			const driver = await prisma.driver.findUnique({
				where: { id: parseInt(id), deletedAt: null },
			});
			if (!driver) {
				return NextResponse.json(
					{ error: "Driver not found" },
					{ status: 404 }
				);
			}
			return NextResponse.json(driver);
		} else {
			// Get all drivers
			const drivers = await prisma.driver.findMany({
				where: {
					deletedAt: null,
				},
				orderBy: [
					{
						createdAt: "desc",
					},
					],
				});
			return NextResponse.json(drivers);
		}
	} catch (error) {
		console.error("Error fetching drivers:", error);
		return NextResponse.json(
			{ error: "Error fetching drivers" },
			{ status: 500 }
		);
	}
}
