import React, { useState } from "react";
import Google from "../../../assets/google.png";
import github from "../../../assets/github.png";
import { Link } from "react-router";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleForm = (e) => {
    e.preventDefault();
    console.log("email", email, "password =", password, "username =", username);
  };
  return (
    <main>
      <div className="flex flex-col items-center justify-center gap-2 mt-10">
        <div>
          <h1 className="text-4xl font-semibold">Start your first draft </h1>
          <p className="mt-1">
            Already have an account ?{" "}
            <button className="text-green-600">
              <Link to={"/login"}>Log In</Link>
            </button>
          </p>
        </div>
        <form onSubmit={handleForm}>
          <div className="flex flex-col">
            <label className=" text-bold ">Username</label>
            <input
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              value={username}
              className="px-3 py-2 border  opacity-80 bg-gray-100 outline-none  focus:outline-0 rounded"
              type="text"
              placeholder="xyz"
            />
            <label className="text-bold mt-5">Email address</label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="px-3 py-2 border bg-gray-100 opacity-80  outline-none   focus:outline-0 rounded"
              type="email"
              placeholder="you@example.com"
            />
            <label className=" text-bold  mt-5"> Password</label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              className="px-3 py-2 bg-gray-100 border opacity-80 outline-none   focus:outline-0 rounded"
              type="password"
              placeholder="••••••••••"
            />
            <div className="text-l ">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-3 mb-3 accent-[#0a0a0a] "
              />
              I agree to folio's Term & service and privacy policy
            </div>
            <button className="py-2 border cursor-pointer bg-gray-200 font-bold mt-3 mb-4">
              Create account
            </button>
            <hr />
          </div>
          or continue with
          <div className=" ">
            <button className="flex items-center gap-1 cursor-pointer bg-gray-100 font-bold  border py-2 px-22">
              <img src={Google} alt="Google" width={20} /> Continue with Google
            </button>
            <button className="flex items-center cursor-pointer  bg-gray-100 font-bold  border py-2 px-22 mt-3 mb-10">
              <img src={github} alt="github" width={24} /> Continue with Github
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default RegisterPage;
