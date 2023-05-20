"use client";
import React, { useState } from "react";

export const Form = () => {
	const [isMessageSent, setMessageSent] = useState<boolean>(false);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const target = e.currentTarget;

		const name = target.elements.namedItem("name") as HTMLInputElement;
		const company = target.elements.namedItem("company") as HTMLInputElement;
		const email = target.elements.namedItem("email") as HTMLInputElement;
		const message = target.elements.namedItem("message") as HTMLInputElement;

		const data = {
			name: name.value,
			company: company.value,
			email: email.value,
			message: message.value,
		};

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!response.ok) {
				throw new Error("HTTP error! status: " + response.status);
			}
			setMessageSent(true);
		} catch (error: any) {
			console.log(
				"There was a problem with the fetch operation " + error.message
			);
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit} className='bg-white p-10'>
				<div className='mb-4'>
					<label className='label-form' htmlFor='name'>
						Name
					</label>
					<input
						id='name'
						type='text'
						name='name'
						className='input-form'
						required
						minLength={3}
						maxLength={200}
					/>
				</div>

				<div className='mb-4'>
					<label className='label-form' htmlFor='company'>
						Company
					</label>
					<input
						id='company'
						type='text'
						name='company'
						className='input-form'
						minLength={2}
						maxLength={200}
					/>
				</div>

				<div className='mb-4'>
					<label className='label-form' htmlFor='email'>
						Email
					</label>
					<input
						id='email'
						type='email'
						name='email'
						className='input-form'
						required
						minLength={2}
						maxLength={200}
					/>
				</div>

				<div className='mb-4'>
					<label className='label-form' htmlFor='message'>
						Message
					</label>
					<textarea
						id='message'
						name='message'
						className='input-form'
						required
						minLength={10}
						maxLength={1000}
					/>
				</div>
				<button
					type='submit'
					className='bg-blue rounded-md text-white hover:text-blue hover:bg-white min-w-100 px-5 h-12 border border-slate-300 hover:border-indigo-300hover:border-1'
				>
					Send Message
				</button>
			</form>
			{isMessageSent && <p> Message has been Sent</p>}
		</>
	);
};
