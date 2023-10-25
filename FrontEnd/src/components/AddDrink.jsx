import React, { useState } from 'react';

function AddDrink() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [glassType, setGlassType] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [ingredientsList, setIngredientsList] = useState([]);

  const handleAddIngredient = () => {
    if (ingredient) {
      setIngredientsList([...ingredientsList, ingredient]);
      setIngredient(''); // Clear the input field
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const drinkData = {
      name,
      description,
      instructions,
      glass_type: glassType,
      image_url: imageUrl,
      ingredients: ingredientsList,
    };

    // Send a POST request to your API route to add the drink
    try {
      const response = await fetch('/api/addDrink', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(drinkData),
      });

      if (response.ok) {
        console.log('Drink added successfully!');
        // Optionally, clear the form fields after successful submission
        setName('');
        setDescription('');
        setInstructions('');
        setGlassType('');
        setImageUrl('');
        setIngredientsList([]);
      } else {
        console.error('Error adding the drink. Please try again.');
      }
    } catch (error) {
      console.error('Error adding the drink:', error);
    }
  };

  return (
    <div>
      <h2>Add a Drink</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <label>
          Instructions:
          <input type="text" value={instructions} onChange={(e) => setInstructions(e.target.value)} />
        </label>
        <br />
        <label>
          Glass Type:
          <input type="text" value={glassType} onChange={(e) => setGlassType(e.target.value)} />
        </label>
        <br />
        <label>
          Image URL:
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </label>
        <br />
        <label>
          Ingredients:
          <input type="text" value={ingredient} onChange={(e) => setIngredient(e.target.value)} />
          <button type="button" onClick={handleAddIngredient}>
            Add Ingredient
          </button>
        </label>
        <div className="ingredients">
          <ul>
            {ingredientsList.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <br />
        <button type="submit">Add Drink</button>
      </form>
    </div>
  );
}

export default AddDrink;
