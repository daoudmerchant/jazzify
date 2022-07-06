import styled from "styled-components";

const WarningContainer = styled.div`
  position: fixed;
  display: none;
  z-index: 300;
  padding-inline: 2em;
  width: 100%;
  height: 100%;
  color: #5C33F6;
  text-align: center;
  line-height: 1.8em;
  background: linear-gradient(138deg, #fcb4f5 0%, #fae6f7 20%, #e0faff 100%);
`;

const Container = styled.div`
    height: 100%;
    max-width: 600px;
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const LogoElem = styled.h1`
    margin: none;
    font-family: 'Monoton', cursive;
`

const TooSmall = styled(WarningContainer)`
    @media (max-width: 330px) {
        display: block;
    }
`

const TooBig = styled(WarningContainer)`
    @media (min-width: 500px) {
        display: block;
    }
`

const Logo = () => <LogoElem>Jazzify</LogoElem>

const Warning = () => {
  return (
    <>
        <TooSmall>
            <Container>
                <Logo/>
                Sorry, this app is not yet optimised for screens below 330px
            </Container>
        </TooSmall>
        <TooBig>
            <Container>
                <Logo/>
                Sorry, this app is currently a mobile-only experience (made in my free time around the School of Applied Technology coding bootcamp).
            </Container>
        </TooBig>
    </>
  );
};

export default Warning;
