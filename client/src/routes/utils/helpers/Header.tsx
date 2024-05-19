import React, { ReactNode } from "react"
import styled from "styled-components"

const StyledHeader = styled.div`
    background: #ededed;
    height: 4rem;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.16);
    padding: 0 1rem;
    z-index: 2;
    font-size: 1.25rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: space-between;
    input {
        display: none;
    }
    label,
    a {
        font-weight: 400;
        display: flex;
        align-items: center;
        gap: 0.7rem;
        color: black;
    }
`

interface HeaderProps {
    children: ReactNode
}

const Header: React.FC<HeaderProps> = ({ children }) => {
    return <StyledHeader>{children}</StyledHeader>
}

export default Header
