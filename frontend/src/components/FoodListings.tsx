import axios from "axios";
import { useEffect, useState } from "react";
import FoodCard from "./FoodCard";



const FoodListings = () => {
  const [foodListings, setFoodListings] = useState([]);
  useEffect(() => {
    const fetchFoodListings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/food-listings"
        );
        setFoodListings(response.data);
        console.log("data", response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFoodListings();
  }, [])

  return (
    <div className="flex">
      {foodListings.map((foodListing) => (
        <FoodCard
          imgurl={foodListing.image}
          title={foodListing.title}
          description={foodListing.description}
          quantity={foodListing.quantity}
          city={foodListing.pickupAddress}
          id={foodListing.id}
        />
      ))}
    </div>
  );
};

export default FoodListings;
