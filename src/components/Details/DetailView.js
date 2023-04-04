import { useState, useEffect, useContext } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { ConnectingAirportsOutlined, Delete, Edit } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { LoginContext } from '../ContextProvider/Context';
import { toast } from 'react-toastify';
import Comments from './comments/Comments';

const URL = "https://sm-backend-5xl9.onrender.com/";

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    },
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const Heading = styled(Typography)`
    font-size: 38px;
    font-weight: 600;
    text-align: center;
    margin: 50px 0 10px 0;
`;

const Author = styled(Box)(({ theme }) => ({
    color: '#878787',
    display: 'flex',
    margin: '20px 0',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    },
}));

const DetailView = () => {
    const url = 'https://www.pexels.com/photo/cozy-couch-in-modern-apartment-with-tv-set-and-dining-zone-6585600/';
    
    const { logindata, setLoginData } = useContext(LoginContext);
    console.log(logindata);
    const [post, setPost] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();
    let token = localStorage.getItem("usersdatatoken");
    console.log(id);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`${URL}post/${id}`, {
                mehtod: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,
                    Accept: "application/json"
                },
                query: true,
            })
            const res = await data.json();
            if(res.status === 201){
                setPost(res.post);
            }
            else{
                console.log("something went wrong: ", res.error);
            }
        }
        fetchData();
    }, []);


    const deleteBlog = async () => {
        token = localStorage.getItem("usersdatatoken");
        console.log(token);
        let url = `${URL}delete/${id}`;
        const deleteRes = fetch(url, {
            method: "DELETE",
            header:{
                "Content-Type": "application.json",
                "Authorization": token,
                
            },
            body: {},
        })
        .then(response => {
            if (response.status === 201) {
              // handle successful response
              console.log('Item deleted successfully');
              navigate("/");
            } else {
              // handle error response
              console.log('Error deleting item');
            }
          })
          .catch(error => {
            console.log(error);
          });
    }

    return (
        <Container>
            <Image src={post.imageUrl || url} alt="post" />
            <Box style={{ float: 'right' }}>
                {   
                    logindata.ValidUserOne.fname === post.username && 
                    <>  
                        <Link to={`/update/${post._id}`}><EditIcon color="primary" /></Link>
                        <DeleteIcon style={{cursor:"pointer"}} onClick={() => deleteBlog()} color="error" />
                    </>
                }
            </Box>
            <Heading>{post.title}</Heading>

            <Author>
                <Link to={`/?username=${post.username}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography>Post by: <span style={{fontWeight: 600}}>{post.username}</span></Typography>
                </Link>
                <Typography style={{marginLeft: 'auto'}}>{new Date(post.createdAt).toDateString()}</Typography>
            </Author>
            <Typography>{post.description}</Typography>
            <Comments post={post}/>
        </Container>
    )
}

export default DetailView