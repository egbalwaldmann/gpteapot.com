import "./App.css";
import Main from "./Componets/Main/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./Componets/Header/Header";
import { Contact } from "./Componets/Contact/contact";
import { About } from "./Componets/AboutUs/About";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
