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
  const [showRightMenu, SetshowRightMenu] = useState(false); // 🚀 Declare `showRightMenu` state variable and a function to set its value.

  return (
    <div className="App">
      {/* 🌐 `BrowserRouter` is a tool that allows allowing users to move between pages without needing to reload the whole page from the server. In this code, the `BrowserRouter` is being used to create routes for the website. A route is like a path that a user can take to get to a specific page. The `Routes` and `Route` components define these paths and tell the website which pages to show when the user goes to those paths. */}
      <BrowserRouter>
        {/* 🧭 Display the Header component */}
        <Header />
        {/* 🍔 Pass `active` and `setActive` props to the RightMenu component 
        The <RightMenu> component is used to create a hamburger menu.
        It takes two props: active and setActive. 
        active determines if the menu is currently displayed,
        while setActive updates the active value. 
        These props are set to showRightMenu and SetshowRightMenu, respectively,
        which allows the menu to be opened and closed using state.
        */}
        <RightMenu
          active={showRightMenu}
          setActive={SetshowRightMenu}
        />
        {/* 🚪 Define the routes of the application */}
        <Routes>
          {/* 🏠 Set up the main path */}
          <Route path="/" element={<Main />} />
          {/* 📞 Set up the contact page path */}
          <Route path="/contact" element={<Contact />} />
          {/* 💁‍♀️ Set up the about page path */}
          <Route path="/about" element={<About />} />
        </Routes>
        {/* 🦶 Pass `active` and `setActive` props to the Footer component */}
        <Footer
          active={showRightMenu}
          setActive={SetshowRightMenu}
        />
      </BrowserRouter>
    </div>
  );
}

export default App; // 🚀 Export the `App` component as the default export for this module.
