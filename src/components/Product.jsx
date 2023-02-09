const Product = ({ product }) => {
	const { id, title, price, description, image, category, rating } = product;

	return (
		<>
			<h2>{title}</h2>
			<p>{price}</p>
		</>
	);
};

export default Product;
