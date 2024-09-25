import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import useAuth from "../../Hooks/useAuth";
import { TbFidgetSpinner } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import ResetPassModal from "../Modal/ResetPassModal";
import SocialLogin from "./SocialLogin";
import HavenHelmet from "../HavenHelmet";
import BG from "../../assets/login-background.avif";
import { saveUser } from "../../Api/auth";
import useAd from "../../Hooks/useAd";

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewPassword, setViewPassword] = useState(true);
  const [passwordEntered, setPasswordEntered] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, login, resetPassword, verifyEmail, logOut } = useAuth();
  const location = useLocation();
  const navigateTo = useNavigate();
  const admins = useAd();

  useEffect(() => {
    if (user?.emailVerified || admins.includes(user?.email)) {
      navigateTo("/");
    }
  }, [user?.emailVerified, admins, user?.email, navigateTo]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    try {
      const res = await login(email, password);
      toast.success("Logged in successfully");
      if (res.user) {
        if (res.user.emailVerified || admins.includes(email)) {
          navigateTo(location?.state || "/", { replace: true });
          await saveUser(res.user);
        } else {
          await verifyEmail();
          toast.success("We sent you a verification email");
          await logOut();
          toast.error("Verify your email first, please!");
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please provide a valid email address");
      return;
    }

    try {
      await resetPassword(email);
      toast.success("Reset email sent to your mail.");
      setIsOpen(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordEntered(e.target.value.length > 0);
  };

  const style = {
    backgroundImage: `url(${BG})`,
    backgroundSize: "cover",
    minHeight: "100vh",
  };

  return (
    <div style={style} className="min-h-screen flex bg-base-200">
      <HavenHelmet title="Login" />
      <div className="flex-1 flex items-center justify-center p-5 lg:p-12">
        <div className="border max-w-sm w-full p-8 rounded-lg shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-6">
            Sign in to your account
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-lg w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type={viewPassword ? "password" : "text"}
                required
                onChange={handlePasswordChange}
                className="appearance-none rounded-lg w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Password"
              />
              {passwordEntered && (
                <span
                  className="absolute top-[35px] right-3 text-gray-500 cursor-pointer"
                  onClick={() => setViewPassword(!viewPassword)}
                >
                  {viewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </span>
              )}
            </div>
            <div className="flex items-center justify-between mb-2">
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                Forgot your password?
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-400 flex items-center justify-center"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin text-xl" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="text-green-400 font-semibold">
                Sign Up
              </Link>
            </p>
          </div>
          <SocialLogin />
        </div>
      </div>
      <div className="hidden md:flex lg:w-1/2 bg-cover bg-center"></div>
      {isOpen && (
        <ResetPassModal
          closeModal={() => setIsOpen(false)}
          isOpen={isOpen}
          handleForgotPassword={handleForgotPassword}
        />
      )}
    </div>
  );
};

export default Login;
