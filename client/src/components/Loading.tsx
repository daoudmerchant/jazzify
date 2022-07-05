import styled from "styled-components"

import lp from "../assets/otherIcons/lp-freepik.png";

const LoaderContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Loader = styled.img`
    width: 60%;
    filter: invert(1);
    animation-name: spin;
    animation-duration: 800ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    @keyframes spin { 
        from { 
            transform: rotate(0deg); 
        } to { 
            transform: rotate(360deg); 
        }
    }
`

const Loading = () => (
    <LoaderContainer>
        <Loader src={lp} alt="a spinning record"/>
    </LoaderContainer>
)

export default Loading;