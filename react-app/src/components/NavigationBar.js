import {useState, useEffect} from 'react';
import {Container, Navbar, Row, Col, Nav, Modal, Form, Button} from 'react-bootstrap'
import logo from './static_images/tipsplitlogov4.png'
import 'bootstrap/dist/css/bootstrap.css';



function NavigationBar() {
  const [show, setShow] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const [unpaid, setUnpaid] = useState(false);
  const [paid, setPaid] = useState(false);
  const [adj, setAdj]  = useState(false);

  const handleShow=()=>{
    getCurrentOpt();
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

  const handleCheck=(e, type)=>{
    if (type === "unpaid"){setUnpaid(e.target.checked)};
    if (type === "paid"){setPaid(e.target.checked)};
    if (type === "adj"){setAdj(e.target.checked)};
  }

  const handleSave=()=>{
    if (unpaid !== JSON.parse(sessionStorage.getItem('unpaid')) || paid !== JSON.parse(sessionStorage.getItem('paid'))){
    sessionStorage.setItem('unpaid', unpaid)
    sessionStorage.setItem('paid', paid)
    sessionStorage.setItem('adj', adj)
    }
  handleClose();
}

  function getCurrentOpt(){
    if (sessionStorage.getItem('unpaid') && sessionStorage.getItem('paid') && sessionStorage.getItem('adj')){
      setUnpaid(JSON.parse(sessionStorage.getItem('unpaid')));
      setPaid(JSON.parse(sessionStorage.getItem('paid')));
      setAdj(JSON.parse(sessionStorage.getItem('adj')));
    }
    else {
      sessionStorage.setItem('unpaid', unpaid);
      sessionStorage.setItem('paid', paid);
      sessionStorage.setItem('adj', adj);
    }
  }

  useEffect(()=>{
    getCurrentOpt();
  },[])

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
                alt="tip$plit logo"
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
          <Form>
            <Form.Check
            type="checkbox"
            onChange={(e)=>handleCheck(e, "unpaid")}
            label={"Unpaid Breaks are tippable"}
            checked={unpaid}
            />
            <br/>
            <Form.Check
            type="checkbox"
            onChange={(e)=>handleCheck(e, "paid")}
            label={"Paid Breaks are tippable"}
            checked={paid}
            />
            <br/>
            <Form.Check
            type="checkbox"
            onChange={(e)=>handleCheck(e, "adj")}
            label={"Include Adjustment Summary on Report"}
            checked={adj}
            />
            <br/>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="w-100" variant="dark" id="submitOptions" onClick={handleSave}>Save Changes</Button>
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
