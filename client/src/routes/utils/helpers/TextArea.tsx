// TextArea.tsx
import React from "react"
import styled from "styled-components"

interface TextAreaProps {
    value: string // Adjust the type according to your requirement
    disabled?: boolean
}

const StyledTextArea = styled.textarea<TextAreaProps>`
    flex-grow: 1;
    resize: none;
    border: 0;
    outline: 0;
    padding: 0.25rem;
    padding-top: 0.5rem;
    font-size: 1.1rem;
    min-height: 250px;
`

const TextArea: React.FC<TextAreaProps> = ({ value, disabled }) => {
    return <StyledTextArea value={value} disabled={disabled} />
}

export default TextArea
