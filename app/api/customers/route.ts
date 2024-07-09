import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/db";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const customer = await prisma.customer.create({
			data: body,
		});
		return NextResponse.json(customer, { status: 201 });
	} catch (error) {
		console.error("Error creating customer:", error);
		return NextResponse.json(
			{ error: "Error creating customer" },
			{ status: 400 }
		);
	}
}

export async function GET(request: NextRequest) {
	try {
		const searchParams = request.nextUrl.searchParams;
		const id = searchParams.get("id");

		if (id) {
			// Get a single customer
			const customer = await prisma.customer.findUnique({
				where: { id: parseInt(id), deletedAt: null },
			});
			if (!customer) {
				return NextResponse.json(
					{ error: "Customer not found" },
					{ status: 404 }
				);
			}
			return NextResponse.json(customer);
		} else {
			// Get all customers
			const customers = await prisma.customer.findMany({
				where: {
					deletedAt: null,
				},
				orderBy: [
					{
						createdAt: "desc",
					},
				],
			});
			return NextResponse.json(customers);
		}
	} catch (error) {
		console.error("Error fetching customers:", error);
		return NextResponse.json(
			{ error: "Error fetching customers" },
			{ status: 500 }
		);
	}
}
