// import React,{useState,useEffect} from "react";
// import axios from "axios";
// import CustomerHome from "./CustomerHome";
// import ReactDOM from "react-dom/client";
// import Cookies from 'js-cookie';
// // import CustomerReg from "./CustomerReg";
// import CLogin from "./CLogin.css";

// function CustomerLogin()
// {
//     const[uid,setUId]=useState();
//     const[upass,setUPass]=useState();
//     const[ischecked,setIsChecked]=useState(false);

//     const handleUIdText=(evt)=>{
//         setUId(evt.target.value);
//     }
//     const handleUPassText=(evt)=>{
//         setUPass(evt.target.value);
//     }
//     useEffect(()=>{
//         var mycookies=Cookies.get('auth');
//         if(mycookies!=undefined)
//         {
//             var obj=JSON.parse(mycookies);
//             //alert(obj.username);
//             setUId(obj.username);
//             setUPass(obj.password);
//         }
//     },[])
//     const handleLoginButton=()=>{
//         var obj={
//             CUserId:uid,
//             CUserPass:upass
//         };
//         axios.post("http://localhost:5111/customer/login",obj).then((res)=>{
//             if(res.data.CUserId!=undefined)
//             {
//                 if(res.data.Status=="Inactive")
//                 {
//                     alert("User Not Active Please wait for admin activation process");
//                     return;
//                 }
//                 //cookies handling code
//                 if(ischecked==true)
//                 {
//                     const userData={
//                         username:uid,
//                         password:upass
//                     };
//                     const expirationTime=new Date(new Date().getTime()+6000000);
//                     //store data in cookied
//                     Cookies.set('auth',JSON.stringify(userData),{expires:expirationTime});
//                 }
//                 //session handling code 
//                 const  userSessionData={
//                     cuserfullname:res.data.CustomerName
//                 };
//                 const sessionexpirationTime=new Date(new Date().getTime()+60000);
//                 //store data in session
//                 sessionStorage.setItem('vsessionauth',JSON.stringify(userSessionData),sessionexpirationTime);
//                 const root=ReactDOM.createRoot(document.getElementById("root"));
//                 var obj={
//                     cfname:res.data.CustomerName,
//                     cpicname:res.data.CPicName,
//                     cid:res.data.CId
//                 }
//                 alert("Customer Id"+obj.cid)
//                 root.render(<CustomerHome data={obj}></CustomerHome>)
//             }else{
//                 alert("Invalid id/password");
//             }
//         });
//     }
//     const handleIsRemember=()=>{
//         setIsChecked(true);
   
//     }
//     // const handleRegister=()=>{
//     // const root=ReactDOM.createRoot(document.getElementById("root"));
//     // root.render(<CustomerReg/>)
//     // }
//     return(
//         <center className="a">
//         <div className="Main_page_div_2">
//             <center>
                
//                 <h4 className="h4">Customer Login Form</h4>
               
//                     <table>
//                         <tr>
//                             <td>User Id</td>
//                             <td>
//                                  <div className="c">
//                                 <input type="text" className="form-control" id="first" onChange={handleUIdText} value={uid} />
//                                 </div>
//                             </td>
//                         </tr>
//                         <tr>
//                             <td>Password</td>
//                             <td>
//                                 <div>
//                                 <input type="password" onChange={handleUPassText} id="first" className="form-control" value={upass} />
//                                 </div>
//                             </td>
//                         </tr>
//                         <tr>
//                             <td></td>
//                             <td>
//                                 <button type="submit" className="btn btn-success" onClick={handleLoginButton}>Login</button>
//                             </td>
//                             <td>
//                                 <input type="checkbox" onClick={handleIsRemember}/>
//                                 <spane>Remember Me</spane>
//                             </td>
//                         </tr>
//                         {/* <tr>
//                             <td>
//                                 <button type="submit" className="btn btn-success" onClick={handleLoginButton} style={{marginTop:5,marginLeft:30}}>Login</button>
//                             </td>
//                             <td>
//                                 <button type="submit" className="btn btn-success" onClick={handleRegister} style={{marginTop:5,marginLeft:30}}>Register</button>
//                             </td>

//                         </tr> */}
//                     </table>
                
                
//             </center>
//         </div>
//         </center>
//     );
// }export default CustomerLogin;

import React,{useState,useEffect} from "react";
import axios from "axios";
import CustomerHome from "./CustomerHome";
import ReactDOM from "react-dom/client";
import Cookies from "js-cookie";

import "./CLogin.css";
 
function CustomerLogin()
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
        var mycookies=Cookies.get('auth');
        if(mycookies!=undefined)
        {
            var obj=JSON.parse(mycookies);
            setUId(obj.username);
            setUPass(obj.password);
        }
    },[])

    const handleLoginButton=()=>{
        var obj={
            CUserId:uid,
            CUserPass:upass
        }
        axios.post("http://localhost:5111/customer/login",obj).then((res)=>{
            if(res.data.CUserId!=undefined)
            {
                if(res.data.Status=="Inactive")
                {
                    alert("User Not Active Please Wait for Admin Activation Process");
                    return;
                }
                // cookies handling code
                if(ischecked==true)
                {
                    const userData={
                        username:uid,
                        password:upass
                    };
                    const expirationTime = new Date(new Date().getTime() + 6000000);
                    // store data in cookies
                    Cookies.set('auth',JSON.stringify(userData),{expires:expirationTime});
                }
            
                // session handling code
                const userSessionData={
                    userfullname:res.data.CustomerName
                };
                const sessionexpirationTime = new Date(new Date().getTime() + 60000);
                // store data in session
                sessionStorage.setItem('sessionauth',JSON.stringify(userSessionData),sessionexpirationTime);

                const root = ReactDOM.createRoot(document.getElementById("root"));
                var obj={cfname:res.data.CustomerName,
                    cpicname:res.data.CPicName,
                    cid:res.data.CId
                }
                root.render(<CustomerHome data={obj}></CustomerHome>)
            }else
            {
                alert("Invalid Id/Password");
            }
        });
    }
    const handleIsRemember=()=>{
        setIsChecked(true);
    }
    return(

        
         <div className="Main_page_div_2">
            
            <center>
                <h4 className="h4">Customer Login Form</h4>
                <table>
                   
                    <tr>
                        <td>User Id</td>
                        <td>
                            <input type="text" className="form-control" id="first" onChange={handleUIdText} value={uid}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td>
                            <input type="password" onChange={handleUPassText} id="first" className="form-control" value={upass}/>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button type="submit" className="btn btn-success" onClick={handleLoginButton}>Login</button>
                        </td>
                
                    
                        
                        <td>
                            <input type="checkbox" onClick={handleIsRemember} />
                            <spane id="remember">Remember Me</spane>
                        </td>
                    </tr>
                   
                </table>
            </center>
        </div>
        
    );
}export default CustomerLogin;