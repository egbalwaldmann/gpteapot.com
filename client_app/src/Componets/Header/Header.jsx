import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "./hedaer.css";
const Title = styled.h1`
  text-align: center;
  color: #292f44;
  padding: 10px;
`;
const TopHeader = styled.header``;
export const Header = () => {
  return (
    <header className="TopHeader">
      <Title>gpteapot.com</Title>
      <menu>
        <nav>
          <ul>
            <li></li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </menu>
    </header>
  );
};
