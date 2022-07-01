import React from "react";
import styled from "styled-components";

const Button = styled.button`
    border: 5px solid blue;
`

interface Props {
    children: JSX.Element,
  };

const InstrumentButton = ({children}: Props) => <Button>{children}</Button>

export default InstrumentButton;