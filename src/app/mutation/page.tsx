"use client"; // Required for hooks like `useMutation`

import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const ADD_USER = gql`
  mutation AddUser($name: String!, $age: Int!) {
    addUser(name: $name, age: $age) {
      id
      name
      age
    }
  }
`;

export default function CreateUser() {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(0);

  const [addUser, { data, loading, error }] = useMutation(ADD_USER);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addUser({ variables: { name, age } });
  };

  return (
    <div>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Full Name"
            className="border border-gray-300 rounded-lg px-2 py-1 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Age"
            className="border border-gray-300 rounded-lg px-2 py-1 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value))}
          />
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-500 text-white font-medium px-2 py-1 rounded-lg hover:bg-blue-600 transition"
          >
            {loading ? "Adding..." : "Add User"}
          </button>
        </div>
      </form>
      {error && <p>Error: {error.message}</p>}
      {data && <p>User {data.addUser.name} added successfully!</p>}
    </div>
  );
}
