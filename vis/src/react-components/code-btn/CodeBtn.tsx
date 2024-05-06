
import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode } from '@fortawesome/free-solid-svg-icons'

import { Button } from "react-bootstrap"

interface ICodeBtnProps {
  element: any
  updateGrammarId: Function
}

const CodeBtn: React.FC<ICodeBtnProps> = (props) => {
  return (
    <Button style={{ border: "1px solid #dadce0", backgroundColor: "white", margin: "5px", padding: 0, opacity: 0.9, boxShadow: "0 2px 8px 0 rgba(99,99,99,.2)"}}>
      <FontAwesomeIcon 
        size="2x" 
        style={{ color: "#696969", padding: 0, margin: "5px" }} 
        icon={faCode} 
        onClick={ () => props.element ? props.updateGrammarId(props.element.id) : null }
      />
    </Button>
  )
}

export default CodeBtn