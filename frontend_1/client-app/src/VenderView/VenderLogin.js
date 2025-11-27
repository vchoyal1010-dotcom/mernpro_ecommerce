import React,{useState,useEffect} from "react";
import axios from "axios";
import VenderHome from "./VenderHome";
import ReactDOM from "react-dom/client";
import Cookies from 'js-cookie';
import VenderReg from "./VenderReg";
import VLogin from "./VLogin.css";

//npm install js-cookie --save

function VenderLogin()
{
    const[uid,setUId]=useState();
    const[upass,setUPass]=useState();
    const[ischecked,setIsChecked]=useState(false);

    const handleUIdText=(evt)=>{
        setUId(evt.target.value);
    }
    const handleUPassText=(evt)=>{
        setUPass(evt.target.value);
    }
    useEffect(()=>{
        var mycookies=Cookies.get('vauth');
        if(mycookies!=undefined)
        {
            var obj=JSON.parse(mycookies);
            //alert(obj.username);
            setUId(obj.username);
            setUPass(obj.password);
        }
    },[])
    const handleLoginButton=()=>{
        var obj={
            vuid:uid,
            vupass:upass
        };
        axios.post("http://localhost:5111/vender/login",obj).then((res)=>{
            if(res.data.VUserId!=undefined)
            {
                if(res.data.Status=="Inactive")
                {
                    alert("User Not Active Please wait for admin activation process");
                    return;
                }
                //cookies handling code
                if(ischecked==true)
                {
                    const userData={
                        username:uid,
                        password:upass
                    };
                    const expirationTime=new Date(new Date().getTime()+6000000);
                    //store data in cookied
                    Cookies.set('vauth',JSON.stringify(userData),{expires:expirationTime});
                }
                //session handling code 
                const  userSessionData={
                    vuserfullname:res.data.VenderName
                };
                const sessionexpirationTime=new Date(new Date().getTime()+60000);
                //store data in session
                sessionStorage.setItem('vsessionauth',JSON.stringify(userSessionData),sessionexpirationTime);
                const root=ReactDOM.createRoot(document.getElementById("root"));
                var obj={
                    vfname:res.data.VenderName,
                    vpicname:res.data.VPicName,
                    vid:res.data.VId
                }
                alert("Vender Id"+obj.vid)
                root.render(<VenderHome data={obj}></VenderHome>)
            }else{
                alert("Invalid id/password");
            }
        });
    }
    const handleIsRemember=()=>{
        setIsChecked(true);
   
    }
    const handleRegister=()=>{
    const root=ReactDOM.createRoot(document.getElementById("root"));
    root.render(<VenderReg/>)
    }
    return(
         <center className="a">
        <div className="Main_page_div_2">
            <center>
                <h4 className="h4">Vender Login Form</h4>
                
                    <table>
                        <tr>
                            <td>User Id</td>
                            <td>
                                <div>
                                <input type="text" className="form-control" id="first" onChange={handleUIdText} value={uid} />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td>
                                <div>
                                <input type="password" onChange={handleUPassText}  id="first" className="form-control" value={upass} />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <input type="checkbox" onClick={handleIsRemember}/>
                                <spane>Remember Me</spane>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="submit" className="btn btn-success" id="btn" onClick={handleLoginButton} >Login</button>
                            </td>
                            {/* <td>
                                <button type="submit" className="btn btn-success" id="btn" onClick={handleRegister} >Register</button>
                            </td> */}

                        </tr>
                    </table>
                
            </center>
        </div>
        </center>
    );
}export default VenderLogin;

































