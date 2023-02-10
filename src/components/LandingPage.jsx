import { useState, useEffect } from "react";
import { SimpleGrid, Heading, Input, Select } from "@chakra-ui/react";
import Product from "./Product";

const LandingPage = () => {
	const [data, setData] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [sortField, setSortField] = useState("id");

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
			<Select
				variant="filled"
				colorScheme="whatsapp"
				placeholder="Sort by"
				onChange={({ target: { value } }) => setSortField(value)}
			>
				<option value="rating.rate">Rating</option>
				<option value="rating.count">Review count</option>
				<option value="price">Price</option>
			</Select>
			<SimpleGrid columns={3} spacing={10}>
				{data
					.filter(({ title }) =>
						!searchTerm
							? true
							: title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
					)
					.sort((a, b) => {
						let sortField1 = sortField;
						let sortField2 = undefined;

						if (sortField.indexOf(".") !== -1) {
							[sortField1, sortField2] = sortField.split(".");
						}

						const comparisonValue =
							(a[sortField1][sortField2] ?? a[sortField1]) >
							(b[sortField1][sortField2] ?? b[sortField1]);

						return comparisonValue;
					})
					.map((product) => {
						return (
							<div className="card">
								<Product key={product.id} product={product} />;
							</div>
						);
					})}
			</SimpleGrid>
		</div>
	);
};

export default LandingPage;
