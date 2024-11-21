import styled, { createGlobalStyle } from "styled-components";
import { darken,lighten } from "polished";


export const theme = {
  colors: {
    text: "#033043",
    active: "#fda521",
    inputBack: "#d1ccbf",  
    error: "red",
    shadow: "#0A7273",
    linear: "linear-gradient(180deg, #e9e3d5, #d5dbe9)",
    button2text: "#e9e3d5",
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
  position: relative;
  margin: 20px 0;

  p {
    color: ${(props) => props.theme.colors.error};
  }

  div {
  position: absolute;
  top: 28%;
  min-width: 140px;
  max-height: 150px;
  overflow-y: auto;
  background: transparent;
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  z-index: 1;
  width: 295px;
  min-width: 140px;
  border: 1px solid ${(props) => props.theme.colors.inputBack};
  border-radius: 12px;
  }
  
  li:hover{
  background: ${(props) => props.theme.colors.text};
  color: ${(props) => props.theme.colors.active};
  border-radius: 6px;
  }

  ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
  }

  li {
  cursor: pointer;
  padding: 8px;
  }

  .DeleteButton {
  border-radius: 50%;
  position: absolute;
  top: 4%;
  right: 40%;
  }

  svg {
  font-size: 12px;
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

@media only screen and (max-width: 835px) {
  margin-top: 6px;
},

`;

export const ButtonGroupe = styled.p`
  display: inline-flex;
  position: relative;
  gap: 5px;
`;

export const Button = styled.button`
  background-color: ${(props) => props.theme.colors.active};
  border: none;
  min-height: 52px;
  width: 140px;
  border-radius: 12px;
  padding: 0px 32px;
  font-size: ${(props) => props.theme.fontSize.button};
  color: ${(props) => props.theme.colors.text};

  &:hover {
  background-color: ${(props) => darken(0.1, props.theme.colors.active)}
  }

`;

export const Button2 = styled.button`
  background-color: transparent;
  border: 2px solid ${(props) => props.theme.colors.shadow} ;
  min-height: 52px;
  width: 140px;
  border-radius: 12px;
  padding: 0px 16px;
  font-size: ${(props) => props.theme.fontSize.button};
  color: ${(props) => props.theme.colors.text};


  &:hover {
  background-color: ${(props) => props.theme.colors.shadow};
  color: ${(props) => props.theme.colors.button2text};
}
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
  
  button {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 7%;
  right: 10%;
  background:${(props) => props.theme.colors.shadow}
  
  }

  button:hover {
  
  background-color:${(props) => lighten(0.1, props.theme.colors.shadow)}  
  }

  

  @media only screen and (max-width: 835px) {
  left: 24%;

  button {
  right: 5%;
}

  @media only screen and (max-width: 480px) {
  left: 10%;

  button {
  width: 36px;
  height: 36px;
  right: 2%;
  }
},

`;

export const SectionOut = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 10px;
  justify-content: flex-start;
  `;
