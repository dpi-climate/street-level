import JSONEditor, { JSONEditorMode, JSONEditorOptions } from "jsoneditor"
import 'jsoneditor/dist/jsoneditor.min.css'
import React, { Component, useEffect, useRef } from "react"
import { IMasterGrammar } from "../../data-logic/interfaces"

interface IJSONEditorReactProps {
  content: IMasterGrammar,
  setEditedGrammarCurrent: Function
  setWrongTyping: Function
}

const JSONEditorReact: React.FC<IJSONEditorReactProps> = (props) => {

  const refEditor = useRef<JSONEditor | null>(null)

  useEffect(() => {
    if(refEditor.current == null) {
      const container = document.getElementById("json-editor")

      const options: JSONEditorOptions = {
        onChange: () => {
            if(refEditor.current !== null) props.setEditedGrammarCurrent(refEditor.current.get())
          }
        }
        

      refEditor.current = new JSONEditor(container as HTMLElement, options)
      // refEditor.current.set(props.content)
      // refEditor.current.setMode("code")
    
    } 

    refEditor.current.set(props.content)
    refEditor.current.setMode("code")

  }, [props.content])

  return (
    <React.Fragment>
      <div id="json-editor" style={{height: "100%"}}></div>
    </React.Fragment>
  )

}

export default JSONEditorReact
