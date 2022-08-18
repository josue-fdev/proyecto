import React from "react";
import { Link, Redirect } from "react-router-dom";
import { MyFood } from "../pages/myfood";
import PropTypes from "prop-types";

export const Navbar = props => {
	const handleClick = e => {
		e.preventDefault();
		props.setSignedIn(false);
	};

	return (
		<>
			<div className="posicionNav">
				<nav className="navbar navbar-expand-lg mb-3 pr-0 flex-nowrap fixed-top">
					<div className="container-fluid row">
						<Link to="/">
							<span className="navbar-brand mb-0">
								<img
									src="https://clipartart.com/images/3d-text-maker-clipart-8.png"
									alt="comic logo"
									className="logo-nav ml-2"
								/>
							</span>
						</Link>

						{props.signedIn ? (
							<Link to={"/"}>
								<span
									className="btn btn-outline-light ml-2 mr-2"
									onClick={e => handleClick(e)}
									href="#"
									role="button">
									Sign out
								</span>
							</Link>
						) : (
							<Link to={"/sign-in"}>
								<span className="btn btn-outline-light ml-2 mr-2" href="#" role="button">
									Sign In
								</span>
							</Link>
						)}
					</div>
				</nav>
			</div>
		</>
	);
};

Navbar.propTypes = {
	signedIn: PropTypes.bool,
	setSignedIn: PropTypes.func
};
