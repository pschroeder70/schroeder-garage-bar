import React, { useState, useEffect } from "react";

function DrinksWeCanMake() {
  const [drinks, setDrinks] = useState([]);

  // Other state variables you may need
  // ...

  useEffect(() => {
    // Fetch drinks that can be made with supplies and update the state
    // ...

  }, []);
  return (
    <div>
      {/* Display the list of drinks that can be made */}
      {/* You can map through 'drinks' state and render each drink */}
    </div>
  );
}

export default DrinksWeCanMake;
