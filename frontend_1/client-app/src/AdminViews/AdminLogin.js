import React,{useState,useEffect} from "react";
import { Link,Outlet } from "react-router-dom";
import ReactDom from "react-dom/client";
import AdminHome from "./AdminHome";
import ALogin from "./ALogin.css";


function AdminLogin()
{
    const[uid,setUId]=useState();
    const[upass,setUPaas]=useState();

    const handleUIdText=(evt)=>{
        setUId(evt.target.value);
    }

    const handleUPassText=(evt)=>{
        setUPaas(evt.target.value);
    }

    const handleLoginButton=()=>{
        if(uid==="admin"&& upass==="abc@123")
        {
            const root=ReactDom.createRoot(document.getElementById('root'));
            root.render(<AdminHome/>)
        }
        else{
            alert("Invalid Id/Password");
        }
    }
    return(
        <center className="a">
        <div className="Main_page_div_2" >
            <center>
                  <h4  >Administration Login</h4>
                  <table >
                    <tr>
                        <td>User Id</td>
                        <td>
                            <div className="c">
                            <input type="text" className="form-control" id="first" onChange={handleUIdText} />
                            </div>
                        </td>
                    </tr>
                    <tr >
                        <td >Password</td>
                        <td>
                            <div>
                            <input type="password" onChange={handleUPassText} id="first" className="form-control" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button type="submit" className="btn btn-success" onClick={handleLoginButton}>Login</button>
                        </td>
                    </tr>
                  </table>
            </center>
        </div>
        </center>
    );
}export default AdminLogin;