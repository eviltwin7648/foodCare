import axios from "axios";
import { useEffect, useState } from "react";
import FoodCard from "./FoodCard";

interface FoodListing {
  id: string;
  image: string;
  title: string;
  description: string;
  quantity: number;
  pickupAddress: string;
}

const FoodListings = () => {
  const [foodListings, setFoodListings] = useState<FoodListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFoodListings = async () => {
      try {
        setLoading(true);
        const response = await axios.get<FoodListing[]>(
          "http://localhost:5000/api/food-listings"
        );
        setFoodListings(response.data);
        setError("");
      } catch (error) {
        console.error(error);
        setError("Failed to fetch food listings");
      } finally {
        setLoading(false);
      }
    };
    fetchFoodListings();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-500">Loading food listings...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Available Food</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {foodListings.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No food listings available at the moment.
          </div>
        ) : (
          foodListings.map((foodListing) => (
            <FoodCard
              key={foodListing.id}
              imgurl={foodListing.image}
              title={foodListing.title}
              description={foodListing.description}
              quantity={foodListing.quantity}
              city={foodListing.pickupAddress}
              id={foodListing.id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default FoodListings;
