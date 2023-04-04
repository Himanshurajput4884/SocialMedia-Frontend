import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { LoginContext } from './ContextProvider/Context';

import "./mix.css";
const URL = "https://sm-backend-5xl9.onrender.com/";


function AddPost() {
  const navigate = useNavigate();
  const [ formdata, setformdata ] = useState({
        title: '',
        image: null,
        createdAt: Math.floor(Date.now() / 1000),
    })
    const { logindata, setLoginData } = useContext(LoginContext);
    const setVal = (e) =>{
        setformdata({...formdata, [e.target.name]:e.target.value});
    }
    const setImage = (e) =>{ 
        setformdata({...formdata, image:e.target.files[0]});
    }

    

    const handlePost = async (e) =>{
        e.preventDefault();
        const form_data = new FormData();
        form_data.append('file', formdata.image);
        // form_data.append('username', logindata.ValidUserOne.fname);
        // form_data.append('user_id', logindata.ValidUserOne._id);
        // form_data.append('title', formdata.title);
        // form_data.append('Date', formdata.createdAt);
        

        let url = `${URL}file/upload`;
        const data = await fetch(url, {
          method: 'POST',
          body: form_data,
        })
        const res = await data.json();
        let token = localStorage.getItem("usersdatatoken");
        

        if(res.imageUrl){
          console.log(res.imageUrl);
          const form2_data = {
            username: logindata.ValidUserOne.fname,
            title: formdata.title,
            user_id: logindata.ValidUserOne._id,
            createdAt: formdata.createdAt,
            imageUrl: res.imageUrl,
          }
          // console.log(form2_data);
          const data2 = await fetch(`${URL}create`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "Authorization": token,
              Accept: "application/json"
          },
            body: JSON.stringify(form2_data),
          })
          const response = await data2.json();
          if(response.status === 201){
            setformdata({
              title: '',
              image: null,
            });
            toast.success("Post Added Succesfully", {
              position: "top-center",
            })
            navigate("/");
          }
        }
        
    }


  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Hello User</h1>
            <span>You can add Post</span>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="title">Title</label>
              <input
                type="email"
                value={formdata.title}
                onChange={setVal}
                name="title"
                id="title"
                placeholder="Title"
              />
            </div>
            
            <div className="form_input">
              <label htmlFor="file">Image</label>
              <input
                type="file"
                onChange={(e)=>setImage(e)}
                id="image"
                accept="image/*"
              />
            </div>

            <button className="btn" onClick={handlePost}>
              Post
            </button>
            
          </form>
          <ToastContainer />
        </div>
      </section>
    </>
  );
}

export default AddPost;
