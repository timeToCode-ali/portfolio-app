import React from "react";
import "./global.css";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { aboutMeData, pages, contactMeLinks } from "./data/data";
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html>
			<head />
			<body>
				<Header name={aboutMeData.name} pages={pages} />
				<main className='sm:mb-32 mb-16'>{children}</main>
				<Footer contactMeLinks={contactMeLinks} />
			</body>
		</html>
	);
}
