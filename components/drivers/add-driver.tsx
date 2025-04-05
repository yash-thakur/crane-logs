import React, { useState } from "react";
import {
	Button,
	DatePicker,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Switch,
	Textarea,
	useDisclosure,
} from "@nextui-org/react";
import { PlusIcon } from "../icons/PlusIcon";
import { CalendarIcon } from "../icons/CalendarIcon";

export const AddDriver = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [isLoading, setIsLoading] = useState(false);
	const [driverData, setDriverData] = useState({
		fullName: "",
		phoneNumber: "",
		dateOfBirth: "",
		experience: "",
		licenseNumber: "",
		licenseType: "",
		licenseExpiry: "",
		salary: "",
		aadhar: "",
		address: "",
		isActive: true,
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setDriverData({ ...driverData, [name]: value });
	};

	const handleSubmit = async () => {
		setIsLoading(true);
		try {
			const response = await fetch("/api/drivers", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(driverData),
			});
			if (!response.ok) throw new Error("Failed to add driver");
			onOpenChange(false);
			// Optionally, you can add logic here to update the driver list in the parent component
		} catch (error) {
			console.error("Error adding driver:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
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
									<Input
										label="Full Name"
										name="fullName"
										value={driverData.fullName}
										onChange={handleInputChange}
									/>
									<Input
										label="Phone Number"
										name="phoneNumber"
										value={driverData.phoneNumber}
										onChange={handleInputChange}
									/>
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
									<Switch
										defaultSelected
										color="success"
										name="isActive"
										isSelected={driverData.isActive}
										onValueChange={(checked) => setDriverData({ ...driverData, isActive: checked })}
									>
										Is Active
									</Switch>
									<div className="grid grid-cols-subgrid gap-2 col-span-3">
										<div className="col-start-4 gap-2">
											<div className="grid grid-cols-2 gap-2 ">
												<Button variant="flat" onClick={onClose}>
													Cancel
												</Button>
												<Button
													color="primary"
													onPress={handleSubmit}
													isLoading={isLoading}
												>
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
		</div>
	);
};
