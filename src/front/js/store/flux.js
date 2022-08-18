const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			myFood: [],
			demo: [],
			handle_hello: [],
			pizzas: [
				{
					category: "pizzas",
					name: "Pizza Mediterranea",
					description:
						"One of the most popular foods in the world and a common fast food item in Europe and North America.",
					img:
						"https://www.vanidades.com/wp-content/uploads/2018/06/Pizzas-caseras-y-f%C3%A1ciles-de-preparar.jpg"
				}
			]
		},
		actions: {
			loadMyFood: () => {
				let token = sessionStorage.getItem("token");
				fetch(process.env.BACKEND_URL + "/api/myFood", {
					method: "GET",
					headers: {
						Authorization: "Bearer " + token
					}
				})
					.then(response => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(data => {
						setStore({ myFood: data });
						console.log("MyFood were added");
					})
					.catch(err => console.error(err));
			},

			addMyFood: variable => {
				let data = {
					Food: variable
				};

				let token = sessionStorage.getItem("token");
				fetch(process.env.BACKEND_URL + "/api/myFood", {
					method: "GET",
					headers: {
						Authorization: "Bearer " + token
					},
					body: JSON.stringify(data)
				})
					.then(response => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(datos => {
						setStore({ pizzas: data });
						console.log("MyFood added");
					})
					.catch(error => {
						console.error("Error:", error);
					});
			},

			deleteFood: variable => {
				let token = sessionStorage.getItem("token");
				fetch(process.env.BACKEND_URL + "/api/myFood", {
					method: "DELETE",
					headers: {
						Authorization: "Bearer " + token
					}
				})
					.then(response => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(data => {
						setStore({ pizzas: data });
						//console.log("MyComic deleted");
					})
					.catch(error => {
						//console.error("Error:", error);
					});
			},

			deleteAll: () => {
				let token = sessionStorage.getItem("token");
				fetch(process.env.BACKEND_URL + "/api/myFood", {
					method: "DELETE",
					headers: {
						Authorization: "Bearer " + token
					}
				})
					.then(response => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(data => {
						setStore({ pizzas: data });
						console.log("MyFood deleted");
					})
					.catch(error => {
						console.error("Error:", error);
					});
			}
		}
	};
};

export default getState;
