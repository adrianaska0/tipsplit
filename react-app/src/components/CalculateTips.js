import {useState, useEffect} from 'react';
import {Button} from 'react-bootstrap';

function CalculateTips(file) {

  useEffect(()=>{
    console.log(file.file)
  },[file])

  return (
      <div class="text-center"><pre><Button variant="outline-dark" size="sm">Go To Adjustments</Button>     <Button variant="outline-dark" size="sm">View Calculation</Button></pre></div>
  )
}

export default CalculateTips

