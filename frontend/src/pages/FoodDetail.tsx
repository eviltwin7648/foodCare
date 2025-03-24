// FoodDetails.tsx
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Calendar, MapPin, Package, Clock, User, AlertCircle, Phone } from "lucide-react";

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
  donarName: string;
  donarContact: string;
};

export default function FoodDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleClaim = async () => {
    const role = localStorage.getItem("role");
    if (role !== "Receiver") {
      setError("You must be a receiver to claim food");
      return;
    }
    
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/api/food-listings/${id}/claim",
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.error) {
        setError(response.data.error);
      } else {
        console.log(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      setError("Failed to claim food");
    }
  };

  const [foodDetails, setFoodDetails] = useState<FoodDetailsProps>();
  
  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          import.meta.env.VITE_API_URL + `/api/food-listings/${id}`
        );
        setFoodDetails(response.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load food details");
      } finally {
        setIsLoading(false);
      }
    };
    fetchFoodDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FE724C]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-xl text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  if (!foodDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-xl text-gray-700">No food details found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto overflow-hidden">
        {/* Header Section */}
        <div className="bg-[#FE724C] p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">{foodDetails.title}</h1>
          <p className="text-white/90">{foodDetails.description}</p>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Package className="h-5 w-5 text-[#FE724C]" />
                <div>
                  <p className="text-sm text-gray-500">Quantity</p>
                  <p className="font-semibold">{foodDetails.quantity} servings</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-[#FE724C]" />
                <div>
                  <p className="text-sm text-gray-500">Pickup Location</p>
                  <p className="font-semibold">{foodDetails.pickupAddress}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-[#FE724C]" />
                <div>
                  <p className="text-sm text-gray-500">Expires On</p>
                  <p className="font-semibold">
                    {new Date(foodDetails.expirationDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-[#FE724C]" />
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <Badge
                    variant={foodDetails.status === "AVAILABLE" ? "default" : "destructive"}
                    className="font-medium"
                  >
                    {foodDetails.status}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-[#FE724C]" />
                <div>
                  <p className="text-sm text-gray-500">Donor Name</p>
                  <p className="font-semibold">{foodDetails.donarName}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-[#FE724C]" />
                <div>
                  <p className="text-sm text-gray-500">Contact Number</p>
                  <p className="font-semibold">{foodDetails.donarContact}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-8">
            <Button
              onClick={handleClaim}
              className="w-full bg-[#FE724C] hover:bg-[#e6623d] text-white"
              size="lg"
            >
              Claim this Food
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
