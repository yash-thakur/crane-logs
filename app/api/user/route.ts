import prisma from "@/app/lib/db";
// import { NextResponse } from "next/server";

// export async function GET() {
// 	const user = await prisma.entryLog.findMany();

// 	return NextResponse.json({
// 		user,
// 	});
// }

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const searchParams = request.nextUrl.searchParams;

		// Parse query parameters
		const page = parseInt(searchParams.get("page") || "1");
		const limit = parseInt(searchParams.get("limit") || "10");
		const sortBy = searchParams.get("sortBy") || "date";
		const sortOrder = (searchParams.get("sortOrder") || "desc") as
			| "asc"
			| "desc";
		const startDate = searchParams.get("startDate")
			? new Date(searchParams.get("startDate") as string)
			: undefined;
		const endDate = searchParams.get("endDate")
			? new Date(searchParams.get("endDate") as string)
			: undefined;
		const customerName = searchParams.get("customerName");
		const vehicleNumber = searchParams.get("vehicleNumber");
		const driverName = searchParams.get("driverName");

		// Construct the where clause for filtering
		const where: any = {};
		if (startDate && endDate) {
			where.date = { gte: startDate, lte: endDate };
		}
		if (customerName) {
			where.customer = { name: { contains: customerName } };
		}
		if (vehicleNumber) {
			where.vehicleNumber = { contains: vehicleNumber };
		}
		if (driverName) {
			where.driverName = { contains: driverName };
		}

		// Fetch entry logs
		const entryLogs = await prisma.entryLog.findMany({
			where,
			include: {
				customer: true,
				vehicle: true,
				driver: true,
			},
			orderBy: {
				[sortBy]: sortOrder,
			},
			skip: (page - 1) * limit,
			take: limit,
		});

		// Get total count for pagination
		const totalCount = await prisma.entryLog.count({ where });

		return NextResponse.json({
			entryLogs,
			pagination: {
				currentPage: page,
				totalPages: Math.ceil(totalCount / limit),
				totalCount,
			},
		});
	} catch (error) {
		console.error("Error fetching entry logs:", error);
		return NextResponse.json(
			{ error: "Error fetching entry logs" },
			{ status: 500 }
		);
	}
}
