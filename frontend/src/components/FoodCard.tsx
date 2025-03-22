import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "./ui/card";
import { Button } from "./ui/button";
import { MapPin, Package } from "lucide-react";

// Array of dummy food images
const dummyFoodImages = [
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=60", // Healthy food bowl
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=60", // Various dishes
  "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=800&auto=format&fit=crop&q=60", // Fresh vegetables
  "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&auto=format&fit=crop&q=60", // Fresh fruits
  "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=800&auto=format&fit=crop&q=60", // Pizza
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=60", // Pasta
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=60", // Salad
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=60", // Various dishes
];

interface FoodCardProps {
  id: string;
  title: string;
  description: string;
  city: string;
  quantity: number;
  imgurl: string;
}

const FoodCard = ({
  id,
  title,
  description,
  city,
  quantity,
  imgurl,
}: FoodCardProps) => {
  const navigate = useNavigate();
  
  // Get a random dummy image based on the card's id
  const getRandomImage = () => {
    const index = parseInt(id) % dummyFoodImages.length;
    return dummyFoodImages[index];
  };

  return (
    <Card className="w-full max-w-sm overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imgurl || getRandomImage()}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
          {title}
        </h3>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-gray-600 line-clamp-2 mb-4">{description}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Package className="h-4 w-4" />
            <span>{quantity} items</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{city}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => navigate(`/fooddetails/${id}`)}
          variant="default"
          className="w-full bg-[#FE724C] hover:bg-[#fe724c]/90"
        >
          Learn More
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FoodCard;
