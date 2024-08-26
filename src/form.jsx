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

	const handleSubmit = async (e) => {
		e.preventDefault();
	
		// Check if the application number has already been used
		if (!isApplicationNumberUnique(formData.applicationNumber)) {
			alert("This application number has already been used. Please use a different one.");
			return;
		}
	
		try {
			const response = await fetch('http://localhost:3000/form.jsx', { // Updated URL
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: formData.applicationNumber,
					name: formData.name,
					rollno: formData.applicationNumber,
					emailid: formData.email,
					phoneno: formData.contactInfo,
					branch: formData.branch,
				}),
			})
			
	
			if (response.ok) {
				alert("Form submitted successfully!");
				console.log("Form Data:", formData);
	
				// Reset the form after successful submission
				setFormData({
					name: "",
					branch: "",
					applicationNumber: "",
					contactInfo: "",
					email: "",
				});
	
				// Update the local storage with the new application number
				const usedNumbers = JSON.parse(localStorage.getItem("usedApplicationNumbers")) || [];
				usedNumbers.push(formData.applicationNumber);
				localStorage.setItem("usedApplicationNumbers", JSON.stringify(usedNumbers));
			} else {
				const errorText = await response.text();
				alert(`Failed to submit form: ${errorText}`);
			}
		} catch (error) {
			console.error("Error submitting form:", error);
			alert("An error occurred while submitting the form. Please try again later.");
		}
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
