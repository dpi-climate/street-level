import "./Grammar.css"
import React, { useEffect, useState, useRef } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'

import JSONEditorReact from "./JSONEditorReact"
import {Col, Row, Button} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { IMasterGrammar } from "../../data-logic/interfaces"
import { faCode } from '@fortawesome/free-solid-svg-icons'
import * as d3 from "d3"

interface IGrammarProps {
  content: IMasterGrammar,
  updateGrammar: Function
  
}

const Grammar: React.FC<IGrammarProps> = (props) => {

  const applyBtnId = "applyGrammarBtn"
  const linkBtnId = "linkMapAndGrammar"

  const [grammar, setGrammar] = useState<string>('')
  const [editedGrammar, setEditedGrammar] = useState<string>('')
  
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
      try {                
        JSON.parse(editedGrammarRef.current)

      } catch(err){
        console.error('Grammar is not valid')
          return
      }
    }

    const newGrammar = editedGrammarRef.current !== '' ? editedGrammarRef.current : grammarRef.current
    
    setEditedGrammarCurrent('')
    setGrammarRefCurrent(newGrammar)
    props.updateGrammar(newGrammar)

  }
 
  const renderBtnLink = () => {
    return (
      <React.Fragment>
        <div className="d-flex align-items-center justify-content-left" style={{overflow: "auto", height: "75px"}}>
          <Button variant="primary" id={applyBtnId} style={{ marginLeft: "10px", marginRight: "10px"}}>Apply Grammar</Button>
        </div>
      </React.Fragment>
    )
  }

  useEffect(() => {
    setGrammarRefCurrent(JSON.stringify(props.content))

    d3.select(`#${applyBtnId}`).on("click", function() {
      applyGrammar()
  })

  },[props.content])
  
  const renderJSONEditorReact = () => {
    return(
      <div className="grammar">
        <JSONEditorReact 
        content={props.content}
        setEditedGrammarCurrent={setEditedGrammarCurrent}
        />
      </div>
    )
  }

  const renderShowHideIcon = () => {
    return (
      <button id={"toggleSideBar"}>
        <FontAwesomeIcon id="rightArrow" size="2x" style={{color: "#696969", padding: 0, marginTop: "5px", marginBottom: "5px"}} icon={faArrowRight} />
        <FontAwesomeIcon id="leftArrow" className='hidden' size="2x" style={{color: "#696969", padding: 0, marginTop: "5px", marginBottom: "5px"}} icon={faArrowLeft} />
      </button> 
    )
  }

  
  return (
    <React.Fragment>
      {renderJSONEditorReact()}
      {renderBtnLink()}
      {/* {renderShowHideIcon()} */}
    </React.Fragment>
  )
}

export default Grammar