import React from "react"
import AceEditor from "react-ace"
import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/mode-typescript"
import "ace-builds/src-noconflict/mode-python"
import "ace-builds/src-noconflict/mode-java"
import "ace-builds/src-noconflict/mode-yaml"
import "ace-builds/src-noconflict/mode-golang"
import "ace-builds/src-noconflict/mode-c_cpp"
import "ace-builds/src-noconflict/mode-html"
import "ace-builds/src-noconflict/mode-css"

import "ace-builds/src-noconflict/keybinding-emacs"
import "ace-builds/src-noconflict/keybinding-vim"
import "ace-builds/src-noconflict/theme-monokai"

import "ace-builds/src-noconflict/ext-language_tools"
import "ace-builds/src-noconflict/ext-searchbox"

export default function Editor({ fetchedCode, onChange, language, codeKeybinding }: any) {
    return (
        <AceEditor
            placeholder="Write your code here."
            mode={language}
            keyboardHandler={codeKeybinding}
            theme="monokai"
            name="collabEditor"
            width="100%"
            height="100%"
            value={fetchedCode}
            onChange={onChange}
            fontSize={15}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            enableLiveAutocompletion={true}
            enableBasicAutocompletion={true}
            enableSnippets={true}
            wrapEnabled={true}
            tabSize={2}
            editorProps={{
                $blockScrolling: true,
            }}
        />
    )
}
