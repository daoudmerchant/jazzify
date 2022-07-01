import React from "react";
import styled from "styled-components";

const Button = styled.button`
    border: 5px solid #5C33F6;
    border-radius: 15px;
    aspect-ratio: 1 / 1;
    box-shadow: -5px 3px 3px -3px #5C33F6;
    transition: .15s all;
    & > * {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: contain;
      }
    &:enabled:active {
        transform: scale(0.95);
        box-shadow: none;
    }
`

interface Props {
    children: JSX.Element,
  };

const InstrumentButton = ({children}: Props) => <Button>{children}</Button>

export default InstrumentButton;