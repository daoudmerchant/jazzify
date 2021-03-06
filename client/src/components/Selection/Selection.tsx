import styled from "styled-components";

import SearchForm from "./SearchForm";
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
    width: 100%;
    padding-inline: 10px;
    padding-top: 10px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
`

const InstrumentIcon = styled.img`
    filter: invert(19%) sepia(64%) saturate(4790%) hue-rotate(251deg) brightness(96%) contrast(102%);
`

const MAX = 3;

const Selection = () => {
    const [list, updateList, reset] = useList(MAX);
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
            {/*
            // @ts-ignore */}
            <SearchForm list={list} reset={reset}>
                <Progress count={list.length} />
            </SearchForm>
        </SelectionContainer>
    )
}

export default Selection;