import { BrowserRouter } from "react-router-dom";
import "./styles/main.scss";
import AppRouter from "./components/AppRouter";
import './utils/checkHeight.js';

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
