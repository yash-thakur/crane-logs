import React from "react";
import Entries from "@/components/entries";
import { SessionProvider } from "next-auth/react";

const accounts = async () => {
	return <Entries />;
};

export default accounts;
