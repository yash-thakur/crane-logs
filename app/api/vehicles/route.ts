import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/db";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const vehicle = await prisma.vehicle.create({
			data: body,
		});
		return NextResponse.json(vehicle, { status: 201 });
	} catch (error) {
		console.error("Error creating vehicle:", error);
		return NextResponse.json(
			{ error: "Error creating vehicle" },
			{ status: 400 }
		);
	}
}

export async function GET(request: NextRequest) {
	try {
		const searchParams = request.nextUrl.searchParams;
		const id = searchParams.get("id");

		if (id) {
			// Get a single vehicle
			const vehicle = await prisma.vehicle.findUnique({
				where: { id: parseInt(id), deletedAt: null },
			});
			if (!vehicle) {
				return NextResponse.json(
					{ error: "Vehicle not found" },
					{ status: 404 }
				);
			}
			return NextResponse.json(vehicle);
		} else {
			// Get all vehicles
			const vehicles = await prisma.vehicle.findMany({
				where: {
					deletedAt: null,
				},
				orderBy: [
					{
						createdAt: "desc",
					},
				],
			});
			return NextResponse.json(vehicles);
		}
	} catch (error) {
		console.error("Error fetching vehicles:", error);
		return NextResponse.json(
			{ error: "Error fetching vehicles" },
			{ status: 500 }
		);
	}
}
