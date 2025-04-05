import {
	Button,
	DatePicker,
	DateValue,
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
import React, { useState } from "react";
import { CalendarIcon } from "../icons/CalendarIcon";
import { PlusIcon } from "../icons/PlusIcon";
import { Vehicle } from "@prisma/client";
import { toast } from "sonner";
import { parseDate, CalendarDate } from "@internationalized/date";

// Add this utility function at the top of your component or in a separate utils file
const parseDateUtil = (date: Date | string | null): CalendarDate | null => {
	if (!date) return null;
	const dateString = typeof date === 'string' ? date : date.toISOString();
	return parseDate(dateString.split('T')[0]);
};

interface AddVehicleFormProps {
	onVehicleAdded: () => void;
	currentVehicle?: Vehicle;
	mode: "EDIT" | "NEW";
	resetMode: () => void;
}

const formatDateString = (date: Date | string | null): string | null => {
  if (!date) return null;
  const d = new Date(date);
  return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}`;
};

export const AddVehicle = ({
	onVehicleAdded,
	currentVehicle,
	mode,
	resetMode,
}: AddVehicleFormProps) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [registrationNumber, setRegistrationNumber] = useState(
		currentVehicle?.registrationNumber || ""
	);
	const [make, setMake] = useState(currentVehicle?.make || "");
	const [model, setModel] = useState(currentVehicle?.model || "");
	const [year, setYear] = useState(currentVehicle?.year || "");
	const [vehicleType, setVehicleType] = useState(
		currentVehicle?.vehicleType || ""
	);
	const [capacity, setCapacity] = useState(currentVehicle?.capacity || "");
	const [fuelType, setFuelType] = useState(currentVehicle?.fuelType || "");
	const [lastMaintenanceDate, setLastMaintenanceDate] = useState<CalendarDate | null>(
		currentVehicle?.lastMaintenanceDate
			? parseDateUtil(currentVehicle.lastMaintenanceDate)
			: null
	);
	const [nextMaintenanceDate, setNextMaintenanceDate] = useState<CalendarDate | null>(
		currentVehicle?.nextMaintenanceDate
			? parseDateUtil(currentVehicle.nextMaintenanceDate)
			: null
	);
	const [insuranceNumber, setInsuranceNumber] = useState(
		currentVehicle?.insuranceNumber || ""
	);
	const [insuranceExpiryDate, setInsuranceExpiryDate] = useState<string | null>(
    formatDateString(currentVehicle?.insuranceExpiryDate)
  );
	const [isActive, setIsActive] = useState<boolean>(
		currentVehicle?.isActive || true
	);
	const [puc, setPUC] = useState<CalendarDate | null>(
		currentVehicle?.puc
			? parseDateUtil(currentVehicle.puc)
			: null
	);
	const [fitness, setFitness] = useState<CalendarDate | null>(
		currentVehicle?.fitness
			? parseDateUtil(currentVehicle.fitness)
			: null
	);
	const [tax, setTaxDate] = useState<CalendarDate | null>(
		currentVehicle?.tax
			? parseDateUtil(currentVehicle.tax)
			: null
	);
	const [form10, setForm10] = useState<CalendarDate | null>(
		currentVehicle?.form10
			? parseDateUtil(currentVehicle.form10)
			: null
	);
	const [isSaving, setIsSaving] = useState(false);

	const handleSubmit = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		onClose: () => void
	) => {
		e.preventDefault();
		setIsSaving(true);
		let vehicleEndpoint = "/api/vehicles";
		if (mode === "EDIT") {
			vehicleEndpoint = `${vehicleEndpoint}/id/${currentVehicle?.id}}`;
		}
		try {
			const response = await fetch(vehicleEndpoint, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					registrationNumber,
					make,
					model,
					year,
					vehicleType,
					capacity,
					fuelType,
					isActive,
					lastMaintenanceDate,
					nextMaintenanceDate,
					insuranceNumber,
					insuranceExpiryDate,
					puc,
					fitness,
					tax,
					form10,
				}),
			});

			console.log("Response: ", response);
			if (!response.ok) {
				throw new Error("Failed to add customer");
			}
			setRegistrationNumber("");
			setMake("");
			setModel("");
			setYear("");
			setVehicleType("");
			setCapacity("");
			setIsActive(true);
			setFuelType("");
			setIsSaving(false);
			setLastMaintenanceDate(null);
			setNextMaintenanceDate(null);
			setInsuranceNumber("");
			setInsuranceExpiryDate(null);
			setPUC(null);
			setFitness(null);
			setTaxDate(null);
			setForm10(null);
			if (mode === "EDIT") {
				onClose();
			}
			onVehicleAdded();
		} catch (error) {
			toast.error(`Failed to ${mode === "EDIT" ? "update" : "add"} customer!`);
			console.error("Error adding customer:", error);
			setIsSaving(false);
		}
	};

	React.useEffect(() => {
		if (mode === "EDIT" && currentVehicle) {
			onOpen();
		}
	}, [currentVehicle, mode]);

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
					onClose={() => resetMode()}
				>
					<ModalContent>
						{(onClose) => (
							<>
								<ModalHeader className="flex flex-col gap-1">
									Add Vehicle
								</ModalHeader>
								<ModalBody className="flex flex-col">
									<Input
										isRequired
										label="Registration Number"
										value={registrationNumber}
										onChange={(e) => setRegistrationNumber(e.target.value)}
									/>
									<div className="grid grid-cols-3 gap-2">
										<Input
											label="Brand"
											value={make}
											onChange={(e) => setMake(e.target.value)}
										/>
										<Input
											label="Model"
											value={model}
											onChange={(e) => setModel(e.target.value)}
										/>
										<Input
											type="number"
											label="Year"
											value={year.toString()}
											onChange={(e) => setYear(Number(e.target.value))}
										/>
									</div>
									<Divider className="my-4" />
									<div className="grid grid-cols-3 gap-2">
										<Input
											label="Vehicle Type"
											value={vehicleType}
											onChange={(e) => setVehicleType(e.target.value)}
										/>
										<Input
											label="Capacity"
											value={capacity.toString()}
											onChange={(e) => setCapacity(Number(e.target.value))}
										/>
										<Input
											label="Fuel Type"
											value={fuelType}
											onChange={(e) => setFuelType(e.target.value)}
										/>
									</div>
									<div className="grid grid-cols-2 gap-2">
										<Input
											label="Insurance Number"
											value={insuranceNumber}
											onChange={(e) => setInsuranceNumber(e.target.value)}
										/>
										<DatePicker
											label={"Insurance Expiry"}
											showMonthAndYearPickers
											endContent={
												<CalendarIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
											}
											placeholder="dd-mm-yyyy"
											value={insuranceExpiryDate}
											onChange={(e) => setInsuranceExpiryDate(e)}
										/>
									</div>
									<div className="grid grid-cols-4 gap-2">
										<DatePicker
											label={"PUC"}
											showMonthAndYearPickers
											endContent={
												<CalendarIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
											}
											value={puc}
											onChange={(e) => setPUC(e)}
										/>
										<DatePicker
											label={"Fitness"}
											showMonthAndYearPickers
											endContent={
												<CalendarIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
											}
											value={fitness}
											onChange={(e) => setFitness(e)}
										/>
										<DatePicker
											label={"Tax"}
											showMonthAndYearPickers
											endContent={
												<CalendarIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
											}
											value={tax}
											onChange={(e) => setTaxDate(e)}
										/>
										<DatePicker
											label={"Form 10"}
											showMonthAndYearPickers
											endContent={
												<CalendarIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
											}
											value={form10}
											onChange={(e) => setForm10(e)}
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
											value={lastMaintenanceDate}
											onChange={(e) => setLastMaintenanceDate(e)}
										/>
										<DatePicker
											label={"Next Maintenance"}
											showMonthAndYearPickers
											endContent={
												<CalendarIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
											}
											value={nextMaintenanceDate}
											onChange={(e) => setNextMaintenanceDate(e)}
										/>
									</div>
								</ModalBody>
								<ModalFooter>
									<div className="grid grid-cols-4 gap-2 w-full">
										<Switch
											defaultSelected
											color="success"
											value={isActive.toString()}
											onChange={(e) => setIsActive(e.target.checked)}
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
														isLoading={isSaving}
														onClick={(e) => handleSubmit(e, onClose)}
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
			</>
		</div>
	);
};
