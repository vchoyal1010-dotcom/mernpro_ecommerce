import React, { useState, useEffect } from "react";
import axios from "axios";
import cart from "./logoMain.png";
//import logo from './assests/logoName.png';
import ReactDOM from "react-dom/client";
//import Bill from "../CustomerView/Bill";
import '../src/ProductView/MyProductList.css';
import SCart from './assests/addcart_icon.png';
import MySlider from "./MySlider";
import { Link, Router, Routes } from "react-router-dom";
import Header from "./Header";

import CustomerMain from "./CustomerView/CustomerMain";

function MyProductList(props) {
    const [itemcount, setItemCount] = useState(0);
    const [selitems, setSelItems] = useState([]);

    const [pcatglist, setPCatgList] = useState([]);
    const [plist, setPList] = useState([]);

    var cname = "";
    var cid = props.data;
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
        if (!cid) {
            alert("Please Register/Login to Buy Products")
            
        }
        // var pid = parseInt(evt);
        // var status = "";
        // axios.get("http://localhost:5111/product/showproductstatus/" + pid).then((res) => {
        //     status = res.data.status;

        //     if (status == "Active") {
        //         setItemCount(itemcount + 1);
        //         plist.map((item) => {
        //             if (item.pid == evt) {
        //                 selitems.push(item);
        //             }
        //         })
        //     }
        //     else {
        //         alert("Product out of stock");
        //     }
        // }).catch((err) => {
        //     alert(err);
        // });
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
            //root.render(<Bill data={obj}></Bill>)
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
             <div className="nav">
               
                <div className="nav-item">
                    <img src={cart} alt="" />

                </div>
                <div className="nav-item1">
                   
                    <h2>VasTra</h2>
                    <span>Threads of Tradition</span>
                </div>
                <div>


                    <nav className="back-1">
                        <Link to="/" className="btn ">Home</Link>
                        <Link to="adminmain" className="btn " >Admin</Link><span></span>
                        <Link to="customermain" className="btn ">Customer</Link><span></span>
                        <Link to="vendermain" className="btn">Vender</Link>
                    </nav>


                </div>
                <div className="nav-item2">
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
           
            <div className="nav_niche"> <MySlider /></div>
           
            <div>
                <hr />
                <h4>Buy Your Product & Shop With us</h4>
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
                <div className="footer_div1">
                    <div >
                        <h5> About the shop</h5>
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