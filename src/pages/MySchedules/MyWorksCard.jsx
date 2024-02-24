import axios from "axios";
import swal from "sweetalert";

const MyWorksCard = ({ work }) => {
  // console.log(work);
  const {
    _id,
    book_image,
    book_name,
    buyerPhone,
    instruction,
    status,
    date,
    user_email,
  } = work;

  const handleStatus = (event, _id) => {
    // console.log(event.target.value, _id);
    const newStatus = event.target.value;
    const updatedStatus = { newStatus };
    axios
      .put(
        `https://book-sharing-server.vercel.app/bookings/${_id}`,
        updatedStatus
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          swal("Good job!", "Status Updated", "success");
        }
      })
      .then((err) => console.log(err));
  };
  // My pending page card

  return (
    <div className="card bg-yellow-50 hover:border hover:border-blue-700 hover:bg-yellow-50 shadow-lg mx-2 md:mx-0">
      <figure className="px-10 pt-10">
        <img
          src={book_image}
          alt="no images available"
          className="rounded-xl h-72 md:h-64"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title font-bold text-blue-900">{book_name}</h2>
        <p className="text-lg font-bold">Collector Info: </p>
        <div>
          <p className="text-lg">Phone: {buyerPhone}</p>
          <p className="text-lg">
            Email: <span className="">{user_email}</span>
          </p>
          <p className="text-lg">Message: {instruction}</p>
        </div>
        <p className="text-lg font-bold ">
          Need Book by: <span className="text-green-500">{date}</span>
        </p>
        <select
          id="cars"
          name="book_name"
          defaultValue={status}
          onChange={() => handleStatus(event, _id)}
          className="input input-bordered"
        >
          <option value="pending">
            <button className="btn btn-primary">Pending</button>
          </option>
          <option value="progress">
            <button className="btn btn-primary">Progress</button>
          </option>
          <option value="completed">
            <button className="btn btn-primary">Completed</button>
          </option>
        </select>
      </div>
    </div>
  );
};

export default MyWorksCard;
