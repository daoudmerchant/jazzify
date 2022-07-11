import styled from "styled-components"

const Wrapper = styled.div`
    max-height: 900px;
    max-width: 450px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 70px 1fr;
`

const Logo = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-450px) translateY(-150%) translateX(-50%) ;

  font-family: 'Monoton', cursive;
  font-size: 3em;
  color: #5C33F6;
`

interface Props {
    children: JSX.Element
}

const DesktopWrapper = ({children}: Props) => (
    <>
        <Logo>Jazzify</Logo>
        <Wrapper>
            {children}
        </Wrapper>
    </>
)


export default DesktopWrapper;