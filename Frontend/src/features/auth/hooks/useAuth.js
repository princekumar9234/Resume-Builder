import { useContext, useEffect } from "react";
import { AuthContext } from "../Auth.context";
import {
  login,
  register,
  logout,
  emailVerify,
  getMe,
  forgetPassword,
  updatePassword,
} from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  /*
  hooks:- handle the loginuser and return user details.
  */
  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login({ email, password });
      setUser(data.user);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ email, password, username }) => {
    setLoading(true);
    try {
      const data = await register({ username, email, password });
      setUser(data.user);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailVerify = async ({ email, otp }) => {
    setLoading(true);
    try {
      const data = await emailVerify({ email, otp });
      setUser(data.user);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const data = await logout();
      console.log(data);
      setUser(null);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getAndSetUser = async () => {
      const data = await getMe();
      setUser(data.user);
      setLoading(false);
    };
    getAndSetUser();
  }, []);

  const handleForgetPassword = async ({ email }) => {
    setLoading(false);
    try {
      const data = await forgetPassword({ email });
      setUser(null);
      return data;
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  };  

  const handleUpdatePassword = async ({ email, otp, newPassword }) => {
    setLoading(true);
    try {
      const data = await updatePassword({ email, otp, newPassword });
      setUser(data.user);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  };
  return {
    user,
    loading,
    handleLogin,
    handleLogout,
    handleRegister,
    handleEmailVerify,
    handleForgetPassword,
    handleUpdatePassword,
  };
};
