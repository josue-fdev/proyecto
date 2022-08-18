import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const InfoDish = () => {
	const { store, actions } = useContext(Context);

	function myFood(name) {
		let theres = store.myFood.find(el => el === name);

		if (theres != undefined) {
			return true;
		}
	}

	function Signed() {
		let signed = store.signed;
		if (signed == "true") {
			return true;
		}
	}

	return (
		<>
			{store.pizzas.map((element, index) => {
				return (
					<>
						<div className="divInfo container mb-2 align-self-center">
							<Link to="/">
								<span className="btn btn-danger" href="#" role="button">
									Back
								</span>
							</Link>
							<div className="col-3">
								<div className="card" style={{ width: "18rem" }}>
									<img src={element.img} className="card-img-top" alt="..." />
									<div className="card-body">
										<h5 className="card-title">{element.name}</h5>
										<p className="card-text">{element.description}</p>

										{store.myFood.length == 0 ? (
											<i
												className="fas fa-plus"
												onClick={() => {
													actions.addMyFood();
												}}
											/>
										) : myFood() ? (
											<i
												className="fas fa-plus"
												onClick={() => {
													actions.deleteFood();
												}}
											/>
										) : (
											<i
												className="fas fa-plus"
												onClick={() => {
													actions.addMyFood();
												}}
											/>
										)}
									</div>
								</div>
							</div>
						</div>
						<div className="posicionFooter" />
					</>
				);
			})}
		</>
	);
};
