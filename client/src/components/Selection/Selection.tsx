import React from "react";
import styled from "styled-components";

import Form from "./Form";
import InstrumentButton from "./InstrumentButton";

// icons
import InstrumentIcons from "../../assets/instrumentIcons";

const SelectionContainer = styled.section`
    background-color: #F0D9E7;
`

const ButtonContainer = styled.div`
    width: 100vw;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    padding-inline: 10px;
`

const InstrumentIcon = styled.img`
    filter: invert(19%) sepia(64%) saturate(4790%) hue-rotate(251deg) brightness(96%) contrast(102%);
`

const Selection = () => {
    return (
        <SelectionContainer>
            <ButtonContainer>
                {InstrumentIcons.map(({name, url}) => (
                    <InstrumentButton key={name}>
                        <InstrumentIcon src={url} alt={name}/>
                    </InstrumentButton>
                ))}
            </ButtonContainer>
            <Form/>
        </SelectionContainer>
    )
}

export default Selection;