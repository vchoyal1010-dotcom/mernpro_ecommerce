import React from "react";
import venderpic from "./venderpic.png";
import { Link,Outlet } from "react-router-dom";
import "../index.css";
import VMainPage from "./VMainPage.css";
import Header from "../Header";
function VenderMain()
{
    return(
         <div>
            <div>
            <Header/>
             </div>
        <div className="Main_page_div_5">
            <center>
                  <div className="Main_page_div_1">
                <img src={venderpic}  height={95} width={100} alt=""/> 
          
                <nav>
                    <ul>
                        <>
                            <Link to="/vendermain/venderlogin">Login</Link><br/>
                        </>
                          <>
                            <Link to="/vendermain/venderreg">Registration</Link>
                        </>
                    </ul>
                    <Outlet/>
                </nav>
                </div>
            </center>
        </div>
        </div>
    );
}export default VenderMain;