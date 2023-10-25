import React, { useState, useEffect } from "react";

import fpoImage from '../images/coming-soon.png';

function AllDrinks() {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    // Fetch all drinks from the API
    fetch("/api/displayDrinks")
      .then((response) => response.json())
      .then((data) => setDrinks(data))
      .catch((error) => console.error("Error fetching drinks:", error));
  }, []);

  function openDialog(drinkId) {
    const dialog = document.getElementById(`dialog-${drinkId}`);
    if (dialog) {
      dialog.showModal();
    }
  }

  function closeDialog(drinkId) {
    const closeIt = document.getElementById(`dialog-${drinkId}`);
    closeIt.close();
  }

  return (
    <div>
      <h2>All Drinks</h2>
      {drinks.map((drink) => (
        <div key={drink.drink_id} className="drink-wrapper">
          <h3
            data-drink={drink.drink_id}
            onClick={() => openDialog(drink.drink_id)}
          >
            {drink.name}
          </h3>
          <dialog className="drink__modal" id={`dialog-${drink.drink_id}`}>
            <div className="drink">
              <h3 className="drink__name">{drink.name}</h3>
              {drink.glass_type ? (
                <p className="drink__glass">Glass Type: {drink.glass_type}</p>
              ) : null}
              {drink.description ? (
                <div className="drink__disc">
                  
                  <p>Discription : {drink.description}</p>
                </div>
              ) : null}
              <div className="drink__image">
                {drink.image_url ? (
                  <img src={drink.image_url} alt={drink.name} />
                ) : (
                  <img src={fpoImage} alt='image coming soon' />
                )}
              </div>
              <div className="drink__ingredients">
                <p>Ingredients:</p>
                {Array.isArray(drink.ingredients) ? (
                  <ul>
                    {drink.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No ingredients available.</p>
                )}
              </div>

              <p className="drink__instructions">
                Instructions: {drink.instructions}
              </p>
              <button onClick={() => closeDialog(drink.drink_id)}>Close</button>
            </div>
          </dialog>
        </div>
      ))}
    </div>
  );
}

export default AllDrinks;
