import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(password);
      const response = await axios.get(
        `https://car-saathi.onrender.com/api/auth/reset-password/${token}`,
        {
          params: {
            password: password,
          },
        }
      );
      // console.log(response)
      if (response.status === 200) {
        navigate("/signin");
      }
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-lg shadow-md p-8 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Reset Password</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              minLength="8"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-3 py-2"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.071 4.929a8 8 0 00-11.314 0L12 10.586l7.071-7.071zM12 16.243V20m0 0L12 20M12 20h.01"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14V8a2 2 0 00-2-2H7a2 2 0 00-2 2v6l5 5h4l5-5z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full block bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
