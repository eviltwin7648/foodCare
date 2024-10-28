import FoodListings from "../components/FoodListings";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <>
      <Hero />

      <h1 className="text-2xl my-2">Available Food to be claimed</h1>
      <FoodListings />
    </>
  );
};

export default Home;
