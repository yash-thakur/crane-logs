import React from "react";
import Drivers from "@/components/drivers";
import { SessionProvider } from "next-auth/react";

const accounts = async () => {
	return <Drivers />;
};

export default accounts;
