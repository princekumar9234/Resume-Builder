import Google from "../../../assets/google.png";
import github from "../../../assets/github.png";
import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFrom = (e) => {
    e.preventDefault();
    (console.log("Email", email), console.log("password", password));
  };

  return (
    <main className="flex flex-col items-center mt-20">
      <div className="flex flex-col gap-5">
        <div className=" items-baseline">
          <h2 className="text-4xl font-bold">Welcome Back</h2>
          <p>
            New to filo ?
            <button className="ml-1 text-green-500 cursor-pointer">
              Create an Account
            </button>{" "}
          </p>
        </div>
        <form onSubmit={handleFrom}>
          <div className="flex flex-col gap-1">
            <label>Email address</label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              name="email"
              type="text"
              className="mb-3 focus:outline-0 py-2 px-3 border hover:outline-0 opacity-80 rounded "
              placeholder="you@example.com"
            />
            <label>Password</label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              name="password"
              value={password}
              type="password"
              className=" py-2 focus:outline-0 px-3 border hover:outline-0 opacity-80 rounded "
              placeholder="••••••••••"
            />
          </div>
          <div className="mb-3">
            <button className=" cursor-pointer ml-62 text-red-700">
              forget password ?
            </button>
          </div>
          <button className="border-2 w-full cursor-pointer font-bold py-2 text-lg bg-amber-100 mb-5">
            Login
          </button>
          <hr />
          <p className="text-center py-3 ">or Continue with</p>
          <div className="flex flex-col w-full items-center gap-2 text-center">
            <button className=" cursor-pointer flex items-center gap-1 border mt-2 py-2 px-24">
              <img src={Google} alt="Google" height={20} width={22} /> Continue
              with Google
            </button>
            <button className=" cursor-pointer flex items-center gap-1 border px-24 py-2">
              <img src={github} alt="github" height={22} width={24} /> Continue
              with Github
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
