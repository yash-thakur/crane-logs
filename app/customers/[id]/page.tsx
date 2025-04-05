import type { NextPage } from "next";
import { Content } from "@/components/home/content";

const Test: NextPage = ({ params }: { params: { id: number } }) => {
	return <div>{params.id}</div>;
};

export default Test;
