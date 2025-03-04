"use client";
import { useQuery, gql } from "@apollo/client";
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

export default function Users() {
  const { loading, error, data } = useQuery(GET_USERS);

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
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {data.users.map((user: { id: string; name: string; age: number }) => (
              <tr key={user.id} className="border border-gray-300 even:bg-gray-100">
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
