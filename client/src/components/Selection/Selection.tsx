import React from "react";
import styled from "styled-components";

import Form from "./Form";
import InstrumentButton from "./InstrumentButton";

import InstrumentIcons from "../../assets/instrumentIcons";

const Selection = () => {
    return (
        <div>
            <p>Selection</p>
            {InstrumentIcons.map(({name, url}) => (
                <InstrumentButton key={name}>
                    <img src={url} alt={name}/>
                </InstrumentButton>
            ))}
            <Form/>
        </div>
    )
}

export default Selection;