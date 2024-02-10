import {useState, useEffect} from 'react'
import {Table, Row, Col, Form, Container, Alert} from 'react-bootstrap'

function Adjustments() {
  const [empArray, setEmpArray] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  function fetchEmployees(){
    const emps = [];
    const idArr = JSON.parse(sessionStorage.getItem('EMPS'));
    idArr.forEach((id)=>{
      const emp = JSON.parse(sessionStorage.getItem(id));
      emps[emps.length] = emp;
    })
    setEmpArray(emps);
  }

  const checkDataLoaded=()=>{
    if (sessionStorage.getItem('EMPS')!==null){
      setDataLoaded(true);
    }
    else{
      setDataLoaded(false);
    }
  }

  useEffect(()=>{
    checkDataLoaded();
    fetchEmployees();
    console.log("emps", empArray);
  }, [])

  return (
    <div align="center">
      {dataLoaded ? (
      <><br /><br /><Container>
          <Row>
            <Col><h1><b>Tip Adjustments</b></h1></Col>
          </Row>
          <Row>
            <Col><p>Adjust tippable hours by employee</p></Col>
          </Row>
          <Row align="left">
            <Col>
              <p><b>Date Range:</b></p>
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Table responsive hover size="sm">
              <thead>
                <th>Name</th>
                <th>Hours</th>
                <th>Payout</th>
                <th>Percentage</th>
                <th></th>
                <th></th>
              </thead>
              <tbody>
                {empArray.map((emp, i) => 
                <tr>
                  <td>{emp.name}</td>
                  <td>{emp.hours}</td>
                  <td>{emp.payout}</td>
                  <td>{emp.percentage}%</td>
                  <td></td>
                  <td></td>
                </tr>)}
              </tbody>
            </Table>
          </Row>
        </Container></>) : (
          <Container>
            <br/>
            <Row>
              <Col xs={4}></Col>
            <Col xs={4}>
              <Alert variant="danger">No data detected. Import data <Alert.Link href="/home">here.</Alert.Link></Alert>
            </Col>
            <Col xs={4}></Col>
            </Row>
          </Container>

        )
}
    </div>
  )
}

export default Adjustments
