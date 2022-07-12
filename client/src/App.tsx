import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

import { useAppDispatch } from "./app/hooks";
import { initAccessToken } from "./features/user/userSlice";

import Warning from './components/Warning';
import DesktopWrapper from './components/DesktopWrapper';
import Nav from "./components/Nav";
import Home from "./pages/Home";
import About from "./pages/About";
import Settings from "./pages/Settings";

const GlobalStyles = createGlobalStyle`
  html, body, #root {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: 'Source Sans Pro', sans-serif;
  }

  #root {
    background: linear-gradient(138deg, rgba(252, 180, 245, .5) 0%, rgba(250, 230, 247, .5) 20%, rgba(224, 250, 255, .5) 100%);
  }

  * {
    box-sizing: border-box;
  }

  button {
    border: none;
    background-color: transparent;
    font-family: 'Source Sans Pro', sans-serif;
    cursor: pointer;
  }

  a, a:visited {
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
  }
`

const Main = styled.main`
  background: linear-gradient(138deg, rgb(252, 180, 245) 0%, rgb(250, 230, 247) 20%, rgb(224, 250, 255) 100%);
  overflow-y: scroll;
`


function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initAccessToken(null));
}, [])
  return (
    <>
      <GlobalStyles />
        <Warning/>
        <Router>
          <DesktopWrapper>
            <>
              <Nav/>
              <Main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="about" element={<About />} />
                  <Route path="settings" element={<Settings />} />
                </Routes>
              </Main>
            </>
          </DesktopWrapper>
        </Router>
    </>
  );
}

export default App;