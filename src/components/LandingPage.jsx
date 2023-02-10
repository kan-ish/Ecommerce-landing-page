import { useState, useEffect } from "react";
import { SimpleGrid } from "@chakra-ui/react";
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
		<div>
			<h1>Products</h1>
			<SimpleGrid columns={3} spacing={10}>
				{data.map((product) => {
					return <Product key={product.id} product={product} />;
				})}
			</SimpleGrid>
		</div>
	);
};

export default LandingPage;
