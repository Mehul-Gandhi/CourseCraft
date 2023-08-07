import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript"; // you can import other modes (languages) if you want
import "ace-builds/src-noconflict/mode-python"; // you can import other modes (languages) if you want
import "ace-builds/src-noconflict/mode-html"; // you can import other modes (languages) if you want
import "ace-builds/src-noconflict/theme-github"; // import the theme you prefer

function CodeEditor({ language }) {
  const [value, setValue] = useState("");

  function onChange(newValue) {
    setValue(newValue);
  }
  useEffect(() => {
    window.ace.config.set('basePath', '/ace-builds/src-noconflict');
    window.ace.config.set('modePath', '');
    window.ace.config.set('workerPath', '');
    window.ace.config.set('themePath', '');
  }, []);

  return (
    <AceEditor
      mode={language}
      theme="github"
      onChange={onChange}
      value={value}
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: false }}
      setOptions={{
        useWorker: false
      }}
    />
  );
}

export default CodeEditor;
