import React from "react";
import {Link, List,Outlet,Route,Routes} from "react-router-dom";
import adminpic from "./adminpic.jpg";
import "../index.css";
import AdminLogin from "./AdminLogin";
import AMainPage from "./AMainPage.css";
import Header from "../Header";

function AdminMain()
{
    return(

        <>
        <Header/>
        
        <div className="Main_page_div">
            <center>
                <div className="Main_page_div_1">
                <img src={adminpic} height={90} width={100} alt=""/>

                <nav>
                    <ul>
                    <>
                        <Link to="/adminmain/adminlogin"> Login</Link>
                    </>
                      {/* <li>
                        <Link to="/adminmain/adminreg"> Registration</Link>
                    </li> */}
                    </ul>
                    <Outlet/>
                </nav>
               {/* <Route >
                <Route path="/adminlogin" element={<AdminLogin></AdminLogin>}/>
               </Route> */}
               </div>
            </center>
         </div>
        </>
        
    );
}export default AdminMain;