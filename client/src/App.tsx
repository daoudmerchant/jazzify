import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

import { useAppDispatch } from "./app/hooks";
import { initAccessToken } from "./features/user/userSlice";

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

  a, a:visited {
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
  }
`

const Main = styled.main`
  background: linear-gradient(138deg, #fcb4f5 0%, #fae6f7 20%, #e0faff 100%);
`

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initAccessToken(null));
}, [])
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