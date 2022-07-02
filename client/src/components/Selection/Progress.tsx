import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useStaggered } from "../../app/hooks";

interface Props {
    count: number
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Circle = styled.div`
    transition: .35s linear all;
    border: 3vw solid ${(props: { $active: boolean }) => props.$active ? "green" : "white"};
    border-radius: 50%;
    height: 15vw;
    width: 15vw;
`

const EmptyLine = styled.div`
    height: 5vw;
    width: 20vw;
    background-color: white;
`

const FilledLine = styled.div`
    height: 5vw;
    transition: .35s linear all;
    width: ${(props: { $active: boolean }) => props.$active ? "20vw" : "0"};
    background-color: green;
`

const Item = ({ active }: { active: boolean }) => <Circle $active={active} />

const Line = ({ active }: { active: boolean }) => <EmptyLine><FilledLine $active={active} /></EmptyLine>

const Progress = ({ count }: Props) => {
    const [left, setLeftExpanded] = useState(false);
    const [middle, setMiddleExpanded] = useStaggered(300);
    const [right, setRightExpanded] = useStaggered(300);
    useEffect(() => {
        switch (count) {
            case 0:
                return setLeftExpanded(false);
            case 1:
                setMiddleExpanded(false);
                setLeftExpanded(true);
                return;
            case 2:
                setRightExpanded(false);
                setMiddleExpanded(true);
                return;
            case 3: {
                return setRightExpanded(true);
            }
        }
    }, [count])
    return (
        <Container>
            <Item active={left} />
            <Line active={middle.first} />
            <Item active={middle.second} />
            <Line active={right.first} />
            <Item active={right.second} />
        </Container>
    )
};

export default Progress;