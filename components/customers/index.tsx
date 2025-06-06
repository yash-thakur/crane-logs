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
	Pagination,
	Selection,
	ChipProps,
	SortDescriptor,
	useDisclosure,
	Modal,
	ModalContent,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Spinner,
} from "@nextui-org/react";
import { columns, users, statusOptions } from "./data";
import { capitalize } from "./utils";
import { AddCustomer } from "./add-customer";
import { toast } from "sonner";
import { TrashIcon } from "../icons/accounts/trash-icon";
import { useRouter } from "next/navigation";
import { VerticalDotsIcon } from "../icons/VerticalDotsIcon";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import { SearchIcon } from "../icons/searchicon";

const statusColorMap: Record<string, ChipProps["color"]> = {
	active: "success",
	paused: "danger",
	vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
	"name",
	"contactPerson",
	"phoneNumber",
	"gstin",
	"actions",
];

export interface Customer {
	id: number;
	name: string;
	email: string;
	phoneNumber: string;
	contactPerson: string;
	gstin: string;
	isActive: boolean;
	address: string;
	openingBalance: string;
}

export default function Customers() {
	const [customers, setCustomers] = React.useState<Customer[]>([]);
	const [filterValue, setFilterValue] = React.useState("");
	const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
		new Set([])
	);
	const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
		new Set(INITIAL_VISIBLE_COLUMNS)
	);
	const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
	// const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
		column: "age",
		direction: "ascending",
	});
	const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
	const [currentCustomer, setCurrentCustomer] = React.useState<Customer>();
	const [isDeleting, setIsDeleting] = React.useState(false);
	const [mode, setMode] = React.useState("");
	const [isLoading, setIsLoading] = React.useState(true);
	const router = useRouter();

	const loadingState =
		isLoading || customers?.length === 0 ? "loading" : "idle";

	const fetchCustomers = async () => {
		setIsLoading(true);
		try {
			const response = await fetch("/api/customers");
			if (!response.ok) {
				throw new Error("Failed to fetch customers");
			}
			const data = await response.json();
			setCustomers(data);
		} catch (error) {
			console.error("Error fetching customers:", error);
		}
		setIsLoading(false);
	};

	React.useEffect(() => {
		fetchCustomers();
	}, []);

	React.useEffect(() => {}, [mode, currentCustomer]);

	const deleteCustomer = async (onClose: () => void) => {
		setIsDeleting(true);
		try {
			const response = await fetch(`/api/customers/id/${currentCustomer?.id}`, {
				method: "DELETE",
			});
			if (!response.ok) {
				toast.error("Failed to delete customer");
			} else {
				toast.success("Customer deleted successfully!");
			}
		} catch (e) {
			e instanceof Error
				? toast.error(e.toString())
				: toast.error("An error occurred");
		} finally {
			setIsDeleting(false);
			fetchCustomers();
			onClose();
		}
	};

	const deleteSelectedCustomers = async (onClose: () => void) => {
		setIsDeleting(true);
		try {
			const response = await fetch(`/api/customers/id/${currentCustomer}`, {
				method: "DELETE",
			});
			if (!response.ok) {
				toast.error("Failed to delete customers");
			} else {
				toast.success("Customers deleted successfully!");
			}
		} catch (e) {
			e instanceof Error
				? toast.error(e.toString())
				: toast.error("An error occurred");
		} finally {
			setIsDeleting(false);
			fetchCustomers();
			onClose();
		}
	};

	// const [page, setPage] = React.useState(1);

	const hasSearchFilter = Boolean(filterValue);

	const headerColumns = React.useMemo(() => {
		if (visibleColumns === "all") return columns;

		return columns.filter((column) =>
			Array.from(visibleColumns).includes(column.uid)
		);
	}, [visibleColumns]);

	const filteredItems = React.useMemo(() => {
		let filteredUsers = [...customers];

		if (hasSearchFilter) {
			filteredUsers = filteredUsers.filter((user) =>
				user.name.toLowerCase().includes(filterValue.toLowerCase())
			);
		}
		return filteredUsers;
	}, [customers, filterValue, statusFilter]);

	// const pages = Math.ceil(filteredItems.length / rowsPerPage);

	// const items = React.useMemo(() => {
	//   const start = (page - 1) * rowsPerPage;
	//   const end = start + rowsPerPage;

	//   return filteredItems.slice(start, end);
	// }, [page, filteredItems, rowsPerPage]);

	const openCustomer = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
		customer: Customer
	) => {
		e.preventDefault();
		router.push(`/customers/${customer.id}`);
	};

	const sortedItems = React.useMemo(() => {
		return [...filteredItems].sort((a: Customer, b: Customer) => {
			const first = a[sortDescriptor.column as keyof Customer] as number;
			const second = b[sortDescriptor.column as keyof Customer] as number;
			const cmp = first < second ? -1 : first > second ? 1 : 0;

			return sortDescriptor.direction === "descending" ? -cmp : cmp;
		});
	}, [sortDescriptor, filteredItems]);

	const renderCell = React.useCallback(
		(customer: Customer, columnKey: React.Key) => {
			const cellValue = customer[columnKey as keyof Customer];

			switch (columnKey) {
				case "name":
					return (
						<User
							avatarProps={{ radius: "lg" }}
							description={customer.email}
							name={cellValue}
							onClick={(e) => openCustomer(e, customer)}
						>
							{customer.email}
						</User>
					);
				case "contactPerson":
					return (
						<div
							className="flex flex-col"
							onClick={(e) => openCustomer(e, customer)}
						>
							<p className="text-bold text-small capitalize">{cellValue}</p>
							{/* <p className="text-bold text-tiny capitalize text-default-400">
								{user.contactPerson}
							</p> */}
						</div>
					);
				case "phoneNumber":
					return (
						<div
							className="flex flex-col"
							onClick={(e) => openCustomer(e, customer)}
						>
							<p className="text-bold text-small capitalize">{cellValue}</p>
						</div>
					);
				case "gstin":
					return (
						<Chip
							className="capitalize"
							color={statusColorMap[customer.gstin]}
							size="sm"
							variant="flat"
							onClick={(e) => openCustomer(e, customer)}
						>
							{cellValue}
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
									<DropdownItem
										onClick={() => {
											setCurrentCustomer(customer);
											setMode("EDIT");
										}}
									>
										Edit
									</DropdownItem>
									<DropdownItem
										onClick={() => {
											setCurrentCustomer(customer);
											setMode("DELETE");
											onOpen();
										}}
									>
										Delete
									</DropdownItem>
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

	// const onNextPage = React.useCallback(() => {
	//   if (page < pages) {
	//     setPage(page + 1);
	//   }
	// }, [page, pages]);

	// const onPreviousPage = React.useCallback(() => {
	//   if (page > 1) {
	//     setPage(page - 1);
	//   }
	// }, [page]);

	// const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
	//   setRowsPerPage(Number(e.target.value));
	//   setPage(1);
	// }, []);

	const onSearchChange = React.useCallback((value?: string) => {
		if (value) {
			setFilterValue(value);
			// setPage(1);
		} else {
			setFilterValue("");
		}
	}, []);

	const onClear = React.useCallback(() => {
		setFilterValue("");
		// setPage(1)
	}, []);

	const topContent = React.useMemo(() => {
		const selectedItems =
			selectedKeys !== "all" ? selectedKeys.size : customers.length;
		return (
			<div className="flex flex-col gap-4">
				<div className="flex justify-between gap-3 items-end">
					<Input
						isClearable
						className="sm:max-w-[44%]"
						placeholder="Search by name..."
						startContent={<SearchIcon />}
						value={filterValue}
						onClear={() => onClear()}
						onValueChange={onSearchChange}
					/>
					<div className="flex gap-3">
						{selectedItems > 0 && (
							<Button
								onPress={onOpen}
								color="secondary"
								endContent={<TrashIcon />}
							>
								Delete {selectedItems} Customers
							</Button>
						)}
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
						<AddCustomer
							onCustomerAdded={() => {
								toast.success(
									`Customer ${
										mode === "EDIT" ? "updated" : "added"
									} successfully!`
								);
								fetchCustomers();
							}}
							mode={mode === "EDIT" ? "EDIT" : "NEW"}
							currentCustomer={currentCustomer}
							key={mode}
							resetMode={() => {
								setMode("");
								setCurrentCustomer(undefined);
							}}
						/>
					</div>
				</div>
				{/* <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {users.length} users</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div> */}
			</div>
		);
	}, [
		filterValue,
		statusFilter,
		visibleColumns,
		onSearchChange,
		// onRowsPerPageChange,
		users.length,
		hasSearchFilter,
		selectedKeys,
		mode,
		currentCustomer,
	]);

	// const bottomContent = React.useMemo(() => {
	//   return (
	//     <div className="py-2 px-2 flex justify-between items-center">
	//       <span className="w-[30%] text-small text-default-400">
	//         {selectedKeys === "all"
	//           ? "All items selected"
	//           : `${selectedKeys.size} of ${filteredItems.length} selected`}
	//       </span>
	//       <Pagination
	//         isCompact
	//         showControls
	//         showShadow
	//         color="primary"
	//         page={page}
	//         total={pages}
	//         onChange={setPage}
	//       />
	//       <div className="hidden sm:flex w-[30%] justify-end gap-2">
	//         <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
	//           Previous
	//         </Button>
	//         <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
	//           Next
	//         </Button>
	//       </div>
	//     </div>
	//   );
	// }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

	return (
		<div className="m-4">
			<Modal
				isOpen={isOpen}
				onClose={() => {
					setCurrentCustomer(undefined);
					setMode("");
				}}
				onOpenChange={onOpenChange}
				placement="top-center"
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader>Are you sure you want to delete ?</ModalHeader>
							<ModalFooter>
								<Button color="danger" variant="flat" onPress={onClose}>
									Cancel
								</Button>
								<Button
									isLoading={isDeleting}
									color="primary"
									onPress={() => deleteCustomer(onClose)}
								>
									Delete
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
			<Table
				isHeaderSticky
				// bottomContent={bottomContent}
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
				<TableBody
					loadingContent={<Spinner />}
					loadingState={loadingState}
					emptyContent={"No users found"}
					items={sortedItems}
				>
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
