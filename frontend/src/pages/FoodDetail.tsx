// FoodDetails.tsx
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

type FoodDetailsProps = {
  title: string;
  description: string;
  quantity: number;
  pickupAddress: string;
  longitude: number;
  latitude: number;
  expirationDate: Date;
  status: string;
  donarId: string;
};

export default function FoodDetails() {
  const {id} = useParams();

const token = localStorage.getItem("token");
  const handleClaim = async () => {
    const role = localStorage.getItem("role");
    if (role !== "NGO" && role !== "INDIVIDUAL") {
      return alert("You must be a receiver to claim food");
    }
    
    try {
      const response = await axios.post(`http://localhost:5000/api/food-listings/${id}/claim`,{},{
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      alert("Food claimed successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to claim food");
    }
  }
  

  const [foodDetails, setfoodDetails] = useState<FoodDetailsProps>()
  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/food-listings/${id}`
        );
        setfoodDetails(response.data);
        console.log("data", response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFoodDetails();
  }, []);
 
  if (!foodDetails) return <div>
    No food details found
  </div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{foodDetails.title}</h1>
      <p className="text-gray-600 mb-2">{foodDetails.description}</p>

      <div className="border-t border-gray-200 pt-4 mt-4">
        <div className="mb-2">
          <span className="font-semibold">Quantity:</span> {foodDetails.quantity}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Pickup Address:</span> {foodDetails.pickupAddress}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Coordinates:</span> {foodDetails.latitude},{" "}
          {foodDetails.longitude}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Expiration Date:</span>
          {/* {foodDetails.expirationDate.toLocaleDateString()} */}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Status:</span>{" "}
          <span
            className={`${
              status === "AVAILABLE" ? "text-green-600" : "text-red-600"
            } font-medium`}
          >
            {status}
          </span>
        </div>
        <div className="mb-2">
          <span className="font-semibold">Donor ID:</span> {foodDetails.donarId}
        </div>
      </div>

      <button onClick={handleClaim} className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
        Claim this Food
      </button>
    </div>
  );
}
