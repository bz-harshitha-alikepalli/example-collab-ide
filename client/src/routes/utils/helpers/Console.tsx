import React, { ReactNode } from "react"
import styled from "styled-components"

const StyledConsole = styled.div`
    background: #fff;
    display: flex;
    flex-direction: column;
`

interface ConsoleProps {
    children: ReactNode
}

const Console: React.FC<ConsoleProps> = ({ children }) => {
    return <StyledConsole>{children}</StyledConsole>
}

export default Console
