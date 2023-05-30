import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import MyProjects from "./page";

describe("My Projects Page", () => {
	it("should render correctly", () => {
		render(<MyProjects />);
		const title = screen.getByText("My Projects");
		expect(title).toBeInTheDocument();
	});
});
