import React from 'react'
import {Container, Row, Col} from 'react-bootstrap';
import "../css/homepage.css";


function HomePage() {
  return (
    <div>
      <Container>
      <br/><br/><br/><br/>
          <Row>
            <Col className="rightborder"xs={6}>
            <div>
              <br/>
              <h2 class="text-center">How to Use</h2>
              <br/>
              <p class="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, 
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
              <br/>
            <h2 class="text-center">Get Started</h2>
            </Col>
          </Row>
      </Container>
    </div>
  )
}

export default HomePage
