import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import AboutMePage from "./page";

describe("About Me Page", () => {
	it("should render without crashing", () => {
		render(<AboutMePage />);

		const title = screen.getByText(/Hello! I'm Richard Brown/);

		expect(title).toBeInTheDocument();
	});
});
