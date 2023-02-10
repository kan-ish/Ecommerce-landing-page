import { useState, useEffect } from "react";
import { SimpleGrid, Heading, Spinner } from "@chakra-ui/react";
import Product from "./Product";
import SearchAndSort from "./SearchAndSort";

const LandingPage = () => {
	const [data, setData] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [sortField, setSortField] = useState("id");
	const [sortDirection, setSortDirection] = useState("ascending");
	const [isDataLoaded, setIsDataLoaded] = useState(false);

	async function requestData() {
		const res = await fetch("https://fakestoreapi.com/products");
		const json = await res.json();

		setData(json);
		setIsDataLoaded(true);
	}

	useEffect(() => {
		//fetch data on load
		requestData()
			.then()
			.catch((e) => console.error(e));
	}, []);

	if (!isDataLoaded) {
		return <Spinner color="red.500" size="xl" />;
	}

	return (
		<div>
			<Heading textAlign="left" mb={10}>
				Products
			</Heading>

			<SearchAndSort
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
				setSortDirection={setSortDirection}
				setSortField={setSortField}
			/>

			<SimpleGrid columns={3} spacing={10}>
				{data
					// Search logic
					.filter(({ title }) =>
						!searchTerm
							? true
							: title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
					)

					// Sort logic
					.sort((a, b) => {
						let sortField1 = sortField;
						let sortField2 = undefined;

						// handles nested sort parameter by breaking them up
						if (sortField.indexOf(".") !== -1) {
							[sortField1, sortField2] = sortField.split(".");
						}

						// use nullish coaelescing in case sortField2 is not present and only use sortField1
						const comparisonValue =
							(a[sortField1][sortField2] ?? a[sortField1]) >
							(b[sortField1][sortField2] ?? b[sortField1]);

						// sort by ascending or descending order
						return sortDirection === "ascending"
							? comparisonValue
							: !comparisonValue;
					})
					.map((product) => {
						return (
							<div className="card">
								<Product product={product} />
							</div>
						);
					})}
			</SimpleGrid>
		</div>
	);
};

export default LandingPage;
