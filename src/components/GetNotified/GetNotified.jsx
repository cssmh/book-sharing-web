import swal from "sweetalert";
import Banner from "../../assets/Notification.jpg";
import toast from "react-hot-toast";

const BannerImg = {
  backgroundImage: `url(${Banner})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};

const emailCheck = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
const handleSubmitEmail = (e) => {
  e.preventDefault();
  const getEmail = e.target.email.value;
  if (!emailCheck.test(getEmail)) {
    return toast.error("Enter valid email!");
  }
  swal("Thank you", `We will update you via ${getEmail}`, "success");
};

const GetNotified = () => {
  return (
    <div
      data-aos="zoom-in"
      data-aos-duration="1000"
      className="text-white rounded-md"
      style={BannerImg}
    >
      <div className="container backdrop-blur-sm py-10">
        <div className="space-y-6 max-w-xl mx-auto">
          <h1
            className="text-2xl !text-center sm:text-left sm:text-4xl font-semibold"
          >
            Get Notified About New Books
          </h1>
          <form onSubmit={handleSubmitEmail}>
            <input
              data-aos="fade-up"
              data-aos-duration="1000"
              type="email"
              name="email"
              required
              placeholder="Enter Your Email Here"
              className="text-black rounded-lg w-4/5 mx-auto md:w-full border-green-500 block"
              style={{ outline: "none" }}
            />
            <div className="flex justify-center">
              <button
                data-aos="fade-up"
                data-aos-duration="1000"
                className="mt-3 px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-400 rounded-lg hover:bg-blue-400 focus:outline-none sm:mx-2"
              >
                Notify Me
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GetNotified;
