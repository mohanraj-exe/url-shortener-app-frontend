import { Route, Routes} from "react-router-dom";
import UrlMain from "./components/url main";

function App() {
		return (
		<Routes>
			<Route path="/" exact element={<UrlMain />} />
		</Routes>
	);
}

export default App;
