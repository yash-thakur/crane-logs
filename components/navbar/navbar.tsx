import { Navbar, NavbarContent } from "@nextui-org/react";
import React from "react";
import { BurguerButton } from "./burguer-button";
import { NotificationsDropdown } from "./notifications-dropdown";
import { UserDropdown } from "./user-dropdown";

interface Props {
	children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
	return (
		<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
			<Navbar
				isBordered
				className="w-full"
				classNames={{
					wrapper: "w-full max-w-full",
				}}
			>
				<NavbarContent className="">
					<BurguerButton />
				</NavbarContent>
				<NavbarContent
					justify="end"
					className="w-fit data-[justify=end]:flex-grow-0"
				>
					<NotificationsDropdown />
					<NavbarContent>
						<UserDropdown />
					</NavbarContent>
				</NavbarContent>
			</Navbar>
			{children}
		</div>
	);
};
