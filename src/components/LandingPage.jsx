import { useState, useEffect } from "react";
import Product from "./Product";

const LandingPage = () => {
	const [data, setData] = useState([]);

	async function requestData() {
		const res = await fetch("https://fakestoreapi.com/products");
		const json = await res.json();

		setData(json);
	}

	useEffect(() => {
		//fetch data on load
		requestData()
			.then()
			.catch((e) => console.error(e));
	}, []);

	return (
		<>
			<h1>Products</h1>
			{data.map((product) => {
				return <Product key={product.id} product={product} />;
			})}
		</>
	);
};

export default LandingPage;
