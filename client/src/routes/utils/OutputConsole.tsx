import React from "react"

import { BiExport } from "react-icons/bi"
import Console from "./helpers/Console"
import TextArea from "./helpers/TextArea"
import Header from "./helpers/Header"
interface OutputConsoleProps {
    currentOutput: any // Adjust the type according to the type of currentOutput
}

const OutputConsole: React.FC<OutputConsoleProps> = ({ currentOutput }) => {
    return (
        <Console>
            <Header>
                Output:
                <a href={`data:text/plain;charset=utf-8,${encodeURIComponent(currentOutput)}`} download="output.txt">
                    <BiExport /> Export Output
                </a>
            </Header>
            <TextArea value={currentOutput} disabled />
        </Console>
    )
}

export default OutputConsole
