import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/db";

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = parseInt(params.id);

		if (isNaN(id)) {
			return NextResponse.json(
				{ error: "Invalid driver ID" },
				{ status: 400 }
			);
		}

		const driver = await prisma.driver.findUnique({
			where: { id },
			include: {
				entryLogs: true,
			},
		});

		if (!driver) {
			return NextResponse.json({ error: "Driver not found" }, { status: 404 });
		}

		return NextResponse.json(driver);
	} catch (error) {
		console.error("Error fetching driver:", error);
		return NextResponse.json(
			{ error: "Error fetching driver" },
			{ status: 500 }
		);
	}
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = parseInt(params.id);

		if (isNaN(id)) {
			return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
		}

		// Check if the driver exists
		const existingDriver = await prisma.driver.findUnique({
			where: { id },
		});

		if (!existingDriver) {
			return NextResponse.json({ error: "Driver not found" }, { status: 404 });
		}

		// Delete the driver
		await prisma.driver.update({
			where: { id },
			data: {
				deletedAt: new Date(),
			},
		});

		return NextResponse.json({ message: "Driver deleted successfully" });
	} catch (error) {
		console.error("Error deleting driver:", error);
		return NextResponse.json(
			{ error: "Error deleting driver" },
			{ status: 500 }
		);
	}
}

export async function PATCH(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = parseInt(params.id);
		const body = await request.json();

		const updatedDriver = await prisma.driver.update({
			where: { id },
			data: body,
		});

		return NextResponse.json(updatedDriver);
	} catch (error) {
		console.error("Error updating driver:", error);
		return NextResponse.json(
			{ error: "Error updating driver" },
			{ status: 500 }
		);
	}
}

export async function POST(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = parseInt(params.id);
		const body = await request.json();

		const updatedDriver = await prisma.driver.update({
			where: { id },
			data: body,
		});

		return NextResponse.json(updatedDriver);
	} catch (error) {
		console.error("Error updating driver:", error);
		return NextResponse.json(
			{ error: "Error updating driver" },
			{ status: 500 }
		);
	}
}
