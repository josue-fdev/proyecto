import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

//import { TicketPass } from "./pages/ticketpass";
import { Home } from "./pages/home";

import { Register } from "./pages/register";
import { SignIn } from "./pages/sign-in";

import { Menu } from "./pages/menu";
import { InfoDish } from "./pages/infodish";
import { Pizzas } from "./pages/pizzas";

//import UserContextProvider from "./store/userContext";

import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { MyFood } from "./pages/myfood";
import { List } from "./pages/list";

//create your first component
export const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	const [signedIn, setSignedIn] = useState(false);

	return (
		<>
			<div className="d-flex flex-column h-100">
				<>
					<BrowserRouter basename={basename}>
						<ScrollToTop>
							<Navbar signedIn={signedIn} setSignedIn={setSignedIn} />
							<Switch>
								<Route exact path="/">
									<Home />
								</Route>
								<Route exact path="/register">
									<Register />
								</Route>
								<Route exact path="/sign-in">
									<SignIn />
								</Route>

								<Route exact path="/myfood">
									<MyFood />
								</Route>

								<Route exact path="/infodish">
									<InfoDish />
								</Route>

								<Route exact path="/menu">
									<Menu />
								</Route>

								<Route exact path="/pizzas">
									<Pizzas />
								</Route>

								<Route exact path="/list">
									<List />
								</Route>

								<Route>
									<h1>Not found!</h1>
								</Route>
							</Switch>
							<Footer />
						</ScrollToTop>
					</BrowserRouter>
				</>
			</div>
		</>
	);
};

export default injectContext(Layout);
