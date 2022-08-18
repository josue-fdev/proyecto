import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.scss";

export const Menu = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<ul className="list-group">
				<li key={2} className="list-group-item d-flex justify-content-between" style={{ background: "white" }}>
					<Link to={"/pizzas"}>
						<span>Pizzas</span>
					</Link>
				</li>
			</ul>
			<br />
			<Link to="/">
				<button className="btn btn-primary">Go Out </button>
			</Link>
		</div>
	);
};
