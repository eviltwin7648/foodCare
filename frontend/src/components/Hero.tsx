import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Heart, Share2 } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-[600px] flex items-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1740&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Share Food,{" "}
            <span className="text-[#FE724C]">Share Hope</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8">
            Join our community of food donors and help make a difference in someone's life
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-[#FE724C] hover:bg-[#e6623d] text-white"
              onClick={() => navigate("/createlisting")}
            >
              <Heart className="mr-2" />
              Donate Food
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 bg-gray border-white text-white hover:bg-white/10 hover:text-white transition-colors duration-200"
              onClick={() => navigate("/register/receiver")}
            >
              <Share2 className="mr-2" />
              Receive Food
            </Button>
          </div>
          <div className="mt-8 flex items-center gap-8 text-white/80">
            <div>
              <p className="text-2xl font-bold">1000+</p>
              <p className="text-sm">Meals Donated</p>
            </div>
            <div>
              <p className="text-2xl font-bold">500+</p>
              <p className="text-sm">Active Donors</p>
            </div>
            <div>
              <p className="text-2xl font-bold">50+</p>
              <p className="text-sm">Cities Covered</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
