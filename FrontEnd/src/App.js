import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./sass/main.scss";
import NavBarHeader from "./components/NavBarHeader.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/home.jsx";
import AddRecipe from "./pages/add-recipe.jsx";
import AddSupply from "./pages/add-supply.jsx";

const App = () => {
  return (
    <>
      <Router>
      <NavBarHeader />
          <Routes>
            <Route path='/*' element={<Home />} />
            <Route path='/AddRecipe' element={<AddRecipe />} />
            <Route path='/AddSupply' element={<AddSupply />} />
          </Routes>
          <h1>Testing</h1>
        <Footer />
      </Router>
    </>
  );
};

export default App;