import React, { useEffect, useState } from 'react';

function SuppliesList() {
  const [supplies, setSupplies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/getSupplies') 
      .then((response) => response.json())
      .then((data) => setSupplies(data))
      .catch((error) => console.error('Error fetching supplies:', error));
  }, []);

  return (
    <div>
      <h2>Supplies List</h2>
      <ul>
        {supplies.map((supply) => (
          <li key={supply.id}>
            Name: {supply.name}, Type: {supply.type}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SuppliesList;