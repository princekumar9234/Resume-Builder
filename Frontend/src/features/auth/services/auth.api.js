import axios from "axios";

const api = axios.create({
  baseURL: "http//localhost:3000",
  withCredentials: true,
});

export async function register({ username, email, password }) {
  try {
    const response = await api.post("/user/register", {
      username,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export async function login({ email, password }) {
  try {
    const response = await api.post("/user/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function logout() {
  try {
    const response = await api.get("/user/logout");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export async function getMe() {
  try {
    const response = await api.get("/user/get-me");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function forgetPassword({ email }) {
  try {
    const response = await api.post("/user/forgetPassword", {
      email,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
