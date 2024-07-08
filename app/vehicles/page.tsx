import React from "react";
import Vehicles from "@/components/vehicles";
import { SessionProvider } from "next-auth/react";

const accounts = async () => {
	return <Vehicles />;
};

export default accounts;
