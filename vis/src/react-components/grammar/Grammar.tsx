import "./Grammar.css"
import React, { useEffect, useState, useRef } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'

import JSONEditorReact from "./JSONEditorReact"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { IMasterGrammar } from "../../data-logic/interfaces"
import ErrorModal from "./WrongTypingModal"
import * as d3 from "d3"
import { faChevronRight, faChevronLeft, faCode, faCheck } from '@fortawesome/free-solid-svg-icons'



interface IGrammarProps {
  content: IMasterGrammar
  updateGrammar: Function
  updateGrammarId: Function
  
}

const Grammar: React.FC<IGrammarProps> = (props) => {

  const applyBtnId = "applyGrammarBtn"

  const [grammar, setGrammar] = useState<string>('')
  const [editedGrammar, setEditedGrammar] = useState<string>('')
  const [grammarIsHidden, setGrammarIsHidden] = useState<boolean>(true)
  const [wrongTyping, setWrongTyping] = useState<boolean>(false)
  const [apply, setApply] = useState<boolean>(false)
  
  const grammarRef = useRef(grammar)
  const editedGrammarRef = useRef(editedGrammar)
  
  const setGrammarRefCurrent = (data: string) => {
    grammarRef.current = data
    setGrammar(data)
  }

  const setEditedGrammarCurrent = (editedJson:string) => {
    editedGrammarRef.current = editedJson
    setEditedGrammar(editedJson)
  }

  const applyGrammar = () => {

    if(editedGrammarRef.current != '') {
      let newGrammar = editedGrammarRef.current
      console.log("new content", typeof editedGrammarRef.current)
      
        if (typeof editedGrammarRef.current === "object") {
          console.log("Content is correct")
          // props.updateGrammar(newGrammar)
         
   
        } else {
          console.log("something is wrong")
          newGrammar = grammarRef.current
          setWrongTyping(true)
        }
  
        setEditedGrammarCurrent('')
        setGrammarRefCurrent(newGrammar)


    } else {
      console.log("nothing changed")
    }

    const newGrammar = editedGrammarRef.current !== '' ? editedGrammarRef.current : grammarRef.current
    
    setEditedGrammarCurrent('')
    setGrammarRefCurrent(newGrammar)
    props.updateGrammar(newGrammar)

  }
  
  const renderToggles = () => {
    const arrowsStyle    = {color: "#696969", padding: 0, marginTop: "5px", marginBottom: "5px"}
    const codeApplyStyle = {color: "#696969", padding: 0, marginTop: "5px", marginBottom: "5px", marginRight: "20px", marginLeft: "0px"}
  
    
    return (
      <div className={`toggle-button ${grammarIsHidden ? 'toggle-closed' : ''}`}>
        
        {/* Code */}
        <FontAwesomeIcon className={`${grammarIsHidden ? 'arrow-hidden' : ''}`} size="2x" style={codeApplyStyle} icon={faCode} onClick={() => props.updateGrammarId("master")}/>
        
        {/* Apply */}
        <FontAwesomeIcon className={`${grammarIsHidden ? 'arrow-hidden' : ''}`} id={applyBtnId} size="2x" style={codeApplyStyle} icon={faCheck} />
        
        {/* Arrows */}
        <FontAwesomeIcon className={`${grammarIsHidden ? 'arrow-hidden' : ''}`} size="2x" style={arrowsStyle} icon={faChevronLeft}  onClick={() => setGrammarIsHidden(!grammarIsHidden)}/>
        <FontAwesomeIcon className={`${grammarIsHidden ? '' : 'arrow-hidden'}`} size="2x" style={arrowsStyle} icon={faChevronRight}  onClick={() => setGrammarIsHidden(!grammarIsHidden)}/>
      </div>
    )
  }
  
  const renderJSONEditorReact = () => {

    return(
      <>
      <ErrorModal wrongTyping={wrongTyping} setWrongTyping={setWrongTyping}/>
      <div className={`component grammar-wrapper ${grammarIsHidden ? 'grammar-hidden' : ''}`}>
        <div style={{zIndex: 1001, overflow: "auto", fontSize: "24px", height: "100%"}}>
          <JSONEditorReact 
            content={props.content}
            setEditedGrammarCurrent={setEditedGrammarCurrent}
            setWrongTyping={setWrongTyping}
          />
        </div>
      </div>
      </>
    )
  }

  useEffect(() => {
    setGrammarRefCurrent(JSON.stringify(props.content))

    d3.select(`#${applyBtnId}`).on("click", function() {
      applyGrammar()
  })

  },[props.content])
  
  return (
    <>
      {renderToggles()}
      {renderJSONEditorReact()}    
    </>
  )
}

export default Grammar