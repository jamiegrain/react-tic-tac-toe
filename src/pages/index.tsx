import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";

import styles from "@/styles/Home.module.css";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	const router = useRouter();

	React.useEffect(() => {
		router.push("/grid");
	}, [router]);

	return <></>;
}
