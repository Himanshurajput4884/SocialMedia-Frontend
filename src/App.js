import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Error from "./components/Error";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { LoginContext } from "./components/ContextProvider/Context";
import Forget from "./components/Forget";
import Change from "./components/Change";
import Home from "./components/Home";
import AddPost from "./components/AddPost";
import DetailView from "./components/Details/DetailView";
import UpdatePost from "./components/UpdatePost";
import Sidebar from "./components/Sidebar";
const url = "https://sm-backend-5xl9.onrender.com/";

function App() {
  const [data, setData] = useState(false);

  const { logindata, setLoginData } = useContext(LoginContext);

  const history = useNavigate();

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch(`${url}validuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await res.json();

    if (data.status == 401 || !data) {
      console.log("user not valid");
    } else {
      console.log("user verify");
      setLoginData(data);
      history("/");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      DashboardValid();
      setData(true);
    }, 2000);
  }, []);

  return (
    <>
      {data ? (
        <>
          <Header />
          <Sidebar>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/getPost/:id" element={<DetailView />} />
              <Route path="/update/:id" element={<UpdatePost />} />
              <Route path="/create/post" element={<AddPost />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dash" element={<Dashboard />} />
              <Route path="/forget" element={<Forget />} />
              <Route path="/change" element={<Change />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </Sidebar>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      )}
    </>
  );
}

export default App;
