import React from "react";
import Customers from "@/components/customers";
import { SessionProvider } from "next-auth/react";

const accounts = async () => {
	return <Customers />;
};

export default accounts;
