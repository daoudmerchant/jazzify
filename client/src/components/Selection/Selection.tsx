import React, { useState } from "react";
import styled from "styled-components";

import Form from "./Form";
import InstrumentButton from "./InstrumentButton";
import Progress from "./Progress";

// icons
import InstrumentIcons from "../../assets/instrumentIcons";
import { useList } from "../../app/hooks";

const SelectionContainer = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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

const MAX = 3;

const Selection = () => {
    const [list, updateList] = useList(MAX);
    console.log(list)
    return (
        <SelectionContainer>
            <ButtonContainer>
                {InstrumentIcons.map(({ name, url }) => {
                    // @ts-ignore
                    const existsInList = list.find(x => x === name);
                    return (
                        <InstrumentButton
                            key={name}
                            selected={existsInList}
                            // @ts-ignore
                            updateList={() => updateList(name)}
                            disabled={list.length === MAX && !existsInList}
                        >
                            <InstrumentIcon src={url} alt={name} />
                        </InstrumentButton>)
                })}
            </ButtonContainer>
            <Form>
                <Progress count={list.length} />
            </Form>
        </SelectionContainer>
    )
}

export default Selection;