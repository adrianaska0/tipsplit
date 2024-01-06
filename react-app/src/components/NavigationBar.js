import {useState} from 'react';
import {Container, Navbar, Row, Col, Nav, Modal} from 'react-bootstrap'
import logo from './static_images/tipsplitlogov4.png'
import 'bootstrap/dist/css/bootstrap.css';
import OptionsComp from './OptionsComp';


function NavigationBar() {
  const [show, setShow] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const handleShow=()=>{
    setShow(true);
  }
  const handleClose=()=>{
    setShow(false);
  }
  const handleShowAbout=()=>{
    setShowAbout(true);
  }
  const handleCloseAbout=()=>{
    setShowAbout(false);
  }
  return (
    <>
       <Navbar bg= "dark" data-bs-theme="dark">
        <Container>
            <Navbar.Brand href="/home">
              <img
                src={logo}
                width="200"
                height="70"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>
            <Nav className='me'>
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/adjustments">Adjustmnets</Nav.Link>
              <Nav.Link href="/report">Report</Nav.Link>
              <Nav.Link onClick={handleShow}>Options</Nav.Link>
              <Nav.Link onClick={handleShowAbout}>About</Nav.Link>
              </Nav>
        </Container>
      </Navbar> 
      <Modal size="md"
      show={show} 
      onHide={handleClose}
      backdrop="static"
      keyboard={false} 
      centered>
        <Modal.Header closeButton>
        <Modal.Title>Options</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          App options go here.
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>

      <Modal size="md"
      show={showAbout} 
      onHide={handleCloseAbout}
      backdrop="static"
      keyboard={false} 
      centered>
        <Modal.Header closeButton>
        <Modal.Title>About</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          About info goes here.
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default NavigationBar;
