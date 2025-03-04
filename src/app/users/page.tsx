"use client";
import { useQuery, gql, useMutation } from "@apollo/client";
import CreateUser from "../mutation/page";

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      age
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export default function Users() {
  const { loading, error, data, refetch } = useQuery(GET_USERS);
  const [deleteUser] = useMutation(DELETE_USER);

  const handleDelete = async (id: string) => {
    await deleteUser({
      variables: { id },
      update(cache) {
        cache.modify({
          fields: {
            users(existingUsers = []) {
              return existingUsers.filter((user: { id: string }) => user.id !== id);
            },
          },
        });
      },
    });
    refetch(); // Re-fetch updated user list after deletion
  };

  // const handleDelete = async (id: string) => {
  //   await deleteUser({
  //     variables: { id },
  //     optimisticResponse: {
  //       deleteUser: {
  //         id,
  //         __typename: "User",
  //       },
  //     },
  //     update(cache) {
  //       cache.modify({
  //         fields: {
  //           users(existingUsers = []) {
  //             return existingUsers.filter((user: { id: string }) => parseInt(user.id) !== parseInt(id));
  //           },
  //         },
  //       });
  //     },
  //   });
  // };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4 space-y-4">
      <CreateUser />
      <hr />
      <div>
        <h1>Users List</h1>
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="text-left">ID</th>
              <th className="text-left">Name</th>
              <th className="text-left">Age</th>
              <th className="text-left"></th>
            </tr>
          </thead>
          <tbody>
            {data.users.map((user: { id: string; name: string; age: number }) => (
              <tr key={user.id} className="border border-gray-300 even:bg-gray-100">
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td className="w-[100px] text-center">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white font-medium px-2 py-1 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
