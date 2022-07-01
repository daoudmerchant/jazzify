import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

import Nav from "./components/Nav";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Settings from "./pages/Settings";

const GlobalStyles = createGlobalStyle`
  html, body, #root {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  #root {
    display: grid;
    grid-template-rows: 70px 1fr;
  }

  * {
    box-sizing: border-box;
  }

  button {
    border: none;
    background-color: transparent;
  }
`

const Main = styled.main`
  background: linear-gradient(138deg, #fcb4f5 0%, #fae6f7 20%, #e0faff 100%);
  overflow: hidden;
`

function App() {
  return (
    <>
      <GlobalStyles />
        <Router>
          <Nav/>
          <Main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="login" element={<Login />} />
              <Route path="settings" element={<Settings />} />
            </Routes>
          </Main>
        </Router>
    </>
  );
}

export default App;