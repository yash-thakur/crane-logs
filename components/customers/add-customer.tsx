import {
	Button,
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
import React, { useState } from "react";
import { PlusIcon } from "../icons/PlusIcon";
import { Customer } from ".";
import { toast } from "sonner";

interface AddCustomerFormProps {
	onCustomerAdded: () => void;
	currentCustomer?: Customer;
	mode: "EDIT" | "NEW";
	resetMode: () => void;
}

export const AddCustomer = ({
	onCustomerAdded,
	currentCustomer,
	mode,
	resetMode,
}: AddCustomerFormProps) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [name, setName] = useState(currentCustomer?.name || "");
	const [email, setEmail] = useState(currentCustomer?.email || "");
	const [contactPerson, setContactPerson] = useState(
		currentCustomer?.contactPerson || ""
	);
	const [phoneNumber, setPhoneNumber] = useState(
		currentCustomer?.phoneNumber || ""
	);
	const [openingBalance, setOpeningBalance] = useState(
		currentCustomer?.openingBalance || ""
	);
	const [address, setAddress] = useState(currentCustomer?.address || "");
	const [isActive, setIsActive] = useState<boolean>(
		currentCustomer?.isActive || true
	);
	const [gstin, setGSTIN] = useState(currentCustomer?.gstin || "");
	const [isSaving, setIsSaving] = useState(false);

	const handleSubmit = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		onClose: () => void
	) => {
		e.preventDefault();
		setIsSaving(true);
		let customerEndpoint = "/api/customers";
		if (mode === "EDIT") {
			customerEndpoint = `${customerEndpoint}/id/${currentCustomer?.id}}`;
		}
		try {
			const response = await fetch(customerEndpoint, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name,
					email,
					phoneNumber,
					contactPerson,
					openingBalance: Number(openingBalance || 0),
					gstin,
					address,
					isActive,
				}),
			});

			console.log("Response: ", response);
			if (!response.ok) {
				throw new Error("Failed to add customer");
			}
			setName("");
			setEmail("");
			setPhoneNumber("");
			setContactPerson("");
			setOpeningBalance("");
			setAddress("");
			setIsActive(true);
			setGSTIN("");
			setIsSaving(false);
			if (mode === "EDIT") {
				onClose();
			}
			onCustomerAdded();
		} catch (error) {
			toast.error(`Failed to ${mode === "EDIT" ? "update" : "add"} customer!`);
			console.error("Error adding customer:", error);
			setIsSaving(false);
		}
	};

	React.useEffect(() => {
		if (mode === "EDIT" && currentCustomer) {
			onOpen();
		}
	}, [currentCustomer, mode]);

	return (
		<div>
			<>
				<Button onPress={onOpen} color="primary" endContent={<PlusIcon />}>
					Add Customer
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
									Add Customer
								</ModalHeader>
								<ModalBody className="flex flex-col">
									<Input
										isRequired
										label="Name"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
									<div className="grid grid-cols-3 gap-2">
										<Input
											label="Contact Person"
											value={contactPerson}
											onChange={(e) => setContactPerson(e.target.value)}
										/>
										<Input
											label="Contact Number"
											value={phoneNumber}
											onChange={(e) => setPhoneNumber(e.target.value)}
										/>
										<Input
											type="email"
											label="Email"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</div>
									<Textarea
										label="Address"
										value={address}
										onChange={(e) => setAddress(e.target.value)}
									/>
									<div className="grid grid-cols-2 gap-2 ">
										<Input
											label="GSTIN"
											value={gstin}
											onChange={(e) => setGSTIN(e.target.value)}
										/>
										<Input
											type="number"
											label="Opening Balance"
											startContent={
												<div className="pointer-events-none flex items-center">
													<span className="text-default-400 text-small">₹</span>
												</div>
											}
											value={openingBalance}
											onChange={(e) => setOpeningBalance(e.target.value)}
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
