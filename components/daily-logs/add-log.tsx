import {
	Autocomplete,
	AutocompleteItem,
	Button,
	DatePicker,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Select,
	SelectItem,
	Textarea,
	TimeInput,
	useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { CalendarIcon } from "../icons/CalendarIcon";
import { customers, drivers, vehicles } from "./dummyData";
import { PlusIcon } from "../icons/PlusIcon";

export const AddEntry = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const paymentStatus = [
		{
			key: "PENDING",
			label: "Pending",
		},
		{
			key: "PARTIALLY_PAID",
			label: "Partial",
		},
		{
			key: "PAID",
			label: "Paid",
		},
	];

	return (
		<div>
			<>
				<Button onPress={onOpen} color="primary" endContent={<PlusIcon />}>
					Add Entry
				</Button>
				<Modal
					isOpen={isOpen}
					size="5xl"
					onOpenChange={onOpenChange}
					placement="top-center"
				>
					<ModalContent>
						{(onClose) => (
							<>
								<ModalHeader className="flex flex-col gap-1">
									Add Entry
								</ModalHeader>
								<ModalBody className="flex flex-col">
									<Autocomplete isRequired label="Customer">
										{customers.map((customer) => (
											<AutocompleteItem key={customer.id}>
												{customer.name}
											</AutocompleteItem>
										))}
									</Autocomplete>
									<div className="grid grid-cols-2 gap-2">
										<Input label="Log Sheet No." />
										<DatePicker
											label={"Date"}
											endContent={
												<CalendarIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
											}
										/>
									</div>

									<div className="grid grid-cols-4 gap-2 ">
										<TimeInput isRequired hourCycle={24} label="In Time" />
										<TimeInput isRequired hourCycle={24} label="Out Time" />
										<TimeInput isRequired label="Break" />
										<div className="flex items-center gap-2">
											<label>Total Time:</label>
											<span>10 hrs</span>
										</div>
									</div>

									<div className="grid grid-cols-2 gap-2 ">
										<Autocomplete isRequired label="Vehicle">
											{vehicles.map((vehicle) => (
												<AutocompleteItem key={vehicle.id}>
													{vehicle.registrationNumber}
												</AutocompleteItem>
											))}
										</Autocomplete>
										<Autocomplete isRequired label="Driver">
											{drivers.map((driver) => (
												<AutocompleteItem key={driver.id}>
													{driver.fullName}
												</AutocompleteItem>
											))}
										</Autocomplete>
									</div>
									<div className="grid grid-cols-3 gap-2 ">
										<Input
											isRequired
											type="number"
											label="Amount"
											startContent={
												<div className="pointer-events-none flex items-center">
													<span className="text-default-400 text-small">₹</span>
												</div>
											}
										/>
										<Input
											type="number"
											label="Advance"
											startContent={
												<div className="pointer-events-none flex items-center">
													<span className="text-default-400 text-small">₹</span>
												</div>
											}
										/>
										<Select
											label="Payment Status"
											defaultSelectedKeys={["PENDING"]}
										>
											{paymentStatus.map((status) => (
												<SelectItem key={status.key}>{status.label}</SelectItem>
											))}
										</Select>
									</div>
									<Textarea label="Work Details" />
								</ModalBody>
								<ModalFooter>
									<Button variant="flat" onClick={onClose}>
										Cancel
									</Button>
									<Button color="primary" onPress={onClose}>
										Save
									</Button>
								</ModalFooter>
							</>
						)}
					</ModalContent>
				</Modal>
			</>
		</div>
	);
};
