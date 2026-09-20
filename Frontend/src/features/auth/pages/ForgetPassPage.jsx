import React from "react";

const ForgetPassPage = () => {
  return (
    <main>
      <div className="bg-gray-50 md:w-100 md:ml-[35%] rounded shadow-md mt-35 m-4">
        <div className="py-6">
          <h2 className="text-4xl text-center font-bold">Forget Password</h2>
          <p className="text-center mt-2 text-sm">
            Please enter your details to forgetpassword.
          </p>
        </div>
        <div className="flex flex-col gap-1 ml-10  mr-10 ">
          <label className="mt-3">Email:</label>
          <input
            className="py-2 px-2 outline-none rounded opacity-70 border"
            type="email"
            placeholder="email@example.com"
          />
          <button className="py-2 cursor-pointer bg-green-600 text-white text-sm mt-5 mb-4">
            Forget-Password
          </button>{" "}
          <hr />
          <div className="flex gap-2 mt-3 mb-10 text-center justify-center">
            if you have password ?{" "}
            <button className="text-green-600 cursor-pointer font-bold">
              {" "}
              login
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgetPassPage;
