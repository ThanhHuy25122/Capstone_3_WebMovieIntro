import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { LoadingProvider } from "./contexts/loading/LoadingContext";
import Router from "./routes/Router";

function App() {
  return (
    <>
      <BrowserRouter>
        <LoadingProvider>
          <Router />
        </LoadingProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
