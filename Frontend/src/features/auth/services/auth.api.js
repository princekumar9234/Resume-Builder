import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
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

export async function emailVerify({ email, otp }) {
  try {
    const response = await api.post("/user/emailVerify", {
      email,
      otp,
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

export async function updatePassword({ email, otp, newPassword }) {
  try {
    const response = await api.post("/user/updatePassword", {
      email,
      otp,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function refreshToken() {
  try {
    const response = await api.get("/user/refreshToken");
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
