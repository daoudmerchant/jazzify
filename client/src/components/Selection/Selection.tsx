import React from "react";
import styled from "styled-components";

import Form from "./Form";
import InstrumentButton from "./InstrumentButton";

// icons
import InstrumentIcons from "../../assets/instrumentIcons";

const ButtonContainer = styled.div`
    width: 100vw;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    padding-inline: 10px;
`

const Selection = () => {
    return (
        <div>
            <ButtonContainer>
                {InstrumentIcons.map(({name, url}) => (
                    <InstrumentButton key={name}>
                        <img src={url} alt={name}/>
                    </InstrumentButton>
                ))}
            </ButtonContainer>
            <Form/>
        </div>
    )
}

export default Selection;