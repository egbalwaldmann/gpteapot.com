import React from "react";
import "./footer.css";
import { FaBars } from "react-icons/fa";
import { MdClose } from "react-icons/md";
export const Footer = ({ active, setActive }) => {
  const showSidebar = () => {
    setActive(!active);
    console.log(active);
  };

  return (
    <footer>
      <div onClick={showSidebar}>
        {active ? <MdClose /> : <FaBars />}
      </div>
    </footer>
  );
};
