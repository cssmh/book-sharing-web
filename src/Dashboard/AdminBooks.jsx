import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AdminBooksRow from "./AdminBooksRow";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useBookProviders from "../Hooks/useBookProviders";
import { Helmet } from "react-helmet-async";
import SmallLoader from "../Components/SmallLoader";
import { getAllBooks } from "../Api/books";

const AdminBooks = () => {
  const axiosSecure = useAxiosSecure();
  const { totalBooks, bookProviders } = useBookProviders();
  const [limit, setLimit] = useState(6);

  const {
    isFetching,
    data: allBooks,
    refetch,
  } = useQuery({
    queryKey: ["allBookings", limit],
    queryFn:  () => getAllBooks(undefined, limit),
    keepPreviousData: true, // Ensure old data is kept
  });

  const { data: allBookings, isLoading: bookingLoading } = useQuery({
    queryKey: ["allBookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-bookings");
      return res?.data;
    },
    keepPreviousData: true,
  });

  const handleShowMore = () => {
    if (allBooks?.totalBooks === limit) {
      setLimit(6);
    } else {
      setLimit((prevPage) => prevPage + 6);
    }
  };

  return (
    <div>
      <Helmet>
        <title>BookHaven | All Books</title>
      </Helmet>
      <h1 className="text-xl text-center font-bold mt-2 mb-3 mx-3 md:mx-0">
        Total {totalBooks || 0} Books, Total {bookProviders?.length || 0} Book
        Providers, and Total {allBookings?.length || 0} Bookings
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white divide-y divide-gray-200 border-b">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4 text-left text-sm">Book Image</th>
              <th className="py-2 px-4 text-left text-sm">Book Name</th>
              <th className="py-2 px-4 text-left text-sm">Provider Name</th>
              <th className="py-2 px-4 text-left text-sm">Location</th>
              <th className="py-2 px-4 text-left text-sm">Status</th>
              <th className="py-2 px-4 text-left text-sm">Details</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isFetching || bookingLoading ? (
              <tr>
                <td colSpan="6" className="py-4 text-center">
                  <SmallLoader />
                </td>
              </tr>
            ) : allBooks?.result?.length ? (
              allBooks.result.map((book) => (
                <AdminBooksRow
                  key={book._id}
                  getBooks={book}
                  refetch={refetch}
                />
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 text-center">
                  No books available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {allBooks?.totalBooks > 0 && (
          <div className="text-center mt-4">
            <button
              onClick={handleShowMore}
              className={`px-4 py-2 rounded-3xl text-white transform active:translate-y-0.5 transition-transform duration-150 ease-in-out ${
                allBooks?.totalBooks === limit ? "bg-blue-500" : "bg-green-500"
              }`}
            >
              {allBooks?.totalBooks === limit ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBooks;
