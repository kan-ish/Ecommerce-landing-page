import { Input, Select, SimpleGrid } from "@chakra-ui/react";

const SearchAndSort = ({
	searchTerm,
	setSortDirection,
	setSortField,
	setSearchTerm,
}) => {
	// Not using placeholder prop directly
	// How to make placeholder text non-selectable: https://github.com/chakra-ui/chakra-ui/issues/5863
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
					onChange={({ target: { value } }) => setSortField(value)}
				>
					<option selected hidden disabled value="">Sort By</option>
					<option value="rating.rate">Rating</option>
					<option value="rating.count">Review count</option>
					<option value="price">Price</option>
				</Select>
				<Select
					variant="filled"
					onChange={({ target: { value } }) => setSortDirection(value)}
				>
					<option selected hidden disabled value="">Sort order</option>
					<option value="ascending">Ascending</option>
					<option value="descending">Descending</option>
				</Select>
			</SimpleGrid>
		</>
	);
};

export default SearchAndSort;
