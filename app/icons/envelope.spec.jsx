import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import React from "react";
import { Envelope } from "./envelope";

describe("Envelope Icon", () => {
	it("should render correctly", () => {
		const { container } = render(<Envelope className='class' />);
		const svgElement = container.querySelector("svg");

		expect(svgElement).toBeInTheDocument();
		expect(svgElement).toHaveAttribute("width", "1em");
		expect(svgElement).toHaveAttribute("height", "1em");

		expect(svgElement).toHaveClass("class");
	});
});
