import React, { useEffect } from 'react'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

interface IWrongTypingModalProps {
    wrongTyping: boolean
    setWrongTyping: Function
}

const WrongTypingModal: React.FC<IWrongTypingModalProps> = (props) => {
  const [show, setShow] = useState(false)

  const handleClick = () => props.setWrongTyping(false)


  useEffect(() => setShow(props.wrongTyping) ,[props.wrongTyping])

  return (
    <Modal show={show} onHide={handleClick}>
      <Modal.Header closeButton>
        <Modal.Title>Warning</Modal.Title>
      </Modal.Header>
      <Modal.Body>Grammar is not valid.</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClick}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default WrongTypingModal