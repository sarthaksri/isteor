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

	// const [formData, setFormData] = useState({
	// 	name: "",
	// 	branch: "",
	// 	applicationNumber: "",
	// 	contactInfo: "",
	// 	email: "",
	// });

	// const handleChange = (e) => {
	// 	const { name, value } = e.target;
	// 	setFormData((prevData) => ({
	// 		...prevData,
	// 		[name]: value,
	// 	}));
	// };

	// Function to check if the application number is unique
	const isApplicationNumberUnique = (applicationNumber) => {
		const usedNumbers =
			JSON.parse(localStorage.getItem("usedApplicationNumbers")) || [];
		return !usedNumbers.includes(applicationNumber);
	};
	const validateFormData = (data) => {
		const { name, branch, applicationNumber, contactInfo, email } = data;
		return name && branch && applicationNumber && contactInfo && email;
		// Add more validation logic if needed (e.g., email format, contact number format)
	};

	const onSubmit = (data) => {
		// e.preventDefault();
		console.log(data);
		// if (errors) {
		// 	alert("Please fill all the fields.");
		// 	return;
		// }

		// Check if the application number has already been used
		if (!isApplicationNumberUnique(data.applicationNumber)) {
			alert(
				"This application number has already been used. Please use a different one."
			);
			return;
		}

		// If unique, store the application number and submit the form
		const usedNumbers =
			JSON.parse(localStorage.getItem("usedApplicationNumbers")) || [];
		usedNumbers.push(data.applicationNumber);
		localStorage.setItem("usedApplicationNumbers", JSON.stringify(usedNumbers));

		alert("Form filled. Thank you!");
		console.log("Form Data:", data);

		//  reset the form after submission
		// setFormData({
		// 	name: "",
		// 	branch: "",
		// 	applicationNumber: "",
		// 	contactInfo: "",
		// 	email: "",
		// });
		reset();
	};

	const Error = function ({ message }) {
		return <span style={{ display: "block", color: "wheat" }}>{message}</span>;
	};

	return (
		<div className="form-container">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="glassmorphism"
			>
				<div className="logo-container">
					<img
						src={logo}
						alt="ISTE Thapar Chapter Logo"
						className="logo"
					/>
				</div>
				<h2 className="title">ORIENTATION</h2>
				<input
					type="text"
					placeholder="Name"
					{...register("name", {
						required: "Name is Required.",
						minLength: {
							value: 1,
							message: "Name should be atleast 1 characters long.",
						},
					})}
					aria-label="Name"
				/>
				{errors.name && Error({ message: errors.name.message })}

				<input
					type="text"
					placeholder="Branch"
					{...register("branch", { required: "Branch is Required." })}
					aria-label="Branch"
				/>
				{errors.branch && Error({ message: errors.branch.message })}

				<input
					type="text"
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
				{errors.applicationNumber &&
					Error({ message: errors.applicationNumber.message })}

				<input
					type="text"
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
				{errors.contactInfo && Error({ message: errors.contactInfo.message })}

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
				{errors.email && Error({ message: errors.email.message })}
				<button
					type="submit"
					style={{ marginTop: "1rem" }}
				>
					{isSubmitting ? "Registering..." : "Register"}
				</button>
			</form>
		</div>
	);
}

export default RegistrationForm;
