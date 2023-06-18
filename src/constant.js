import axios from "axios";
import Cookies from "universal-cookie";

// export const baseUrl = "";
// export const backendUrl = "http://localhost:8000/";

// export const baseUrl = "https://tradejunction-backend.onrender.com/api/v2";
export const backendUrl = "https://tradejunction-backend.onrender.com/";

export const API = axios.create({
  baseURL: "https://tradejunction-backend.onrender.com/api/v2",
});

API.interceptors.request.use((req) => {
  let userToken = "userToken";
  let sellerToken = "sellerToken";
  if (localStorage.getItem("token"))
    userToken = JSON.parse(localStorage.getItem("token"));
  if (localStorage.getItem("seller_token"))
    userToken = localStorage.getItem("seller_token");
  const token = userToken + " " + sellerToken;
  console.log("tt->", token);
  req.headers.Authorization = `Bearer ${token}`;

  return req;
});

// export const getAllItem = () => API.get("/product/get-all-products");
// export const getUser = ()=>API.get("api/v2/user/getuser")
