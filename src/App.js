import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { LoadingProvider } from "./contexts/loading/LoadingContext";
import Router from "./routes/Router";

function App() {
  return (
    <div className="banner">
      <BrowserRouter>
        <LoadingProvider>
          <Router />
        </LoadingProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
