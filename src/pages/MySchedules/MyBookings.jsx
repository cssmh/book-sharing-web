import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import axios from "axios";
import MyBookingCard from "./MyBookingCard";
import { FallingLines } from "react-loader-spinner";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  const url = `https://book-sharing-server.vercel.app/bookings?email=${user.email}`;
  useEffect(() => {
    axios
      .get(url, { withCredentials: true })
      .then((res) => setBookings(res.data))
  }, [url]);
  // console.log(bookings);
  // My Booking page

  return (
    <div>
      <h2 className="text-center text-2xl my-10 font-semibold italic">
        All Bookings made by you
      </h2>
      {bookings.length == 0 ? (
        <p className="text-center text-2xl font-semibold italic">No Booked</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-3">
          {bookings.map((booking) => (
            <MyBookingCard key={booking._id} booking={booking}></MyBookingCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
