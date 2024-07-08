import {
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
	Switch,
	Textarea,
	TimeInput,
	useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { CalendarIcon } from "./CalendarIcon";
import { customers, drivers, vehicles } from "./dummyData";
import { PlusIcon } from "../icons/PlusIcon";

export const AddDriver = () => {
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
					Add Driver
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
									Add Driver
								</ModalHeader>
								<ModalBody className="flex flex-col">
									<div className="grid grid-cols-2 gap-2 ">
										<Input label="Full Name" />
										<Input label="Phone Number" />
									</div>
									<div className="grid grid-cols-2 gap-2 ">
										<DatePicker
											label={"Date of Birth"}
											showMonthAndYearPickers
											endContent={
												<CalendarIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
											}
										/>
										<Input type="number" label="Experience" />
									</div>
									<div className="grid grid-cols-3 gap-2 ">
										<Input label="License Number" />
										<Input label="License Type" />
										<DatePicker
											label={"License Expiry"}
											showMonthAndYearPickers
											endContent={
												<CalendarIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
											}
										/>
									</div>

									<div className="grid grid-cols-2 gap-2 ">
										<Input type="number" label="Salary" />
										<Input label="Aadhar" />
									</div>
									<Textarea label="Address" />
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
