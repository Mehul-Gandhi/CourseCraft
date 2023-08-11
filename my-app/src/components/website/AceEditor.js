import React, { useState, useEffect, useRef } from "react";
import AceEditor from "react-ace";
import CheckIcon from '@mui/icons-material/Check';

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-github";

import "../../styles/Button.css"

function CodeEditor({ language, code }) {
  const [value, setValue] = useState(code);
  console.log("Code");
  console.log(code);
  const textareaRef = useRef(null);
  const [copyCode, setCopyCode] = useState(false);

  function onChange(newValue) {
    setValue(newValue);
  }

  function handleCopyCode() {
    if (textareaRef.current) {
      textareaRef.current.select();
      document.execCommand("copy");
      setCopyCode(true);
    }
  }

  useEffect(() => {
    window.ace.config.set('basePath', '/ace-builds/src-noconflict');
    window.ace.config.set('modePath', '');
    window.ace.config.set('workerPath', '');
    window.ace.config.set('themePath', '');
  }, []);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <AceEditor
        mode={language}
        theme="github"
        onChange={onChange}
        value={value}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: false }}
        setOptions={{ useWorker: false }}
      />

      {/* Hidden textarea for copying */}
      <textarea 
        ref={textareaRef} 
        value={value} 
        readOnly 
        className="position-absolute invisible"
      />

      <button 
        onClick={handleCopyCode} 
        className="btn btn-custom mt-2"
        
      >
        {copyCode ? <> <CheckIcon /> Copied </> : "Copy Code"}
      </button>
    </div>
);
}
export default CodeEditor;
