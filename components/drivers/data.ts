import React from "react";
const columns = [
	{ name: "ID", uid: "id", sortable: true },
	{ name: "Full Name", uid: "fullName", sortable: true },
	{ name: "Phone Number", uid: "phoneNumber", sortable: true },
	{ name: "Experience", uid: "yearsOfExperience", sortable: true },
	{ name: "License Expiry", uid: "licenseExpiry", sortable: true },
	{ name: "License Number", uid: "licenseNumber", sortable: false },
	{ name: "Salary", uid: "salary", sortable: true },
	{ name: "Aadhar", uid: "aadhar", sortable: false },
	{ name: "DOB", uid: "dateOfBirth", sortable: false },
	{ name: "Vehicle Type", uid: "vehicleType", sortable: false },
	{ name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
	{ name: "Active", uid: "active" },
	{ name: "Paused", uid: "paused" },
	{ name: "Vacation", uid: "vacation" },
];

export { columns, statusOptions };
