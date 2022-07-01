import React from "react";
import styled from "styled-components";

const Button = styled.button`
    border: 5px solid blue;
    border-radius: 15px;
    aspect-ratio: 1 / 1;
    & > * {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: contain;
      }
`

interface Props {
    children: JSX.Element,
  };

const InstrumentButton = ({children}: Props) => <Button>{children}</Button>

export default InstrumentButton;