import React from "react";
import "../../styles/home.scss";
import florItabo from "../../img/flor-de-itabo.jpg";

export const Home = () => {
	return (
		<div className="text-center mt-5" style={{ marginTop: "100px" }}>
			<h1>Welcome Geeks and Food Lovers!</h1>
			<div className="alert alert-info" />
			<p>
				{" "}
				<a href="https://www.spacejam.com/">A trip 4 Space Jam</a>
			</p>
			<img src={florItabo} style={{ borderRadius: "110px" }} />
			<h2> Comic is a place where eating is an Art: Same as love comics !</h2>
		</div>
	);
};
