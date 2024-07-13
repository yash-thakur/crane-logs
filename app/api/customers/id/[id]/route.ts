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
				{ error: "Invalid customer ID" },
				{ status: 400 }
			);
		}

		const customer = await prisma.customer.findUnique({
			where: { id },
			include: {
				entryLogs: true,
				inwardPayments: true,
			},
		});

		if (!customer) {
			return NextResponse.json(
				{ error: "Customer not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json(customer);
	} catch (error) {
		console.error("Error fetching customer:", error);
		return NextResponse.json(
			{ error: "Error fetching customer" },
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

		// Check if the customer exists
		const existingCustomer = await prisma.customer.findUnique({
			where: { id },
		});

		if (!existingCustomer) {
			return NextResponse.json(
				{ error: "Customer not found" },
				{ status: 404 }
			);
		}

		// Delete the customer
		await prisma.customer.update({
			where: { id },
			data: {
				deletedAt: new Date(),
			},
		});

		return NextResponse.json({ message: "Customer deleted successfully" });
	} catch (error) {
		console.error("Error deleting customer:", error);
		return NextResponse.json(
			{ error: "Error deleting customer" },
			{ status: 500 }
		);
	}
}

// PATCH method to update a customer
export async function PATCH(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = parseInt(params.id);
		const body = await request.json();

		const updatedCustomer = await prisma.customer.update({
			where: { id },
			data: body,
		});

		return NextResponse.json(updatedCustomer);
	} catch (error) {
		console.error("Error updating customer:", error);
		return NextResponse.json(
			{ error: "Error updating customer" },
			{ status: 500 }
		);
	}
}

// POST method to update a customer (alternative to PATCH)
export async function POST(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = parseInt(params.id);
		const body = await request.json();

		const updatedCustomer = await prisma.customer.update({
			where: { id },
			data: body,
		});

		return NextResponse.json(updatedCustomer);
	} catch (error) {
		console.error("Error updating customer:", error);
		return NextResponse.json(
			{ error: "Error updating customer" },
			{ status: 500 }
		);
	}
}
