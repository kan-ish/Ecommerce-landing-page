import { useState, useEffect } from "react";
import { SimpleGrid, Heading, Input } from "@chakra-ui/react";
import Product from "./Product";

const LandingPage = () => {
	const [data, setData] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

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
			<Heading mb={10}>Products</Heading>
			<Input
				variant="filled"
				// colorScheme="whatsapp"
				value={searchTerm}
				onChange={({ target: { value } }) => setSearchTerm(value)}
				placeholder="Search..."
			/>
			<SimpleGrid columns={3} spacing={10}>
				{data
					.filter(({ title }) =>
						!searchTerm
							? true
							: title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
					)
					.map((product) => {
						return <Product key={product.id} product={product} />;
					})}
			</SimpleGrid>
		</div>
	);
};

export default LandingPage;
