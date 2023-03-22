import React from "react";
import styled from "styled-components";

const Title = styled.h1`
  text-align: center;
  color: #D8D8D8;
  background-color: #408E91;
  padding: 15px;
  boder: 5px;
`;

export const Header = () => {
  return (
    <div>
      <Title>gpteapot.com</Title>
    </div>
  );
};
