type FoodCardProps = {
  id: string;
  title: string;
  description: string;
  city: string;
  quantity: number;
  imgurl: string;
};

export default function FoodCard({
  id,
  title,
  description,
  city,
  quantity,
  imgurl
}: FoodCardProps) {
  return (
    <div className="flex flex-col w-80 max-w-sm  p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="w-[300px] h-[300px] bg-gray-200 rounded-lg">
        <img
          src={imgurl}
          alt="food"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="text-left">
        <h2 className="text-2xl font-semibold mb-2">{title} </h2>
        <p className="text-gray-700 mb-2"> {description}</p>
        <div className="flex gap-4">
          <p className="text-gray-700 mb-2">
            <svg
              className="w-6 h-6 inline-block"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M10 13H14M19 9V20H5V9M19 9H5M19 9C19.5523 9 20 8.55228 20 8V5C20 4.44772 19.5523 4 19 4H5C4.44772 4 4 4.44772 4 5V8C4 8.55228 4.44772 9 5 9"
                  stroke="#000000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>{" "}
            {quantity} nos
          </p>
          <p className="text-gray-500 mb-4">📍{city}</p>{" "}
        </div>

        <a
          href={`http://localhost:5173/fooddetails/${id}`}
          className="text-blue-500 hover:text-blue-700 font-medium"
        >
          Learn more
        </a>
      </div>
    </div>
  );
}
