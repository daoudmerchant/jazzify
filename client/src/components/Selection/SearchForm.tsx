import React, { useEffect, useState } from "react";
import styled from "styled-components";

// redux
import { useAppSelector } from "../../app/hooks";
import { selectPlayer } from "../../features/player/playerSlice";
import { useAppDispatch } from "../../app/hooks";
import { playTracks } from "../../features/player/playerSlice";

interface Props {
    children: JSX.Element
    list: [string]
    reset: () => void
}

const Form = styled.form`
    position: relative;
    width: 100%;
    padding-inline: 20px;
    padding-bottom: 20px;
`

const Submit = styled.button`
    height: 60px;
    width: 100%;
    margin-top: 20px;
    font-size: 20px;
    color: ${(props: { $color: string, disabled: boolean } ) => props.disabled ? props.$color : "white"};
    font-weight: bold;
    border: 3px solid ${(props: { $color: string, disabled: boolean } ) => props.disabled ? props.$color : "white"};
    border-radius: 30px;
    transition: .2s all;
    box-shadow: ${(props: { $color: string, disabled: boolean } ) => props.disabled ? "none" : "-5px 3px 12px -3px lightgrey"};
    background-color: ${(props: { $color: string, disabled: boolean }) => props.disabled ? "transparent" : props.$color};
`

const SearchForm = ({ children, list, reset }: Props) => {
    const { status } = useAppSelector(selectPlayer);
    const [submitted, setSubmitted] = useState(false);
    const dispatch = useAppDispatch();
    useEffect(() => {
        setSubmitted(false);
    }, [list])
    const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
        e.preventDefault();
        if (submitted) {
            return reset();
        }
        await dispatch(playTracks(list));
        setSubmitted(true);
    }
    const buttonStatus = status === "loading" || status === "uninitialised"
            ? {
                disabled: true,
                text: "Loading",
                color: "#707070"
            }
            : submitted
            ? {
                disabled: false,
                text: "Clear selection",
                color: "#59dbff"
            }
            : list.length
            ? {
                disabled: false,
                text: "Find me some jazz",
                color: "lightgreen"
            }
            : {
                disabled: true,
                text: "Select at least 1",
                color: "lightgrey"
            }
    return (
        <Form onSubmit={handleSubmit}>
            {children}
            <Submit disabled={buttonStatus.disabled} $color={buttonStatus.color} type="submit">{buttonStatus.text}</Submit>
        </Form>
    )
}

export default SearchForm;