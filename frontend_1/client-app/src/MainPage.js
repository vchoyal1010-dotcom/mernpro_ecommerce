import React from "react";
import {
    BrowserRouter as Router,
    Link,
    Routes,
    Route,
} from "react-router-dom";

import CustomerMain from "./CustomerView/CustomerMain";
import VenderMain from "./VenderView/VenderMain";
import AdminMain from "./AdminViews/AdminMain";
import AdminLogin from "./AdminViews/AdminLogin";
// import AdminReg
import CustomerLogin from "./CustomerView/CustomerLogin";
import CustomerReg from "./CustomerView/CustomerReg";
import VenderLogin from "./VenderView/VenderLogin";
import VenderReg from "./VenderView/VenderReg";
import "./index.css";
import AdminHome from "./AdminViews/AdminHome";
// import mainpage from "./mainpage.jpg";
import Mpage from "./Mpage.css";
import HomePage from "./HomePage";
import MyProductList from "./MyProductList";
import StateMgt from "./AdminViews/StateMgt";
import CityMgt from "./AdminViews/CityMgt";


function MainPage() {
    return (
        <div className="App">
            <center>
                {/* <img src={mainpage} height={380} width="50%" alt=""></img> */}
                <Router>
                   
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                       
                         
                        <Route path="/adminmain" element={<AdminMain />} >
                        <Route path="adminlogin"  element={<AdminLogin />} />
                        <Route path="adminhome" element={<AdminHome />}/>
                       
                        </Route>
                     
                        {/* <Route path="/adminreg" element={<AdminReg/>}></Route> */}
                        <Route path="/customermain" element={<CustomerMain />}>
                            <Route  path="customerlogin"  element={<CustomerLogin />} />
                            <Route path="customerreg" element={<CustomerReg />} />
                        </Route>

                        <Route path="/vendermain" element={<VenderMain />} >
                        <Route path="venderlogin" element={<VenderLogin />} />
                        <Route path="venderreg" element={<VenderReg />}/>

                        

                        </Route>
                         {/* <Route path="/adminmain/statemgt" element={<StateMgt/>} />
                        <Route path="/adminmain/citymgt" element={<CityMgt/>} /> */}


                       
                    </Routes>


                    {/* <Routes>
                        <Route path="/customerlogin" element={<AdminLogin/>}>
                        <Route path=""/>

                        </Route>
                    </Routes> */}
                </Router>
            </center>
        </div>
    );
} export default MainPage;


