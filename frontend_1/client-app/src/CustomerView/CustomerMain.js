// import React from "react";
// import custpic from "./cutspic.jpg";
// import { Link,Outlet } from "react-router-dom";
// import "../index.css";
// import CMainPage from "./CMainPage.css";
// import Header from "../Header";
// function CustomerMain()
// {
//     return(
//          <div>
//             <div className="Customer_Div">
//             <Header/>
//             </div>
//         <div className="Main_page_div">
//             <center>
//                 <div className="Main_page_div_1">
//                 <img src={custpic} height={90} width={100} alt=""/> 

//                 <nav>
//                     <ul>
//                         <li>
//                             <Link to="/customermain/customerlogin">Login</Link>
//                         </li>
//                           <li>
//                             <Link to="/customermain/customerreg">Registration</Link>
//                         </li>
//                     </ul>
//                     <Outlet/>
//                 </nav>
//                 </div>
//             </center>
//         </div>
//         </div>
//     );
// }export default CustomerMain;

import React from "react";
import { Link,Outlet} from "react-router-dom";
import "../index.css";
import custpic from "./cutspic.jpg";
import Header from "../Header";
import "./CMainPage.css";

function CustomerMain()
{
    return(
        <div>
             <div className="Customer_Div">
          <Header/>
          </div>
           <div className="CMain_page_div">
            <center>
                <div className="Main_page_div_3">
                <img src={custpic} height={90} width={100} alt=""/>
                <nav>
                    <ul>
                        <>
                            <Link to="/customermain/customerlogin">Login</Link><br/>
                        </>
                        <>
                            <Link to="/customermain/customerreg">Registration</Link>
                        </>
                    </ul>
                    <Outlet />
                </nav>  
                </div>    
            </center>
            </div>
        </div>
    );
}export default CustomerMain;