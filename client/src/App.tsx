import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { createGlobalStyle } from "styled-components";

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
    grid-template-rows: 50px 1fr;
  }

  * {
    box-sizing: border-box;
  }

  button {
    border: none;
    background-color: transparent;
  }
`

function App() {
  return (
    <>
      <GlobalStyles />
        <Router>
          <Nav/>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="login" element={<Login />} />
              <Route path="settings" element={<Settings />} />
            </Routes>
          </main>
        </Router>
    </>
  );
}

export default App;