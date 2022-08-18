import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export function MyFood() {
	const { store } = useContext(Context);

	return (
		<>
			<div className="d-flex justify-content-end">
				{" "}
				<div className="dropdown d-flex justify-content-end" id="dropdownDiv">
					<button
						className="btn btn-light dropdown-toggle"
						data-boundary="window"
						type="button"
						id="dropdownMenuButton"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false">
						Myfood {""}
					</button>

					<div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
						<div id="dropdown" className="d-flex ml-4">
							Empty
						</div>
						<>
							{store.myFood.map((element, index) => {
								return (
									<div key={index} id="dropdown" className="d-flex flex-row">
										<Link className="d-flex flex-grow-1" to={"/demo/" + element}>
											<span className="dropdown-item">{element}</span>
										</Link>
										<i className="fas fa-trash-alt mt-2 mr-2" onClick={() => {}} />
									</div>
								);
							})}

							<div className="dropdown-divider" />
							<Link to={"/list/"}>
								<span className="dropdown-item">View list</span>
							</Link>
							<span className="btn btn-light d-flex flex-grow-1" role="button" onClick={() => {}}>
								<span className="ml-2">Delete all</span>
							</span>
						</>
					</div>
				</div>
			</div>
		</>
	);
}
