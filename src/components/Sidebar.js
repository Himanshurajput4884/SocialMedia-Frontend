import React, { useState, useContext } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import "./sidebar.css";
import { LoginContext } from './ContextProvider/Context';
const URL = "https://sm-backend-5xl9.onrender.com/";


const Sidebar = ({children}) => {
    const { logindata, setLoginData } = useContext(LoginContext);
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    // console.log(logindata.ValidUserOne);
    const post_path = (logindata.ValidUserOne) ? "/create/post" : "/login";
    console.log(post_path);
    // setIsOpen(true);
    const menuItem=[
        {
            path:"/",
            name:"Home",
            icon:<FaTh/>
        },
        {
            path:post_path,
            name:"Add Post",
            icon:<FaRegChartBar/>
        },
        {
            path:"/dash",
            name:"Profile",
            icon:<FaUserAlt/>
        },
    ]
    return (
        <div className="container" style={{"margin": "0", "padding-left": "0"}}>
           <div style={{width: isOpen ? "300px" : "60px", margin: isOpen?"0 0 0 0":"0 130px 0 0"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Social Media</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active" style={{textDecoration:"none"}}>
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;