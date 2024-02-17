import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SocialLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { googleLogin } = useContext(AuthContext);
  const handleSocialLogin = (media) => {
    media()
      .then(() => {
        toast("User logged in success");
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <>
      <div className="divider max-w-2xl mx-auto italic">continue with</div>
      <div className="flex justify-around">
        <button onClick={() => handleSocialLogin(googleLogin)} className="btn ">
          <FcGoogle className="text-2xl"></FcGoogle>
        </button>
      </div>
    </>
  );
};

export default SocialLogin;
