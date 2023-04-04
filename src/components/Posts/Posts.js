import React, { useState, useEffect } from 'react'
import { Grid, Box } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import Post from './Post';
const URL = "https://sm-backend-5xl9.onrender.com/";
function Posts() {
    const [ posts, setPost ] = useState([]);

    let token = localStorage.getItem("usersdatatoken");

    useEffect(()=>{
        const fetchData = async() =>{
            let url = `${URL}posts`;
            const data = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,
                },
            })
            const res = await data.json();
            if(res.status === 201){
                setPost(res.posts);
            }
        }
        fetchData();
    }, [])


  return (
    <>
    {
        posts?.length ? posts.map((post, i) => (
            <Grid key={i} item lg={3} sm={4} xs={12}>
                <Link style={{textDecoration: 'none', color: 'inherit'}} to={`/getPost/${post._id}`}>
                    <Post post={post} />
                </Link>
            </Grid>
        )) : <Box style={{color: '878787', margin: '30px 80px', fontSize: 18, height:"100vh"}}>
                No data is available...
            </Box>
    }
</>
  )
}

export default Posts
