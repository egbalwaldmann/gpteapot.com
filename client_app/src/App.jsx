import { useState } from "react";
import "./App.css";
import Main from "./Componets/Main/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./Componets/Header/Header";
import { Contact } from "./Componets/Contact/contact";
import { About } from "./Componets/AboutUs/About";
import { Footer } from "./Componets/Footer/Footer";
import { RightMenu } from "./Componets/RightMenu/RightMenu";
function App() {
  const [showRightMenu, SetshowRightMenu] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <RightMenu
          active={showRightMenu}
          setActive={SetshowRightMenu}
        />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
        <Footer active={showRightMenu} setActive={SetshowRightMenu} />
      </BrowserRouter>
    </div>
  );
}

export default App;
