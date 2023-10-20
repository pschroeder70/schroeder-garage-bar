import React, { useState } from 'react';
import SupplyList from '../components/SupplyList.jsx';

function AddSupply() {
  const [name, setName] = useState('');
  const [type, setType] = useState('Spirit');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object to send to the server
    const newSupply = { name, type };

    // Send the data to your server for saving to the database
    try {
      const response = await fetch('http://localhost:5000/api/addSupply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSupply),
      });

      if (response.ok) {
        // Handle success, e.g., clear form or show a success message
        setName('');
        setType('Spirit');
      } else {
        // Handle errors
        console.error('Error adding supply to the database');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
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
            <option value="Syrup">Syrup</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <br />
        <button type="submit">Add Supply</button>
      </form>
      <SupplyList />
    </div>
  );
}

export default AddSupply
