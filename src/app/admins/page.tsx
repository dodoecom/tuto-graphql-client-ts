import { gql } from "@apollo/client";
import client from "../lib/apolloClient";

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      age
    }
  }
`;

export default async function Admins() {
  const { data } = await client.query({ query: GET_USERS });

  return (
    <div>
      <h1>Admins List</h1>
      <ul>
        {data.users.map((user: { id: string; name: string; age: number }) => (
          <li key={user.id}>
            {user.name} - {user.age}
          </li>
        ))}
      </ul>
    </div>
  );
}
