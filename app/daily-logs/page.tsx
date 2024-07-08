import React from "react";
import DailyLogs from "@/components/daily-logs";
import { SessionProvider } from "next-auth/react";

const accounts = async () => {
	return <DailyLogs />;
};

export default accounts;
