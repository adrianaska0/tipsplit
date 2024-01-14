import {useState, useRef, useLayoutEffect} from 'react';
import {Button} from 'react-bootstrap';

function CalculateTips(file){
  
  const [storeName, setStoreName] = useState();
  const [dateRange, setDateRange] = useState();

  const [totalTimeIdx, setTotalTimeIdx] = useState();
  const [typeIdx, setTypeIdx] = useState();

  const [totalHours, setTotalHours] = useState();
  const [totalPayout, setTotalPayout] = useState();
  const [tipRate, setTipRate] = useState();

  const empArray = [];

  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    parseData();
  });

  function parseData(){
    console.log("File", file.file);
    getStore(file.file[0]);
    getDateRange(file.file[1]);
    getAtrOrder(file.file[3]);
    console.log("ORder",totalTimeIdx, typeIdx)
    if (totalTimeIdx && typeIdx){
    parseEmployees(file.file);
    calculateTips();
    console.log("EMPS", empArray);}
  }

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
      console.log(line);
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
      else if (checkArrayRegex(line, "Employee Totals")){
        hourTotal = hourTotal.toFixed(2);
        paidBreakTotal = paidBreakTotal.toFixed(2);
        unpaidBreakTotal = unpaidBreakTotal.toFixed(2);
        createEmpObj(empId, empName, hourTotal, paidBreakTotal, unpaidBreakTotal);
      }
      else if (checkArrayRegex(line, "Position Totals")){
      }
      else if (checkArrayRegex(line, /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/) && line[typeIdx] === ""){
        hourTotal = hourTotal + parseFloat(line[totalTimeIdx]);
      }
      else if (checkArrayRegex(line, /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/) && line[typeIdx] === "Paid Break"){
        paidBreakTotal = paidBreakTotal + parseFloat(line[totalTimeIdx]);
      }
      else if (checkArrayRegex(line, /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/) && line[typeIdx] === "Unpaid Break"){
        unpaidBreakTotal = unpaidBreakTotal + parseFloat(line[totalTimeIdx]);
      }
    }
    );
    
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

  function checkArrayRegex (arr, regex){
    for (let i=0; i<arr.length; i++){
      const result = arr[i].match(regex);
      if (result){
        return true;
      }
    }
    return false;
  }

  function getTipRate(){
    const tips = JSON.parse(sessionStorage.getItem('tipInput'));
    const tipRate = tips / totalHours;
    console.log(tipRate.toFixed(3));
    setTipRate(tipRate);
  }

  function setTippableHours(){

      if (JSON.parse(sessionStorage.getItem('unpaid')) === true && JSON.parse(sessionStorage.getItem('paid')) === true){
        for (let i=0; i < empArray.length; i++){
          empArray[i].tippableHours = empArray[i].hours + empArray[i].upBhours + empArray[i].pBhours
        }
      }
      else if (JSON.parse(sessionStorage.getItem('unpaid')) === false && JSON.parse(sessionStorage.getItem('paid')) === true){
        for (let i=0; i < empArray.length; i++){
          empArray[i].tippableHours = empArray[i].hours + empArray[i].pBhours;
        }
      }
      else if (JSON.parse(sessionStorage.getItem('unpaid')) === true && JSON.parse(sessionStorage.getItem('paid')) === false){
        for (let i=0; i < empArray.length; i++){
          empArray[i].tippableHours = empArray[i].hours + empArray[i].upBhours;
        }
      }
      else{
        for (let i=0; i < empArray.length; i++){
          empArray[i].tippableHours = empArray[i].hours;
        }
    }
  }

  function calculatePayout(){
    for (let i=0; i < empArray.length; i++){
      empArray[i].payout = parseFloat((empArray[i].tippableHours * tipRate).toFixed(2));
    }
  }

  function getTotalPayout(){
    let total = 0;
    for (let i=0; i < empArray.length; i++){
      total = total + empArray[i].payout
    }
    setTotalPayout(total);
  } 
  
  function calculateTips(){
    getTotalHours();
    getTipRate();
    setTippableHours();
    calculatePayout();
    getTotalPayout();
    console.log(JSON.parse(sessionStorage.getItem('tipInput')), "VS", totalPayout)
  }

  return (
      <div class="text-center"><pre><Button variant="outline-dark" size="sm">Go To Adjustments</Button>     <Button variant="outline-dark" size="sm">View Calculation</Button></pre></div>
  )
}

export default CalculateTips

