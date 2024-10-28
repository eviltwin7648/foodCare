import { useNavigate } from "react-router";
import logo from "../assets/logo.png";

export default function Navbar() {
    const navigate = useNavigate();
    if (localStorage.getItem("token")) {
      return (
        <div className="flex felx-row justify-between p-4 ">
          <div>
            <img
              onClick={() => navigate("/")}
              src={logo}
              alt="logo"
              className="cursor-pointer"
              width={50}
              height={50}
            />
          </div>
          <div className="flex flex-row gap-5 h- ">
            <button
              onClick={() => navigate("/profile")}
              className="bg-[#FE724C] text-white px-4 py-3 rounded-full hover:bg-[#e6623d]"
            >
              Profile
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
              className="bg-[#FE724C] text-white px-4 py-3 rounded-full hover:bg-[#e6623d]"
            >
              Logout
            </button>
          </div>
        </div>
      );
    }
  return (
    <div className="flex felx-row justify-between p-4 ">
      <div>
        <img
          onClick={() => navigate("/")}
          src={logo}
          alt="logo"
          className="cursor-pointer"
          width={50}
          height={50}
        />
      </div>
      <div className="flex flex-row gap-5 h- ">
        <button
          onClick={() => navigate("/login")}
          className="bg-[#FE724C] text-white px-4 py-3 rounded-full hover:bg-[#e6623d]"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/register/donar")}
          className="bg-[#FE724C] text-white px-4 py-3 rounded-full hover:bg-[#e6623d]"
        >
          Register as Donar
        </button>
        <button
          onClick={() => navigate("/register/receiver")}
          className="bg-[#FE724C] text-white px-4 py-3 rounded-full hover:bg-[#e6623d]"
        >
          Register as Receiver
        </button>
      </div>
    </div>
  );
}
