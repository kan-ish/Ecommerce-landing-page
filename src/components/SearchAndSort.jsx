import { Input, Select, SimpleGrid } from "@chakra-ui/react";

const SearchAndSort = ({
	searchTerm,
	setSortDirection,
	setSortField,
	setSearchTerm,
}) => {
	return (
		<>
			<Input
				variant="filled"
				value={searchTerm}
				onChange={({ target: { value } }) => setSearchTerm(value)}
				placeholder="Search..."
				mb={5}
			/>

			<SimpleGrid mb={10} columns={2} spacing={8}>
				<Select
					variant="filled"
					placeholder="Sort by"
					onChange={({ target: { value } }) => setSortField(value)}
				>
					<option value="rating.rate">Rating</option>
					<option value="rating.count">Review count</option>
					<option value="price">Price</option>
				</Select>
				<Select
					variant="filled"
					placeholder="Sort order"
					onChange={({ target: { value } }) => setSortDirection(value)}
				>
					<option value="ascending">Ascending</option>
					<option value="descending">Descending</option>
				</Select>
			</SimpleGrid>
		</>
	);
};

export default SearchAndSort;
