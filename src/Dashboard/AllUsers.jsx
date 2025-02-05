import UserDataRow from "./UserDataRow";
import SmallLoader from "../Components/SmallLoader";
import useDataQuery from "../Hooks/useDataQuery";
import HavenHelmet from "../Components/HavenHelmet";

const AllUsers = () => {
  const {
    data = [],
    isLoading,
    refetch,
  } = useDataQuery(["allUsers"], "/users");

  if (isLoading) return <SmallLoader size={84} />;

  return (
    <div className="bg-white shadow-lg rounded-lg px-4 py-3">
      <HavenHelmet title="All Users" />
      <h1 className="text-xl font-bold mb-4">All Users ({data?.length})</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-5 py-2 text-left text-xs font-medium uppercase tracking-wider">
                Name
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Email
              </th>
              <th className="px-5 py-2 text-left text-xs font-medium uppercase tracking-wider">
                Created & Last Login
              </th>
              <th className="px-7 py-2 text-left text-xs font-medium uppercase tracking-wider">
                Role
              </th>
              <th className="px-7 py-2 text-left text-xs font-medium uppercase tracking-wider">
                Delete
              </th>
              <th className="px-5 py-2 text-center text-xs font-medium uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.map((user) => (
              <UserDataRow key={user._id} user={user} refetch={refetch} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
