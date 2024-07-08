import {
	Button,
	DateInput,
	DatePicker,
	Divider,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Switch,
	useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { CalendarIcon } from "./CalendarIcon";
import { PlusIcon } from "../icons/PlusIcon";

export const AddVehicle = () => {
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
					Add Vehicle
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
									Add Vehicle
								</ModalHeader>
								<ModalBody className="flex flex-col">
									<Input label="Registration Number" />
									<div className="grid grid-cols-3 gap-2">
										<Input label="Brand" />
										<Input label="Model" />
										<Input type="number" label="Year" />
									</div>
									<Divider className="my-4" />
									<div className="grid grid-cols-3 gap-2">
										<Input label="Vehicle Type" />
										<Input label="Capacity" />
										<Input label="Fuel Type" />
									</div>
									<div className="grid grid-cols-2 gap-2">
										<Input label="Insurance Number" />
										<DatePicker
											label={"Insurance Expiry"}
											showMonthAndYearPickers
											endContent={
												<CalendarIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
											}
										/>
									</div>
									<div className="grid grid-cols-4 gap-2">
										<DatePicker
											label={"PUC"}
											showMonthAndYearPickers
											endContent={
												<CalendarIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
											}
										/>
										<DatePicker
											label={"Fitness"}
											showMonthAndYearPickers
											endContent={
												<CalendarIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
											}
										/>
										<DatePicker
											label={"Tax"}
											showMonthAndYearPickers
											endContent={
												<CalendarIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
											}
										/>
										<DatePicker
											label={"Form 10"}
											showMonthAndYearPickers
											endContent={
												<CalendarIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
											}
										/>
									</div>
									<Divider className="my-4" />
									<div className="grid grid-cols-2 gap-2">
										<DatePicker
											label={"Last Maintenance"}
											showMonthAndYearPickers
											endContent={
												<CalendarIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
											}
										/>
										<DatePicker
											label={"Next Maintenance"}
											showMonthAndYearPickers
											endContent={
												<CalendarIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
											}
										/>
									</div>
								</ModalBody>
								<ModalFooter>
									<div className="grid grid-cols-4 gap-2 w-full">
										<Switch defaultSelected color="success">
											Is Active
										</Switch>
										<div className="grid grid-cols-subgrid gap-2 col-span-3">
											<div className="col-start-4 gap-2">
												<div className="grid grid-cols-2 gap-2 ">
													<Button variant="flat" onClick={onClose}>
														Cancel
													</Button>
													<Button color="primary" onPress={onClose}>
														Save
													</Button>
												</div>
											</div>
										</div>
									</div>
								</ModalFooter>
							</>
						)}
					</ModalContent>
				</Modal>
			</>
		</div>
	);
};
