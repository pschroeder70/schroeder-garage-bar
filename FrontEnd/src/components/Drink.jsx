import React, { useState, useEffect } from "react";

function Drink({ drink }) {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    // Fetch all drinks from the API
    fetch('/api/displayDrinks')
      .then((response) => response.json())
      .then((data) => setDrinks(data))
      .catch((error) => console.error("Error fetching drinks:", error));
  }, []);

  return (
    <div>
      <h3>{drink.name}</h3>
      <p>{drink.description}</p>
      <p>Glass Type: {drink.glass_type}</p>
      <img src={drink.image_url} alt={drink.name} />
      <p>Instructions: {drink.instructions}</p>
      <p>Ingredients:</p>
      <ul>
        {drink.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
}

export default Drink;