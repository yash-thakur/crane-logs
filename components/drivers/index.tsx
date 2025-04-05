"use client";
import React from "react";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Input,
	Button,
	DropdownTrigger,
	Dropdown,
	DropdownMenu,
	DropdownItem,
	Chip,
	User,
	Selection,
	ChipProps,
	SortDescriptor,
} from "@nextui-org/react";
import { columns, statusOptions } from "./data";
import { capitalize } from "./utils";
import { AddDriver } from "./add-driver";
import { Driver } from "./types";
import { VerticalDotsIcon } from "../icons/VerticalDotsIcon";
import { SearchIcon } from "../icons/searchicon";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import { formatDate } from "date-fns";

const statusColorMap: Record<string, ChipProps["color"]> = {
	active: "success",
	inactive: "danger",
	pending: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
	"fullName",
	"phoneNumber",
	"licenseNumber",
	"vehicleType",
	"licenseExpiry",
	"salary",
	"status",
	"actions",
];

export default function Drivers() {
	const [drivers, setDrivers] = React.useState<Driver[]>([]);
	const [filterValue, setFilterValue] = React.useState("");
	const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
		new Set([])
	);
	const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
		new Set(INITIAL_VISIBLE_COLUMNS)
	);
	const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
	const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
		column: "name",
		direction: "ascending",
	});

	React.useEffect(() => {
		fetchDrivers();
	}, []);

	const fetchDrivers = async () => {
		try {
			const response = await fetch("/api/drivers");
			if (!response.ok) throw new Error("Failed to fetch drivers");
			const data = await response.json();
			setDrivers(data);
		} catch (error) {
			console.error("Error fetching drivers:", error);
		}
	};

	const hasSearchFilter = Boolean(filterValue);

	const headerColumns = React.useMemo(() => {
		if (visibleColumns === "all") return columns;
		return columns.filter((column) =>
			Array.from(visibleColumns).includes(column.uid)
		);
	}, [visibleColumns]);

	const filteredItems = React.useMemo(() => {
		let filteredDrivers = [...drivers];

		if (hasSearchFilter) {
			filteredDrivers = filteredDrivers.filter((driver) =>
				driver.fullName.toLowerCase().includes(filterValue.toLowerCase())
			);
		}
		if (
			statusFilter !== "all" &&
			Array.from(statusFilter).length !== statusOptions.length
		) {
			filteredDrivers = filteredDrivers.filter((driver) =>
				Array.from(statusFilter).includes(driver.status)
			);
		}

		return filteredDrivers;
	}, [drivers, filterValue, statusFilter]);

	const sortedItems = React.useMemo(() => {
		return [...filteredItems].sort((a: Driver, b: Driver) => {
			const first = a[sortDescriptor.column as keyof Driver];
			const second = b[sortDescriptor.column as keyof Driver];
			const cmp = first < second ? -1 : first > second ? 1 : 0;

			return sortDescriptor.direction === "descending" ? -cmp : cmp;
		});
	}, [sortDescriptor, filteredItems]);

	const renderCell = React.useCallback(
		(driver: Driver, columnKey: React.Key) => {
			const cellValue = driver[columnKey as keyof Driver];

			switch (columnKey) {
				case "name":
					return (
						<User
							avatarProps={{ radius: "lg", src: driver.avatar }}
							description={driver.email}
							name={cellValue as string}
						>
							{driver.email}
						</User>
					);
				case "licenseExpiry":
					return cellValue ? <p>{formatDate(cellValue as Date, "dd-LL-yyyy")}</p> : null;
				case "status":
					return (
						<Chip
							className="capitalize"
							color={statusColorMap[driver.status]}
							size="sm"
							variant="flat"
						>
							{cellValue as string}
						</Chip>
					);
				case "actions":
					return (
						<div className="relative flex justify-end items-center gap-2">
							<Dropdown>
								<DropdownTrigger>
									<Button isIconOnly size="sm" variant="light">
										<VerticalDotsIcon className="text-default-300" />
									</Button>
								</DropdownTrigger>
								<DropdownMenu>
									<DropdownItem>View</DropdownItem>
									<DropdownItem>Edit</DropdownItem>
									<DropdownItem>Delete</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</div>
					);
				default:
					return cellValue;
			}
		},
		[]
	);

	const onSearchChange = React.useCallback((value?: string) => {
		if (value) {
			setFilterValue(value);
		} else {
			setFilterValue("");
		}
	}, []);

	const onClear = React.useCallback(() => {
		setFilterValue("");
	}, []);

	const topContent = React.useMemo(() => {
		return (
			<div className="flex flex-col gap-4">
				<div className="flex justify-between gap-3 items-end">
					<Input
						isClearable
						className="w-full sm:max-w-[44%]"
						placeholder="Search by name..."
						startContent={<SearchIcon />}
						value={filterValue}
						onClear={() => onClear()}
						onValueChange={onSearchChange}
					/>
					<div className="flex gap-3">
						<Dropdown>
							<DropdownTrigger className="hidden sm:flex">
								<Button
									endContent={<ChevronDownIcon className="text-small" />}
									variant="flat"
								>
									Status
								</Button>
							</DropdownTrigger>
							<DropdownMenu
								disallowEmptySelection
								aria-label="Table Columns"
								closeOnSelect={false}
								selectedKeys={statusFilter}
								selectionMode="multiple"
								onSelectionChange={setStatusFilter}
							>
								{statusOptions.map((status) => (
									<DropdownItem key={status.uid} className="capitalize">
										{capitalize(status.name)}
									</DropdownItem>
								))}
							</DropdownMenu>
						</Dropdown>
						<Dropdown>
							<DropdownTrigger className="hidden sm:flex">
								<Button
									endContent={<ChevronDownIcon className="text-small" />}
									variant="flat"
								>
									Columns
								</Button>
							</DropdownTrigger>
							<DropdownMenu
								disallowEmptySelection
								aria-label="Table Columns"
								closeOnSelect={false}
								selectedKeys={visibleColumns}
								selectionMode="multiple"
								onSelectionChange={setVisibleColumns}
							>
								{columns.map((column) => (
									<DropdownItem key={column.uid} className="capitalize">
										{capitalize(column.name)}
									</DropdownItem>
								))}
							</DropdownMenu>
						</Dropdown>
						<AddDriver onDriverAdded={fetchDrivers} />
					</div>
				</div>
			</div>
		);
	}, [
		filterValue,
		statusFilter,
		visibleColumns,
		onSearchChange,
		drivers.length,
		hasSearchFilter,
	]);

	return (
		<div className="m-4">
			<Table
				aria-label="Example table with custom cells, pagination and sorting"
				isHeaderSticky
				bottomContentPlacement="outside"
				classNames={{
					wrapper: "",
				}}
				selectedKeys={selectedKeys}
				selectionMode="multiple"
				sortDescriptor={sortDescriptor}
				topContent={topContent}
				topContentPlacement="outside"
				onSelectionChange={setSelectedKeys}
				onSortChange={setSortDescriptor}
			>
				<TableHeader columns={headerColumns}>
					{(column) => (
						<TableColumn
							key={column.uid}
							align={column.uid === "actions" ? "center" : "start"}
							allowsSorting={column.sortable}
						>
							{column.name}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody emptyContent={"No drivers found"} items={sortedItems}>
					{(item) => (
						<TableRow key={item.id}>
							{(columnKey) => (
								<TableCell>{renderCell(item, columnKey)}</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
