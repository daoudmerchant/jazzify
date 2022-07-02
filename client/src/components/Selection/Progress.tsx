import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useStaggered } from "../../app/hooks";

import note from "../../assets/otherIcons/musical-note-pixel-perfect.png";

interface Props {
    count: number
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Circle = styled.div`
    transition: .2s linear all;
    border: 2vw solid ${(props: { $active: boolean }) => props.$active ? "#59dbff" : "white"};
    border-radius: 50%;
    height: 12vw;
    width: 12vw;
    padding: 1.2vw;
    transform: scale(${(props: { $active: boolean }) => props.$active ? "1.2" : "1"});
    & > * {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: contain;
        transition: .25s linear all;
        filter: ${(props: { $active: boolean }) => props.$active
            ? "invert(69%) sepia(45%) saturate(757%) hue-rotate(166deg) brightness(106%) contrast(101%);bff"
            : "invert(1)"
        };
    }
`

const EmptyLine = styled.div`
    height: 1.2vw;
    width: 14vw;
    background-color: white;
`

const FilledLine = styled.div`
    height: 1.4vw;
    transition: .2s linear all;
    width: ${(props: { $active: boolean }) => props.$active ? "14vw" : "0"};
    background-color: #59dbff;
`

const Item = ({ active, children }: { active: boolean, children: JSX.Element }) => <Circle $active={active}>{children}</Circle>;

const Line = ({ active }: { active: boolean }) => <EmptyLine><FilledLine $active={active} /></EmptyLine>

const Note = () => <img src={note} alt="note icon"/>

const Progress = ({ count }: Props) => {
    const [left, setLeftExpanded] = useState(false);
    const [middle, setMiddleExpanded] = useStaggered(150);
    const [right, setRightExpanded] = useStaggered(150);
    useEffect(() => {
        switch (count) {
            case 0:
                if (right.open) {
                    setRightExpanded(false);
                    setTimeout(() => setMiddleExpanded(false), 170);
                    setTimeout(() => setLeftExpanded(false), 340);
                    return;
                }
                setLeftExpanded(false);
                return;
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
            <Item active={left}>
                <Note/>
            </Item>
            <Line active={middle.first} />
            <Item active={middle.second}>
                <Note/>
            </Item>
            <Line active={right.first} />
            <Item active={right.second}>
                <Note/>
            </Item>
        </Container>
    )
};

export default Progress;