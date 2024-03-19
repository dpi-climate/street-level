import JSONEditor, { JSONEditorMode } from "jsoneditor"
import 'jsoneditor/dist/jsoneditor.min.css'
import React, { Component, useEffect, useRef } from "react"
import { IMasterGrammar } from "../../data-logic/interfaces"

interface IJSONEditorReactProps {
  content: IMasterGrammar,
  setEditedGrammarCurrent: Function
}

const JSONEditorReact: React.FC<IJSONEditorReactProps> = (props) => {

  const refEditor = useRef<JSONEditor | null>(null);

  useEffect(() => {
    if(refEditor.current == null) {
      const container = document.getElementById("json-editor");
      const options = {
        onChangeText: props.setEditedGrammarCurrent
      }

      refEditor.current = new JSONEditor(container as HTMLElement, options)
      refEditor.current.set(props.content)
      refEditor.current.setMode("code")
    }
  }, [props.content]);

  return (
    <React.Fragment>
      <div id="json-editor" style={{height: "100%"}}></div>

    </React.Fragment>
  )
  

}

export default JSONEditorReact
