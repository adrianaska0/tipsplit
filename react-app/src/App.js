import NavigationBar from "./components/NavigationBar.js"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./views/HomePage.js";
import Adjustments from "./views/Adjustments.js";
import Report from "./views/Report.js";
import OptionsComp from "./components/OptionsComp.js";
import Footer from "./components/Footer.js";

const App = () =>{
  return (
    <BrowserRouter>
      <div className="site-container">
          <NavigationBar/>
          <main className="site-main">
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/home" element={<HomePage/>}/>
              <Route path="/adjustments" element={<Adjustments/>}/>
              <Route path="/report" element={<Report/>}/>
              <Route path="/options" element={<OptionsComp/>}/>
            </Routes>
          </main>
          <Footer/>
      </div>

    </BrowserRouter>

  );
}

export default App;
