import DrinksList from "../components/AllDrinks";
import SupplyList from "../components/SupplyList";

function Home() {
  return (
    <div>
      <h1>My Home Bar</h1>
      <DrinksList />
      <hr/>
      <SupplyList />
    </div>
  );
}

export default Home;
