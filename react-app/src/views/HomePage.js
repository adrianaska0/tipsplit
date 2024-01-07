import {useState} from 'react'
import {Container, Row, Col, Form, InputGroup, Button} from 'react-bootstrap';
import "../css/homepage.css";


function HomePage() {

  const [isCsv, setIsCsv] = useState(false);
  const [fTypeErr, setfTypeErr] = useState(false);


  function getExtension(filename) {
    return filename.substr(-3);
  }

  const checkExtension=(e)=>{
    const result = getExtension(e.target.value) === 'csv';
    setIsCsv(result);
    setfTypeErr(!result);
    console.log("is .csv=", result);
    return result;
  }
  return (
    <div>
      <Container>
      <br/><br/><br/><br/>
          <Row>
            <Col className="rightborder"xs={6}>
            <div className="m-4">
              <br/>
              <h2 className="text-center"><b>How to Use</b></h2>
              <br/>
              <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, 
              vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. 
              Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. 
              Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, 
              vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. 
              Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. 
              Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.</p>
              <br/><br/><br/><br/><br/>
            </div>
            </Col>
            <Col xs={6}>
            <div className="m-4">
              <br/>
            <h2 class="text-center"><b>Get Started</b></h2>
            <br/><br/>
            <h4>1. Upload Employee Time Detail Report (.csv)</h4>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Control onChange={(e)=> checkExtension(e)}type="file" />
            </Form.Group>
            {fTypeErr && (<p className="alert">Unsupported file type. Accepted Types: .csv</p>)}
            <br/>
            <h4>2. Enter Tip Total</h4>
            <InputGroup className="mb-3">
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control aria-label="Amount (to the nearest dollar)" />
              <Button variant="secondary" disabled={!isCsv}>Submit</Button>
              </InputGroup>

            <br/>
            <h4>3. Make Adjustments or View Calculation Report</h4>
            <br/>
            <div class="text-center"><pre><Button variant="outline-dark" size="sm">Go To Adjustments</Button>     <Button variant="outline-dark" size="sm">View Calculation</Button></pre></div>
            </div>

            </Col>
          </Row>
      </Container>
    </div>
  )
}

export default HomePage;
