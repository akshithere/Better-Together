import { authTypeOptions } from "@/static/Constants";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import rightabstract from "../../assets/pictures/authpages/authbanner.png";
import { Button } from "../../components/shared";
import { NavigationMenu } from "@components/ui/Navbar";
import { useAuth } from "../../hooks/useAuth";
import { GoogleAuth } from "../../service/BetterApi";

const SignUp = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    userType: authTypeOptions[1], // Default to "individual"
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const { authenticateUser, loading } = useAuth("signup");

  const handleGoogle = async () => {
    const response = await GoogleAuth();
    window.location.href = response;
  };

  return (
    <>
      <Helmet>
        <title>Better-Together | SignUp</title>
        <meta name="description" content="Join our community by signing up!" />
        <link rel="canonical" href="/" />
      </Helmet>

      <NavigationMenu />

      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-[0_4px_10px_rgba(255,159,85,0.5)] flex overflow-hidden p-6 space-x-4">
          {/* Left Form Section */}
          <div className="w-3/5">
            <h1 className="text-2xl font-semibold text-orange-900 mb-3">Sign Up</h1>
            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                authenticateUser(credentials, setErrors);
              }}
            >
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {credentials.userType.value === "individual"
                    ? "Full Name"
                    : "Organization Name"}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-brown-500"
                  placeholder={
                    credentials.userType.value === "individual"
                      ? "John Doe"
                      : "Save Tigers"
                  }
                  value={credentials.name}
                  onChange={(e) =>
                    setCredentials({ ...credentials, name: e.target.value })
                  }
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-brown-500"
                  placeholder="john@gmail.com"
                  value={credentials.email}
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-brown-500"
                    placeholder="********"
                    value={credentials.password}
                    onChange={(e) =>
                      setCredentials({ ...credentials, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors"
              >
                Sign Up
              </Button>
            </form>

            {/* Divider and Google Sign-In */}
            <div className="text-center mt-3">
              <div className="my-2 flex items-center justify-center">
                <hr className="w-1/4 border-gray-300" />
                <span className="px-2 text-gray-500">or</span>
                <hr className="w-1/4 border-gray-300" />
              </div>
              <button
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                onClick={handleGoogle}
              >
                <FcGoogle className="text-lg" /> Continue with Google
              </button>
            </div>

            {/* Login Link */}
            <p className="text-center text-xs text-gray-600 mt-2">
              Already have an account?{" "}
              <Link to="/auth/signin" className="text-orange-500 hover:underline">
                Login
              </Link>
            </p>
          </div>

          {/* Right Abstract Section with Toggle */}
          <div className="w-2/5 relative flex flex-col justify-center items-center">
            <img
              src={rightabstract}
              alt="Abstract background"
              className="w-full h-auto object-cover rounded-lg"
            />

            {/* Toggle Switch */}
            <div className="absolute top-4 left-4 py-4">
              <div className="relative flex items-center border border-black rounded-sm overflow-hidden bg-white w-48">
                {/* Sliding background */}
                <div
                  className={`absolute h-full w-1/2 bg-black transition-transform duration-300 ease-in-out ${
                    credentials.userType.value === "organization"
                      ? "translate-x-0"
                      : "translate-x-full"
                  }`}
                ></div>
                
                {/* Toggle buttons */}
                <div className="relative flex w-full">
                  <button
                    className={`flex-1 px-4 py-2 text-xs font-medium focus:outline-none z-10 transition-colors duration-300 ${
                      credentials.userType.value === "organization"
                        ? "text-white bg-black"
                        : "text-black bg-white"
                    }`}
                    onClick={() =>
                      setCredentials({
                        ...credentials,
                        userType: authTypeOptions[0], // Assuming authTypeOptions[0] is "organization"
                        email: "",
                        password: "",
                        name: "",
                      })
                    }
                  >
                    Organization
                  </button>
                  <button
                    className={`flex-1 px-4 py-2 text-xs font-medium focus:outline-none z-10 transition-colors duration-300 ${
                      credentials.userType.value === "individual"
                        ? "text-white bg-black"
                        : "text-black bg-white"
                    }`}
                    onClick={() =>
                      setCredentials({
                        ...credentials,
                        userType: authTypeOptions[1], // Assuming authTypeOptions[1] is "individual"
                        email: "",
                        password: "",
                        name: "",
                      })
                    }
                  >
                    Individual
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;