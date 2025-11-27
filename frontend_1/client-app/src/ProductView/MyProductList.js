import React, { useState, useEffect } from "react";
import axios from "axios";
import cart from "../logoMain.png";
//import logo from '../assests/logoName.png';
import ReactDOM from "react-dom/client";
import Bill from "../CustomerView/Bill";
import './MyProductList.css';
import SCart from '../assests/addcart_icon.png'
import MySlider from "../MySlider";
import Header from "../Header";
import { Link } from "react-router-dom";


function MyProductList(props) {
    const [itemcount, setItemCount] = useState(0);
    const [selitems, setSelItems] = useState([]);

    const [pcatglist, setPCatgList] = useState([]);
    const [plist, setPList] = useState([]);

    var cname = "";
    useEffect(() => {
        axios.get("http://localhost:5111/product/showproduct").then((res) => {
            setPList(res.data);

        }).catch((err) => {
            alert(err);
        });
        axios.get("http://localhost:5111/productcatg/showproductcatg").then((res) => {
            setPCatgList(res.data);
        }).catch((err) => {
            alert(err);
        });
    }, []);

    const handleBuyButton = (evt) => {
        var pid = parseInt(evt);
        var status = "";
        axios.get("http://localhost:5111/product/showproductstatus/" + pid).then((res) => {
            status = res.data.status;

            if (status == "Active") {
                setItemCount(itemcount + 1);
                plist.map((item) => {
                    if (item.pid == evt) {
                        selitems.push(item);
                    }
                })
            }
            else {
                alert("Product out of stock");
            }
        }).catch((err) => {
            alert(err);
        });
    }

    const handleCheckOutButton = () => {
        // alert("Hello")
        if (selitems.length <= 0) {
            alert("Please Buy Some Product");
        }
        else {
            const root = ReactDOM.createRoot(document.getElementById("root"));
            var ccid = props.data;

            var obj = {
                selitems: selitems,
                cid: ccid
            };
            root.render(<Bill data={obj}></Bill>)
        }
    }

    const handleSearch = (evt) => {
        if (evt.target.value > 0) {
            axios.get("http://localhost:5111/product/showproductbycatgid/" + evt.target.value).then((res) => {
                setPList(res.data);
            }).catch((err) => {
                alert(err);

            });
        }
        else {
            axios.get("http://localhost:5111/product/showproduct").then((res) => {
                setPList(res.data);
            }).catch((err) => {
                alert(err);
            });
        }
    }
    return (
        <div>  
            <hr/>
            <div className="nav_my">
               
                <div className="nav-item">
                    <img src={cart} alt="" />

                </div>
                <div className="nav-item1">
                   
                    <h2>VasTra</h2>
                    <span>Threads of Tradition</span>
                </div>
                <div>


                     {/* <nav className="back-1">
                        <Link to="/" className="btn ">Home</Link>
                        <Link to="adminmain" className="btn " >Admin</Link><span></span>
                        <Link to="customermain" className="btn ">Customer</Link><span></span>
                        <Link to="vendermain" className="btn">Vender</Link>
                    </nav>  */}


                </div>
                <div className="nav-item3">
                    <span> Search </span>
                    <select onClick={handleSearch} >
                        <option className="search_place" value={0}>Search by Category</option>
                        {
                            pcatglist.map((pcatgitem) => (
                                <option value={pcatgitem.pcatgid}>{pcatgitem.pcatgname}</option>
                            ))
                        }
                    </select>
                </div> 
                <div className="nav-item4">

                    <button type="submit" onClick={handleCheckOutButton}>
                        <img src={SCart} alt="" />
                    </button>
                    <label>{itemcount}</label>
                </div>
                  

            </div>
            
            {/* <Header/> */}
           
            {/* <div className="nav_niche4"> <MySlider /></div> */}
           
            <div>
                <hr />
                <center>
                <h4>Buy Your Product & Shop With us</h4>
                </center>
                <hr />
            </div>
            <div>
                
                <div className="product_cart">

                    {
                        plist.map((item) => (
                            <div className="product_cart_back">
                                {/* <td>{item.pid}  </td> */}
                                <div>
                                    <img src={"http://localhost:5111/product/getproductimage/" + item.ppicname} height={230} width={200} alt="" />
                                </div>
                                <p  className="product_name">{item.pname}</p>
                                <p className="price">
                                <span className="old-price">₹{item.pprice}</span>
                                <span className="new-price">₹{item.oprice}</span>
                                </p>
                                <div>
                                    {
                                        pcatglist.map((citem) => {

                                            if (item.pcatgid == citem.pcatgid) {
                                                cname = (citem.pcatgname)
                                            }
                                        })
                                    }
                                    {/* {cname} */}
                                </div>
                                <div>
                                    <button type="submit" onClick={() => handleBuyButton(item.pid)}  className="buy_button">Buy</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                
            </div>
               <hr className="end_line" />
            <div className="footer_page">
                <div className="footer_div3">
                    <div >
                       <center> <h5> About the shop</h5></center>
                       VasTra is your one-stop destination for trendy, comfortable, and affordable clothing.
                    </div>
                    <div>
                    
                       
                    </div>
                </div>
                <hr />
            
            <div className="footer_div2">
                
                <div>
                    <h6>CATEGORIES</h6>
                    Women Ethenic<br />
                    Men Ethenic<br />
                    kids Ethenic<br />
                   
                </div>
                <div>
                    <h6>Channels</h6>
                   VasTra1010@.com<br/>
                   VasTra@trendy
                   
                </div>
                <div>
                    <h6>Location</h6>
                    
                    123 Street name, Indore, Mp<br />
                    0123 456 789 / 0123 456 788<br />

                  
                </div>


            </div>
        </div>
       </div>

    );
} export default MyProductList;

// import React, { useEffect,useState } from "react";
// import axios from "axios";
// import cart from "./productviews/cart.jpg";
// import ReactDOM from "react-dom/client";
// import Bill from "./customerviews/Bill";
// import "./PList.css"

// function ProductList(props) {
//     const [itemcount, setItemcount] = useState(0);
//     const [selitems, setSelItems] = useState([]);
//     const [pcatglist, setPCatglist] = useState([]);
//     const [plist, setPList] = useState([]);

//     let cname = "";
//     var cid=props.data;
//     useEffect(() => {
//         axios.get("http://localhost:5111/product/showproduct")
//             .then((res) => {
//                 setPList(res.data);
//             })
//             .catch((error) => {
//                 alert(error);
//             });
//         axios.get("http://localhost:5111/productcatg/showproductcatg")
//             .then((res) => {
//                 setPCatglist(res.data);
//             })
//             .catch((error) => {
//                 alert(error);
//             });
//     }, []);

//     const handleBuyButton = (evt) => {
//         // if (!cid){
//         //     alert("Please Register/Login to Buy Products")
//         //     return
//         // }
//         let pid = parseInt(evt);
//         let status = ''
//         axios.get("http://localhost:5111/product/showproductstatus/" + pid)
//             .then((res) => {
//                 status = res.data.status;
//                 if (status == "Active") {
//                     setItemcount(itemcount + 1);
//                     plist.map((item) => {
//                         if (item.pid == evt) {
//                             selitems.push(item);
//                         }
//                     });
//                 } else {
//                     alert("Product is out of Stock");
//                 }
//             }).catch((error) => {
//                 alert(error);
//             });
//     }

//     const handleCheckOutButton = () => {
       
//         if (selitems.length <= 0) {
//             alert("Please Buy Some Product");
//         } else {
//             const root = ReactDOM.createRoot(document.getElementById("root"));
//             let ccid = props.data;
//             let obj = {
//                 cid: ccid,
//                 selitems: selitems
//             };
//            //root.render(<Bill data={obj} ></Bill>);
//         }
//     }

//      const getCategoryName = (pcatgid) => {
//         const cat = pcatglist.find((c) => c.pcatgid === pcatgid);
//         return cat ? cat.pcatgname : "";
//      }

//     const handleSearch = (evt) => {
//         if (evt.target.value > 0) {
//             axios.get("http://localhost:5111/product/showproductbycatgid/" + evt.target.value)
//                 .then((res) => {
//                     setPList(res.data);
//                 })
//                 .catch((error) => {
//                     alert(error);
//                 });
//         } else {
//             axios.get("http://localhost:5111/product/showproduct")
//                 .then((res) => {
//                     setPList(res.data);
//                 })
//                 .catch((error) => {
//                     alert(error);
//                 });
//         }
//     }

//  return (
//         <div className="prod-cont">
//             <h4>Customer Id {props.data?null:"Guest"}</h4>
//             <div className="cart-box">
//                 <img src={cart} alt="cart" width="50" height="50" />
//                 <label>{itemcount}</label>
//                 <button onClick={handleCheckOutButton}>CheckOut</button>
//             </div>

//             <center>
//                 <p>Search By Product Category</p>
//                 <select onChange={handleSearch}>
//                     <option value="0">All</option>
//                     {pcatglist.map((pcatgitem) => (
//                         <option key={pcatgitem.pcatgid} value={pcatgitem.pcatgid}>
//                             {pcatgitem.pcatgname}
//                         </option>
//                     ))}
//                 </select>
//             </center>

//             <h5>Product List</h5>
//             <div className="product-flex">
//                 {plist.map((item) => (
//                     <div key={item.pid} className="product-card">
//                         <img
//                             src={"http://localhost:5111/product/getproductimage/" + item.ppicname}
//                             width="100"
//                             height="100"
//                             alt={item.pname}
//                         />
//                         <h6>{item.pname}</h6>
//                         <p>Price: ₹{item.pprice}</p>
//                         <p>Offer: ₹{item.oprice}</p>
//                         <p>Category: {getCategoryName(item.pcatgid)}</p>
//                         <button onClick={() => handleBuyButton(item.pid)}>Buy</button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default ProductList;

