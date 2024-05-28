import swal from "sweetalert";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Shared/useCustomHook/useAxiosSecure";

const DeleteAllBookings = ({ refetch }) => {
  const axiosSecure = useAxiosSecure();
  const handleDeleteAllBookings = () => {
    swal({
      title: "Are you sure?",
      text: "You're deleting all bookings",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axiosSecure
          .delete("/all-bookings")
          .then((res) => {
            if (res.data.deletedCount > 0) {
              swal("all bookings are deleted!", {
                icon: "success",
              });
              refetch();
            } else {
              swal("no bookings available");
            }
          })
          .catch((err) => toast.error(err));
      }
    });
  };

  return (
    <div>
      <button
        onClick={handleDeleteAllBookings}
        className="bg-green-500 px-3 py-[6px] rounded-md text-white"
      >
        Delete All Bookings
      </button>
    </div>
  );
};

export default DeleteAllBookings;
