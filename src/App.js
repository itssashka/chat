import { BrowserRouter } from "react-router-dom";
import "./styles/main.scss";
import AppRouter from "./components/AppRouter";

function App() {
    return (
      <div className="wrapper">     
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
      </div>
    );
}

export default App;
