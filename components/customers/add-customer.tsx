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
import React from "react";
import { PlusIcon } from "../icons/PlusIcon";

export const AddCustomer = () => {
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
					Add Customer
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
									Add Customer
								</ModalHeader>
								<ModalBody className="flex flex-col">
									<Input isRequired label="Name" />
									<div className="grid grid-cols-3 gap-2">
										<Input label="Contact Person" />
										<Input label="Contact Number" />
										<Input type="email" label="Email" />
									</div>
									<Textarea label="Address" />
									<div className="grid grid-cols-2 gap-2 ">
										<Input label="GSTIN" />
										<Input
											type="number"
											label="Opening Balance"
											startContent={
												<div className="pointer-events-none flex items-center">
													<span className="text-default-400 text-small">₹</span>
												</div>
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
