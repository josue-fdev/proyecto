import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/index.scss";

export const Pizzas = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<div className="row">
				{store.pizzas.map((element, index) => {
					return (
						<>
							<div className="col-3">
								<div className="card" style={{ width: "18rem" }}>
									<img src={element.img} className="card-img-top" alt="..." />
									<div className="card-body">
										<h5 className="card-title">{element.name}</h5>

										<Link to={"/infodish"}>
											<a href="#" className="btn btn-primary">
												See it !
											</a>
										</Link>
									</div>
								</div>
							</div>
						</>
					);
				})}
			</div>
		</>
	);
};
