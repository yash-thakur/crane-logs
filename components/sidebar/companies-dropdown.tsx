"use client";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownSection,
	DropdownTrigger,
} from "@nextui-org/react";
import React, { useState } from "react";
import { AcmeIcon } from "../icons/acme-icon";
import { AcmeLogo } from "../icons/acmelogo";
import { BottomIcon } from "../icons/sidebar/bottom-icon";

interface Company {
	name: string;
	location: string;
	logo: React.ReactNode;
}

export const CompaniesDropdown = () => {
	return (
		<div className="w-full">
			<div className="flex items-center gap-2">
				<div className="flex flex-col gap-4">
					<h3 className="text-xl font-medium m-0 text-default-900 -mb-4 whitespace-nowrap">
						THAKUR
					</h3>
					<span className="text-xs font-medium text-default-500">
						Crane Services
					</span>
				</div>
			</div>
		</div>
	);
};
