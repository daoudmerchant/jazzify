import styled from "styled-components"

const Wrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  max-height: 900px;
  width: 100%;
  @media (min-width: 500px) {
    width: 400px;
  }
  display: grid;
  grid-template-rows: 70px 1fr;
`

const Logo = styled.h1`
  position: absolute;
  top: calc(50% - 450px - 2.5em);
  left: 50%;
  transform: translateX(-50%) ;
  display: none;
  @media (min-height: 900px) {
    display: block;
  }
  font-family: 'Monoton', cursive;
  font-size: 3em;
  color: #5C33F6;
`

const Subtitle = styled.p`
    display: none;
    @media (min-height: 980px) {
      display: block;
    }
    position: absolute;
    top: calc(50% + 450px + 1em);
    left: 50%;
    transform: translateX(-50%) ;
    width: 100%;
    text-align: center;
    color: #5C33F6;
    font-size: 1em;
    margin: 0;
    font-style: italic;
`

interface Props {
    children: JSX.Element
}

const DesktopWrapper = ({children}: Props) => (
    <>
        <Logo>Jazzify</Logo>
        <Subtitle>(Currently optimised for mobile devices)</Subtitle>
        <Wrapper>
            {children}
        </Wrapper>
    </>
)


export default DesktopWrapper;