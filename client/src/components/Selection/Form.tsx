import React, { SyntheticEvent } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../app/hooks";
import { playKurt } from "../../features/player/playerSlice";

const Form = () => {
    const dispatch = useAppDispatch();
    const handleSubmit = (e: React.SyntheticEvent): void  => {
        e.preventDefault();
        dispatch(playKurt())
    }
    return (
        <form onSubmit={handleSubmit}>
            <p>The submission form</p>
            <button type="submit">Play music</button>
        </form>
    )
}

export default Form;