import "./App.css";
import LandingPage from "./components/LandingPage";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
	return (
		<div className="App">
			<ChakraProvider>
				<LandingPage />
			</ChakraProvider>
		</div>
	);
}

export default App;
