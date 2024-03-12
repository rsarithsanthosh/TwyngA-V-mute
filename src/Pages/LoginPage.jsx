import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
//   const [userLoginInputs, setUserLoginInputs] = useState({
//     userName: "",
//   });
//   const [error, setError] = useState("");

//   //Handle Login Form change events
//   const handleChange = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setUserLoginInputs((values) => ({ ...values, [name]: value }));
//     console.log(userLoginInputs);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     console.log("Login-Page UserInputs :", userLoginInputs);
//   };

const [hostName, setHostName] = useState('');
const navigate = useNavigate();

const handleLogin = () => {
  // Implement your login logic here
 console.log(`${hostName} created a room `);
 navigate(`meeting-page/${hostName}`)
 
};
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
    <div className="bg-white p-8 rounded shadow-md w-96">
      <h2 className="text-2xl font-bold mb-4">Create a Meeting</h2>
      <div className="mb-4">
        <input
          type="text"
          id="hostName"
          name="hostName"
          value={hostName}
          onChange={(e) => setHostName(e.target.value)}
          placeholder="Host Name"
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleLogin}>
        Create
      </button>
    </div>
  </div>
  );
}
