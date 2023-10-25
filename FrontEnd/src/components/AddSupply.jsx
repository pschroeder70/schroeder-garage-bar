import React, { useState } from "react";

function AddSupply(props) {
  const [name, setName] = useState("");
  const [type, setType] = useState("Spirit");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create an object to send to the server
    const newSupply = { name, type };
  
    // Check if the supply already exists in the database
    try {
      const response = await fetch("/api/checkSupply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newSupply.name }),
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.exists) {
          setMessage(`${newSupply.name} already exists in the database.`);
        } else {
          // Continue with the API request if it's not a duplicate
          const addResponse = await fetch("/api/addSupply", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newSupply),
          });
  
          if (addResponse.ok) {
            setMessage(`${newSupply.name} has been added successfully.`);
            setName("");
            setType("Spirit");
          } else {
            // Handle errors
            setMessage(`Error adding supply to the database`);
          }
        }
      }
    } catch (error) {
      setMessage(error);
      console.error(error);
    }
  };
  

  return (
    <>
      <div className="message">{message}</div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Type:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Spirit">Spirit</option>
            <option value="Mixer">Mixer</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <br />
        <button type="submit">Add Supply</button>
      </form>
    </>
  );
}
export default AddSupply;
