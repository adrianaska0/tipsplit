import {useState, useEffect} from 'react';
import {Button} from 'react-bootstrap';

function CalculateTips(file){
  
  const [storeName, setStoreName] = useState();
  const [dateRange, setDateRange] = useState();

  const [totalTimeIdx, setTotalTimeIdx] = useState();
  const [typeIdx, setTypeIdx] = useState();

  const [totalHours, setTotalHours] = useState();
  const [tipRate, setTipRate] = useState();

  const empArray = [];

  useEffect(()=>{
    parseData();
  },[file])


  function getStore(data){
    const str = data[0];
    const exData = str.match(/[A-Z]{2,3}-[0-9]{4,5}-[A-Za-z]{2,}/);
    if (exData){
      //console.log("exData", exData);
      setStoreName(exData[0]);
      return true;
    }
    else{
      return false;
    }
  }

  function getDateRange(data){
    const str = data[0];
    const exData = str.match(/[0-9]{2}\/[0-9]{2}\/[0-9]{4} through [0-9]{2}\/[0-9]{2}\/[0-9]{4}/)
    if(exData){
      setDateRange(str);
      return true
    }
    else{
      return false
    }

  }

  function getAtrOrder(data){
    //console.log(data);
    for (let atr=0; atr < data.length;){
      //console.log("atr", data[atr]);
      if (data[atr] === "Total Time"){setTotalTimeIdx(atr)}
      if (data[atr] === "Type"){setTypeIdx(atr)}
      atr = atr + 1;
    }
  }

  function parseEmployees(data){
    let hourTotal = 0.0; let paidBreakTotal = 0.0; let unpaidBreakTotal = 0.0; let empName = ""; let empId = "";
    data.forEach((line)=>{
      const name = line[0].match(/['A-Za-z-]{2,}, ['A-Za-z-]{2,} - [E]?[0-9]+/);
      if (name){
        const nameMatch = name[0].match(/['A-Za-z-]{2,}, ['A-Za-z-]{2,}/);
        const idMatch = name[0].match(/[E]?[0-9]+/);
        empName = nameMatch[0];
        empId = idMatch[0];
        hourTotal = 0.0;
        paidBreakTotal = 0.0;
        unpaidBreakTotal = 0.0;
        console.log(empName, empId)
      }
      else if (line[0] === "Employee Totals"){
        hourTotal = hourTotal.toFixed(2);
        paidBreakTotal = paidBreakTotal.toFixed(2);
        unpaidBreakTotal = unpaidBreakTotal.toFixed(2);
        createEmpObj(empId, empName, hourTotal, paidBreakTotal, unpaidBreakTotal);
      }
      else if (line[totalTimeIdx] && line[typeIdx] === ""){
        hourTotal = hourTotal + parseFloat(line[totalTimeIdx]);
      }
      else if (line[totalTimeIdx] && line[typeIdx] === "Paid Break"){
        paidBreakTotal = paidBreakTotal + parseFloat(line[totalTimeIdx]);
      }
      else if (line[totalTimeIdx] && line[typeIdx] === "Unpaid Break"){
        unpaidBreakTotal = unpaidBreakTotal + parseFloat(line[totalTimeIdx]);
      }
    });
    console.log(empArray);
  }

  function createEmpObj(id, name, hours, paidB, unpaidB){
    const employee = {
      id:id,
      name:name,
      hours:parseFloat(hours),
      pBhours:parseFloat(paidB),
      upBhours:parseFloat(unpaidB),
      tippableHours: 0,
      payout: 0,
    }
    empArray[empArray.length] = employee;
  }

  function getTotalHours(){
    let totalHours = 0;
    if (JSON.parse(sessionStorage.getItem('unpaid')) === true && JSON.parse(sessionStorage.getItem('paid')) === true){
      for (let i=0; i < empArray.length; i++){
        totalHours = totalHours + empArray[i].hours + empArray[i].pBhours + empArray[i].upBhours;
      }
    }
    else if (JSON.parse(sessionStorage.getItem('unpaid')) === false && JSON.parse(sessionStorage.getItem('paid')) === true){
      for (let i=0; i < empArray.length; i++){
        totalHours = totalHours + empArray[i].hours + empArray[i].pBhours;
      }
    }
    else if (JSON.parse(sessionStorage.getItem('unpaid')) === true && JSON.parse(sessionStorage.getItem('paid')) === false){
      for (let i=0; i < empArray.length; i++){
        totalHours = totalHours + empArray[i].hours + empArray[i].upBhours;
      }
    }
    else{
      for (let i=0; i < empArray.length; i++){
        totalHours = totalHours + empArray[i].hours;
      }
    }
    totalHours = parseFloat(totalHours.toFixed(2));
    setTotalHours(totalHours);
    console.log("totalHours", totalHours);
  }

  function getTipRate(){
    //const tipRate = parseFloat(tipTotal) / totalHours;
    //console.log(tipRate);
    //setTipRate(tipRate);
  }

  function calculateTips(){
    getTotalHours();
    getTipRate();
  }

  function parseData(){
    getStore(file.file[0]);
    getDateRange(file.file[1]);
    getAtrOrder(file.file[3]);
    parseEmployees(file.file);
    calculateTips();

  }

  return (
      <div class="text-center"><pre><Button variant="outline-dark" size="sm">Go To Adjustments</Button>     <Button variant="outline-dark" size="sm">View Calculation</Button></pre></div>
  )
}

export default CalculateTips

