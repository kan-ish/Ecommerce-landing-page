import { useState, useEffect } from "react";
import {SimpleGrid, Heading, Spinner, Stack, Alert, AlertIcon} from "@chakra-ui/react";
import Product from "./Product";
import SearchAndSort from "./SearchAndSort";

const LandingPage = () => {
	const [data, setData] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [sortField, setSortField] = useState("id");
	const [sortDirection, setSortDirection] = useState("ascending");
	const [isDataLoaded, setIsDataLoaded] = useState(false);
	const [isFetchError, setIsFetchError] = useState(false);

	async function requestData() {
		// when does fetch throw an error?
		// when should it throw an error?
		// how to display error?
		let res
		let json

		try {
			res = await fetch('https://fakestoreapi.com/products');
		} catch (error) {
			// handles the case when API is down, 5xx error codes
			throw new Error('Error while trying to fetch data, backend is probably down')
		}

		// Uses the 'optional chaining' operator
		// handles the case of 4xx response codes
		if (res?.ok) {
			json = await res.json();
		} else {
			throw new Error('Error while trying to read JSON data, we probably did something wrong on the front-end')
		}

		setData(json);
	}

	useEffect(() => {
		//fetch data on load
		requestData()
			.then()
			.catch((e) => {
				console.error(e)
				setIsFetchError(true)
			})
			.finally(() => setIsDataLoaded(true));
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

			{!isFetchError && <SimpleGrid columns={3} spacing={10}>
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

						// use nullish coalescing in case sortField2 is not present and only use sortField1
						const comparisonValue =
							(a[sortField1][sortField2] ?? a[sortField1]) >
							(b[sortField1][sortField2] ?? b[sortField1]);

						// sort by ascending or descending order
						return sortDirection === "ascending"
							? comparisonValue
							: !comparisonValue;
					})
					.map((product) =><div><Product product={product} key={product.id} /></div> )}
			</SimpleGrid>
			}

			{isFetchError && (
				<Stack spacing={3}>
					<Alert status='error'>
						<AlertIcon />
						There was an error while trying to load data. We are working to fix it.
					</Alert>
				</Stack>
			)}
		</div>
	);
};

export default LandingPage;
