import { useEffect, useState } from "react";
import noBooks from "../../../assets/noBooks.png";
import { Link, useLoaderData } from "react-router-dom";
import AdminBookingCard from "../AdminBookingCard/AdminBookingCard";
import swal from "sweetalert";
import axios from "axios";
import useAxiosHook from "../../../useCustomHook/useAxiosHook";
import { HashLoader } from "react-spinners";
import useContextHook from "../../../useCustomHook/useContextHook";

const AdminBooking = () => {
  const { user } = useContextHook();
  const { result } = useLoaderData();
  const [adminBookings, setAdminBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const axiosCustom = useAxiosHook();
  const [allBooks, setAllBooks] = useState([]);

  const url = `/allBookings?email=${user?.email}`;
  useEffect(() => {
    axiosCustom?.get(url)?.then((res) => {
      setAdminBookings(res.data);
      setIsLoading(false);
    });
  }, [axiosCustom, url]);

  const handleDeleteAllBookings = () => {
    swal({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // main code
        axios.delete("https://book-sharing-server.vercel.app/allBookings").then((res) => {
          if (res.data.acknowledged) {
            setAdminBookings([]);
            swal("All Bookings Deleted!", {
              icon: "success",
            });
          }
        });
      } else {
        swal("All Bookings is safe!");
      }
    });
  };

  useEffect(() => {
    axios
      .get("https://book-sharing-server.vercel.app/allBooks")
      .then((res) => setAllBooks(res.data?.result));
  }, []);

  // finding total book provider
  const emails = allBooks?.map((book) => book.book_provider_email);
  const filterUniqueEmails = (emails) => {
    const uniqueEmails = [];
    const seen = new Set();

    emails?.forEach((email) => {
      if (!seen.has(email)) {
        uniqueEmails.push(email);
        seen.add(email);
      }
    });

    return uniqueEmails;
  };

  const uniqueEmails = filterUniqueEmails(emails);
  console.log(uniqueEmails);
  // finding total book provider end

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center mt-5">
          <HashLoader color="#FB0F5A" size={36} />
        </div>
      ) : (
        <>
          <p className="text-center text-lg lg:text-2xl my-4">
            Total{" "}
            <Link className="text-green-500" to={"/all-books"}>
              {result?.length}{" "}
            </Link>
            Books, Total {uniqueEmails?.length} Book Providers and Total{" "}
            {adminBookings?.length} Bookings
          </p>
          <div className="max-w-[1180px] mx-2 lg:mx-auto grid grid-cols-3 py-3 text-center border border-green-400 rounded-lg mb-3">
            {uniqueEmails?.map((provider, idx) => (
              <p key={idx}>{provider}</p>
            ))}
          </div>
          {adminBookings.length == 0 ? (
            <img src={noBooks} className="mx-auto" alt="" />
          ) : (
            <div className="space-y-5">
              {adminBookings.map((booking) => (
                <AdminBookingCard
                  key={booking._id}
                  getAllBooking={booking}
                  adminBookings={adminBookings}
                  setAdminBookings={setAdminBookings}
                ></AdminBookingCard>
              ))}
              <div className="flex justify-center">
                <button
                  onClick={handleDeleteAllBookings}
                  className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Delete all Bookings
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminBooking;
