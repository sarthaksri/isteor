import "./form.css";
import logo from "./ISTE Thapar Chapter Logo .png";
import { useForm } from "react-hook-form";

function RegistrationForm() {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors },
		reset,
	} = useForm();

	// Function to check if the application number is unique
	const isApplicationNumberUnique = (applicationNumber) => {
		const usedNumbers =
			JSON.parse(localStorage.getItem("usedApplicationNumbers")) || [];
		return !usedNumbers.includes(applicationNumber);
	};

	const onSubmit = async (data) => {
		// Check if the application number has already been used
		if (!isApplicationNumberUnique(data.applicationNumber)) {
			alert(
				"This application number has already been used. Please use a different one."
			);
			return;
		}

		// If unique, store the application number locally
		const usedNumbers =
			JSON.parse(localStorage.getItem("usedApplicationNumbers")) || [];
		usedNumbers.push(data.applicationNumber);
		localStorage.setItem("usedApplicationNumbers", JSON.stringify(usedNumbers));

		try {
			// Make a POST request to the provided API endpoint
			const response = await fetch("https://isteor-server-git-main-sarthaksris-projects.vercel.app/form.jsx", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: data.applicationNumber,
					name: data.name,
					rollno: data.applicationNumber,
					emailid: data.email,
					phoneno: data.contactInfo,
					branch: data.branch,
				}),
			});

			// Check if the response is ok
			if (response.ok) {
				alert("Form submitted successfully!");
				console.log("Form Data:", data);

				// Reset the form after successful submission
				reset();
			} else {
				const errorText = await response.text();
				alert(`Failed to submit form: ${errorText}`);
			}
		} catch (error) {
			// Handle network or other errors
			console.error("Error submitting form:", error);
			alert("There was an error submitting the form. Please try again later.");
		}
	};

	const Error = function ({ message }) {
		return <span style={{ display: "block", color: "wheat" }}>{message}</span>;
	};

	return (
		<div className="form-container">
			<form onSubmit={handleSubmit(onSubmit)} className="glassmorphism">
				<div className="logo-container">
					<img src={logo} alt="ISTE Thapar Chapter Logo" className="logo" />
				</div>
				<h2 className="title">ORIENTATION</h2>
				<input
					type="text"
					placeholder="Name"
					{...register("name", {
						required: "Name is Required.",
						minLength: {
							value: 1,
							message: "Name should be at least 1 character long.",
						},
					})}
					aria-label="Name"
				/>
				{errors.name && <Error message={errors.name.message} />}

				<input
					type="text"
					placeholder="Branch"
					{...register("branch", { required: "Branch is Required." })}
					aria-label="Branch"
				/>
				{errors.branch && <Error message={errors.branch.message} />}

				<input
					type="number"
					placeholder="Application Number"
					{...register("applicationNumber", {
						required: "Application Number is Required.",
						validate: (value) => {
							if (value.length !== 6) {
								return "Invalid Application Number.";
							}
							if (isNaN(value)) {
								return "Application Number should be a number";
							}
						},
					})}
					aria-label="Application Number"
				/>
				{errors.applicationNumber && <Error message={errors.applicationNumber.message} />}

				<input
					type="number"
					placeholder="Contact Info"
					{...register("contactInfo", {
						required: "Contact Info is Required.",
						validate: (value) => {
							if (value.length !== 10) {
								return "Invalid Number.";
							}
							if (isNaN(value)) {
								return "Contact Info should be a number.";
							}
						},
					})}
					aria-label="Contact Info"
				/>
				{errors.contactInfo && <Error message={errors.contactInfo.message} />}

				<input
					type="email"
					placeholder="Email"
					{...register("email", {
						required: "Email is Required.",
						pattern: {
							value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,})+$/,
							message: "Invalid Email.",
						},
					})}
					aria-label="Email"
				/>
				{errors.email && <Error message={errors.email.message} />}
				
				<button type="submit" style={{ marginTop: "1rem" }}>
					{isSubmitting ? "Registering..." : "Register"}
				</button>
			</form>
		</div>
	);
}

export default RegistrationForm;
