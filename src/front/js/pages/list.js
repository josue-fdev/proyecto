import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Pizzas } from "./pizzas";

export const List = () => {
	const { store, actions } = useContext(Context);

	function theresDish(name) {
		let theres = store.myFood.map(el => el === name);

		if (theres != undefined) {
			return true;
		}
	}

	return (
		<div className="container mb-2">
			<div className="d-flex justify-content-between">
				<Link to="/pizzas">
					<span className="btn btn-danger" role="button">
						Menu
					</span>
				</Link>
				<span
					className="btn btn-outline-light"
					role="button"
					onClick={() => {
						actions.deleteAll();
					}}>
					Delete all
				</span>
			</div>

			<h2 className="titulo2">List of Food</h2>

			{store.myFood.length == 0 ? (
				<div>
					<h1 className="text-center mt-3">Select your food </h1>
				</div>
			) : (
				<div className="cartas container mb-2 mt-3">
					{store.pizzas.map((element, index) => {
						return theresDish(element.name) ? <Pizzas key={index} name={element.name} /> : null;
					})}
				</div>
			)}
			<div className="posicionFooter" />
		</div>
	);
};
