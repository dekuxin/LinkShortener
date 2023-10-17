import { Toaster } from "./components/ui/toaster";
import LandingPage from "./pages";

function App() {
	return (
		<>
			<div className="text-primary min-h-screen bg-primary-foreground">
				<LandingPage />
				<Toaster />
			</div>
		</>
	);
}

export default App;
