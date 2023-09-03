import { BrowserRouter } from "react-router-dom";
import "./styles/main.scss";
import AppRouter from "./components/AppRouter";
import Header from "./components/Header/Header";
import { useState } from "react";

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
