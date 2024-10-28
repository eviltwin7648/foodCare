import { useNavigate } from "react-router";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="relative bg-[url('https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center h-[500px] flex items-center ">
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      <div className="relative z-10 flex flex-col   gap-6 px-4">
        <h1 className="text-5xl text-white font-semibold">
          Experience the real <br /> taste of
          <span className="font-bold"> Best Dishes</span>
        </h1>
        <p className="text-3xl text-white">
          We provide free food for the needy
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/createlisting")}
            className="bg-white text-black border-2 border-black py-4 px-6 rounded-xl"
          >
            Donate Food
          </button>
          <button
            onClick={() => navigate("/register/receiver")}
            className="text-white border-2 border-white py-4 px-6 rounded-xl"
          >
            Receive Food
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
