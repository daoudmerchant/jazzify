import { useState, useEffect } from "react";
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
    height: 12%;
    width: 12%;
    padding: 1.2%;
    transition: .2s linear all;
    border: .4em solid ${(props: { $active: boolean }) => props.$active ? "#59dbff" : "white"};
    border-radius: 50%;
    transform: scale(${(props: { $active: boolean }) => props.$active ? "1.2" : "1"});
    & > * {
        display: block;
        height: 100%;
        width: 100%;
        object-fit: contain;
        transition: .25s linear all;
        filter: ${(props: { $active: boolean }) => props.$active
            ? "invert(69%) sepia(45%) saturate(757%) hue-rotate(166deg) brightness(106%) contrast(101%);bff"
            : "invert(1)"
        };
    }
`

const EmptyLine = styled.div`
    height: .5em;
    width: 14%;
    background-color: white;
`

const FilledLine = styled.div`
    height: .5em;
    width: ${(props: { $active: boolean }) => props.$active ? "100%" : "0"};
    transition: .15s linear all;
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
                if (right.control) {
                    setRightExpanded(false);
                    setTimeout(() => setMiddleExpanded(false), 190);
                    setTimeout(() => setLeftExpanded(false), 380);
                    return;
                }
                if (middle.control) {
                    setMiddleExpanded(false);
                    setTimeout(() => setLeftExpanded(false), 190);
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