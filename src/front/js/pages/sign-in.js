import { Context } from "../store/appContext";
import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const SignIn = props => {
	const [user_name, setUser] = useState("");
	const [password, setPassword] = useState("");
	const [redirect, setRedirect] = useState(false);

	const handleSubmit = e => {
		e.preventDefault();
		if (user_name === "" || password === "") {
			alert("Please fill all the entries");
		}
		// FETCH
		const data = {
			password: password,
			user_name: user_name
		};

		fetch(process.env.BACKEND_URL + "/api/signin", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
			.then(response => {
				if (!response.ok) {
					response.text().then(text => alert(text));
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(data => {
				//console.log("Succesful sign in");
				setRedirect(true);
			})
			.catch(error => {
				//console.error("Error:", error);
			});
	};

	return (
		<div className="container d-flex justify-content-center">
			<div className="formulario-login">
				<h4 className="card-header">Sign in</h4>
				<div className="card-body">
					<form className="needs-validation" onSubmit={e => handleSubmit(e)}>
						<div className="form-row mt-3">
							<label>Username*</label>
							<input
								type="text"
								className="form-control"
								minLength="5"
								maxLength="80"
								onChange={e => {
									setUser(e.target.value);
								}}
								value={user_name}
								required
							/>
						</div>
						<div className="form-row mt-3">
							<label>Password*</label>
							<input
								type="password"
								className="form-control"
								minLength="8"
								maxLength="120"
								onChange={e => {
									setPassword(e.target.value);
								}}
								value={password}
								required
							/>
							<div className="valid-feedback" />
						</div>

						<div className="mt-3 form-row justify-content-end">
							<button className="btn btn-secondary" type="reset">
								Cancel
							</button>
							<button className="btn btn-primary ml-1" type="submit">
								Sign in
							</button>
						</div>
						<div>
							<p className="message">
								Not registered? <a href="/register">Create an account</a>
							</p>
						</div>
					</form>
				</div>
			</div>
			{redirect ? <Redirect to="/menu" /> : ""}
		</div>
	);
};
