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
				{ error: "Invalid vehicle ID" },
				{ status: 400 }
			);
		}

		const vehicle = await prisma.vehicle.findUnique({
			where: { id },
			include: {
				entryLogs: true,
			},
		});

		if (!vehicle) {
			return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
		}

		return NextResponse.json(vehicle);
	} catch (error) {
		console.error("Error fetching vehicle:", error);
		return NextResponse.json(
			{ error: "Error fetching vehicle" },
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

		// Check if the vehicle exists
		const existingVehicle = await prisma.vehicle.findUnique({
			where: { id },
		});

		if (!existingVehicle) {
			return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
		}

		// Delete the vehicle
		await prisma.vehicle.update({
			where: { id },
			data: {
				deletedAt: new Date(),
			},
		});

		return NextResponse.json({ message: "Vehicle deleted successfully" });
	} catch (error) {
		console.error("Error deleting vehicle:", error);
		return NextResponse.json(
			{ error: "Error deleting vehicle" },
			{ status: 500 }
		);
	}
}

// PATCH method to update a vehicle
export async function PATCH(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = parseInt(params.id);
		const body = await request.json();

		const updatedVehicle = await prisma.vehicle.update({
			where: { id },
			data: body,
		});

		return NextResponse.json(updatedVehicle);
	} catch (error) {
		console.error("Error updating vehicle:", error);
		return NextResponse.json(
			{ error: "Error updating vehicle" },
			{ status: 500 }
		);
	}
}

// POST method to update a vehicle (alternative to PATCH)
export async function POST(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = parseInt(params.id);
		const body = await request.json();

		const updatedVehicle = await prisma.vehicle.update({
			where: { id },
			data: body,
		});

		return NextResponse.json(updatedVehicle);
	} catch (error) {
		console.error("Error updating vehicle:", error);
		return NextResponse.json(
			{ error: "Error updating vehicle" },
			{ status: 500 }
		);
	}
}
