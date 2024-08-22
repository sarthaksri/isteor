import React, { useState } from "react";
import "./form.css";
import logo from "./ISTE Thapar Chapter Logo .png";

function RegistrationForm() {
	const [formData, setFormData] = useState({
		name: "",
		branch: "",
		applicationNumber: "",
		contactInfo: "",
		email: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	// Function to check if the application number is unique
	const isApplicationNumberUnique = (applicationNumber) => {
		const usedNumbers = JSON.parse(localStorage.getItem("usedApplicationNumbers")) || [];
		return !usedNumbers.includes(applicationNumber);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Check if the application number has already been used
		if (!isApplicationNumberUnique(formData.applicationNumber)) {
			alert("This application number has already been used. Please use a different one.");
			return;
		}

		// If unique, store the application number and submit the form
		const usedNumbers = JSON.parse(localStorage.getItem("usedApplicationNumbers")) || [];
		usedNumbers.push(formData.applicationNumber);
		localStorage.setItem("usedApplicationNumbers", JSON.stringify(usedNumbers));

		alert("Form filled. Thank you!");
		console.log("Form Data:", formData);

		//  reset the form after submission
		setFormData({
			name: "",
			branch: "",
			applicationNumber: "",
			contactInfo: "",
			email: "",
		});
	};

	return (
		<div className="form-container">
			<form onSubmit={handleSubmit} className="glassmorphism">
				<div className="logo-container">
					<img src={logo} alt="ISTE Thapar Chapter Logo" className="logo" />
				</div>
				<h2 className="title">ORIENTATION</h2>
				<input
					type="text"
					name="name"
					placeholder="Name"
					value={formData.name}
					onChange={handleChange}
					required
					aria-label="Name"
				/>
				<input
					type="text"
					name="branch"
					placeholder="Branch"
					value={formData.branch}
					onChange={handleChange}
					required
					aria-label="Branch"
				/>
				<input
					type="text"
					name="applicationNumber"
					placeholder="Application Number"
					value={formData.applicationNumber}
					onChange={handleChange}
					required
					aria-label="Application Number"
				/>
				<input
					type="text"
					name="contactInfo"
					placeholder="Contact Info"
					value={formData.contactInfo}
					onChange={handleChange}
					required
					aria-label="Contact Info"
				/>
				<input
					type="email"
					name="email"
					placeholder="Email"
					value={formData.email}
					onChange={handleChange}
					required
					aria-label="Email"
				/>
				<button type="submit">Register</button>
			</form>
		</div>
	);
}

export default RegistrationForm;
