import {useState, useEffect} from 'react'
import {Container, Row, Col, Form, InputGroup, Button} from 'react-bootstrap';
import "../css/homepage.css";
import Papa from 'papaparse';
import CalculateTips from '../components/CalculateTips';

function HomePage() {

  const [isCsv, setIsCsv] = useState(false);
  const [tipInput, setTipInput] = useState("");
  const [fileInput, setFileInput] = useState();
  const [isFloat, setIsFloat] = useState(false);

  const [fileSubmitted, setFileSubmitted] = useState(false);
  const [tipSubmitted, setTipSubmitted] = useState(false);

  const [tipData, setTipData] = useState();

  function getExtension(filename) {
    return filename.substr(-3);
  }
  
  function validateTipFormat(){
    const result = tipInput.match(/^[0-9]+\.[0-9]{1,2}$|^[0-9]+$/) !== null;
    console.log("tipIsMoney=", result);
    return result;
  }

  const parseData=(e)=> {
    Papa.parse(e.target.files[0], {
      header: false, 
      skipEmptyLines: true,
      complete: function (results) {
        setTipData(results.data)
        sessionStorage.setItem('file', JSON.stringify(results.data))
        console.log("home page", results.data);
      },
    });
  }

  const checkExtension=(e)=>{
    const result = getExtension(e.target.value) === 'csv';
    setIsCsv(result);
    if (result){setFileInput(e)};
    console.log("is .csv=", result);
    setFileSubmitted(true);
  }

  const handleTipChange=(e)=>{
    setTipInput(e.target.value);
  }

  const handleSubmitData=()=>{
    setIsFloat(validateTipFormat());
    parseData(fileInput);
    const tips = parseFloat(tipInput).toFixed(2);
    sessionStorage.setItem('tipInput', tips);
    console.log("in handle submit", tipData);
    setTipSubmitted(true);
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
            <InputGroup className="custom-input" hasValidation>
              <Form.Control onChange={(e)=> checkExtension(e)}type="file" required isValid={isCsv && fileSubmitted} isInvalid={!isCsv && fileSubmitted}/>
              <Form.Control.Feedback type="invalid">
                Unsupported file type. Accepted Type: .csv
              </Form.Control.Feedback>
            </InputGroup>
            <br/>
            <h4>2. Enter Tip Total</h4>
            <InputGroup className="custom-input" hasValidation>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control  name="tips" onChange={(e)=> handleTipChange(e)} aria-label="Amount (to the nearest dollar)" required isValid={isFloat && tipSubmitted} isInvalid={!isFloat && tipSubmitted}/>
              <Button variant="secondary" type="submit" onClick={()=>handleSubmitData()} disabled={!isCsv} >Submit</Button>
              <Form.Control.Feedback type="invalid">
                Tip format invalid.
              </Form.Control.Feedback>
              </InputGroup>

            <br/>
            <h4>3. Make Adjustments or View Calculation Report</h4>
            <br/>
            {(isFloat && isCsv && tipData && tipSubmitted) && (
            <CalculateTips file={tipData}/>
            )}
            </div>
            </Col>
          </Row>
      </Container>
    </div>
  )
}

export default HomePage;
