import "@testing-library/jest-dom";
import "isomorphic-fetch";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { Form } from "./form";

const handlers = [
	rest.post("/api/contact", async (req, res, ctx) => {
		const { email } = await req.json();

		if (email === "bad_request@response.co.uk") {
			return res(
				ctx.status(400),
				ctx.json({
					message: "Bad Request",
				})
			);
		} else if (email === "internal_error@response.co.uk") {
			return res(
				ctx.status(500),
				ctx.json({
					message: "Internal Sever Error",
				})
			);
		}

		return res(ctx.status(200), ctx.json({ message: "Success!" }));
	}),
];

const server = setupServer(...handlers);

describe("Contatct Form component", () => {
	const consoleSpy = jest.spyOn(console, "log").mockImplementation();

	beforeAll(() => server.listen());
	afterEach(() => {
		server.restoreHandlers(), consoleSpy.mockClear();
	});
	afterAll(() => server.close());

	it("should submit the form and show a succesful message", async () => {
		render(<Form />);

		fireEvent.change(screen.getByLabelText("Name"), {
			target: {
				value: "Alicia",
			},
		});

		fireEvent.change(screen.getByLabelText("Company"), {
			target: {
				value: "Time to code",
			},
		});

		fireEvent.change(screen.getByLabelText("Email"), {
			target: {
				value: "time2code@gmail.com",
			},
		});

		fireEvent.change(screen.getByLabelText("Message"), {
			target: {
				value: "Hey there!",
			},
		});

		fireEvent.submit(
			screen.getByRole("button", {
				name: "Send Message",
			})
		);

		await waitFor(() => {
			expect(screen.getByText("Message has been Sent")).toBeInTheDocument();
		});
	});

	it("should handle 400 Bad Request resonse", async () => {
		render(<Form />);

		fireEvent.change(screen.getByLabelText("Name"), {
			target: {
				value: "Alicia",
			},
		});

		fireEvent.change(screen.getByLabelText("Company"), {
			target: {
				value: "Time to code",
			},
		});

		fireEvent.change(screen.getByLabelText("Email"), {
			target: {
				value: "bad_request@response.co.uk",
			},
		});

		fireEvent.change(screen.getByLabelText("Message"), {
			target: {
				value: "Hey there!",
			},
		});

		fireEvent.submit(
			screen.getByRole("button", {
				name: "Send Message",
			})
		);

		await waitFor(() => {
			expect(consoleSpy).toHaveBeenCalledWith(
				"There was a problem with the fetch operation HTTP error! status: 400"
			);
		});
	});

	it("should handle 500 Internal Sever Error", async () => {
		render(<Form />);

		fireEvent.change(screen.getByLabelText("Name"), {
			target: {
				value: "Alicia",
			},
		});

		fireEvent.change(screen.getByLabelText("Company"), {
			target: {
				value: "Time to code",
			},
		});

		fireEvent.change(screen.getByLabelText("Email"), {
			target: {
				value: "internal_error@response.co.uk",
			},
		});

		fireEvent.change(screen.getByLabelText("Message"), {
			target: {
				value: "Hey there!",
			},
		});

		fireEvent.submit(
			screen.getByRole("button", {
				name: "Send Message",
			})
		);

		await waitFor(() => {
			expect(consoleSpy).toHaveBeenCalledWith(
				"There was a problem with the fetch operation HTTP error! status: 500"
			);
		});
	});
});
