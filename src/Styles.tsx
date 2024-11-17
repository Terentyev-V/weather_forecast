

import styled, { createGlobalStyle } from "styled-components";

export const theme = {
  colors: {
    text: "#033043",
    active: "#fda521",
    inputBack: "#d1ccbf",  
    error: "red",
    shadow: "#0A7273",
    linear: "linear-gradient(180deg, #e9e3d5, #d5dbe9)",
  },
  fonts: {
    primary: "Roboto",
    labelAdd: "Berkshire Swash",
  },
  fontSize: {
    title: "4rem", 
    h3: "2rem",
    input: "1.5rem",
    button: "1rem",
  },
  margins: {
    header: "12px 0px",
    h1: "0px",
    section: "10px 10px",
    sectionH2: "18px 0px",
    sectionP: "5px 0px",
    bottom: "30px",
  },
};

// Global styles for applying to <body>
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${(props) => props.theme.colors.linear};
    min-height: 100vh;
    font-family: ${(props) => props.theme.fonts.primary}, sans-serif;
  }
`;

export const Main = styled.main`
  text-align: center;
`;

export const Header = styled.header`
  position: relative;
  margin: ${(props) => props.theme.margins.header};
  padding-top: 6px;
  padding-bottom: 18px;

  h1 {
    color: ${(props) => props.theme.colors.text};
    font-size: ${(props) => props.theme.fontSize.title};
    margin: ${(props) => props.theme.margins.h1};
  }

  h3 {
    font-family: ${(props) => props.theme.fonts.labelAdd}, serif;
    font-size: ${(props) => props.theme.fontSize.h3};
    position: absolute;
    top: 25%;
    left: 55%;
    color: ${(props) => props.theme.colors.active};
    transform: rotate(-7.5deg);
  }
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: ${(props) => props.theme.margins.bottom};

  p {
    color: ${(props) => props.theme.colors.error};
  }
`;

export const Input = styled.input`
  text-align: center;
  min-height: 48px;
  min-width: 140px;
  border: none;
  border-radius: 6px;
  background: ${(props) => props.theme.colors.inputBack};
  font-size: ${(props) => props.theme.fontSize.input};
`;

export const Button = styled.button`
  background-color: ${(props) => props.theme.colors.active};
  border: none;
  min-height: 52px;
  border-radius: 12px;
  padding: 0px 32px;
  font-size: ${(props) => props.theme.fontSize.button};
  color: ${(props) => props.theme.colors.text};
`;

export const Section = styled.section`
  width: 75vw;
  max-width: 400px;
  height: 359.6px;
  margin: ${(props) => props.theme.margins.section};
  padding: 10px 0px;
  left: 36%;
  position: relative;
  display: inline-block;  /* This keeps each section in line */
  flex-shrink: 0;  /* Prevent shrinking of the section */
  color: ${(props) => props.theme.colors.text};
  background: transparent;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  box-shadow: 0 0 15px ${(props) => props.theme.colors.shadow};

  .cityName {
    text-decoration: underline;
    text-decoration-color: ${(props) => props.theme.colors.active};
    text-decoration-thickness: 5px;
    text-underline-offset: 10px;
  }

  h2 {
    margin: ${(props) => props.theme.margins.sectionH2};
  }

  p {
    margin: ${(props) => props.theme.margins.sectionP};
  }

  @media only screen and (max-width: 480px) {
  left: 10%;
}
`;
