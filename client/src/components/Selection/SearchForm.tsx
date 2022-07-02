import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectPlayer } from "../../features/player/playerSlice";
import styled from "styled-components";
import { useAppDispatch } from "../../app/hooks";
import { playKurt } from "../../features/player/playerSlice";

interface Props {
    children: JSX.Element
    count: number
    reset: () => void
}

const Form = styled.form`
    width: 100%;
    position: relative;
    padding-inline: 20px;
    padding-bottom: 20px;
`

const Submit = styled.button`
    justify-text: center;
    transition: .2s all;
    height: 60px;
    border-radius: 30px;
    margin-top: 20px;
    width: 100%;
    font-size: 20px;
    color: white;
    font-weight: bold;
    box-shadow: ${(props: { $color: string, disabled: boolean } ) => props.disabled ? "none" : "-5px 3px 12px -3px lightgrey"};
    background-color: ${(props: { $color: string, disabled: boolean }) => props.$color};
`

const SearchForm = ({ children, count, reset }: Props) => {
    const { status } = useAppSelector(selectPlayer);
    const [succeeded, setSucceeded] = useState(false)
    useEffect(() => {
        if (status !== "idle" || succeeded) {
            return;
        }
        setSucceeded(true);
    }, [status])
    useEffect(() => {
        if (!succeeded) {
            return;
        }
        setSucceeded(false);
    }, [count])
    const dispatch = useAppDispatch();
    const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
        e.preventDefault();
        if (succeeded) {
            console.log("resetting")
            return reset();
        }
        await dispatch(playKurt());
    }
    const buttonStatus = succeeded
        ? {
            disabled: false,
            text: "Clear",
            color: "aliceblue"
        }
        : status === "loading"
            ? {
                disabled: true,
                text: "Loading",
                color: "lightblue"
            }
            : count
                ? {
                    disabled: false,
                    text: "Find me some jazz!",
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