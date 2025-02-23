import { useState } from "react";
import axios from "axios";

export default function CreateFoodListingPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    quantity: 1,
    pickupAddress: "",
    longitude: 0,
    latitude: 0,
    expirationDate: "",
    donarId: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      // Make API call to create food listing
      console.log(formData);
      const response = await axios.post(
        "http://localhost:5000/api/food-listings",
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response);
      if (response.status === 200) {
        setMessage("Food listing created successfully!");
        // Reset the form
        setFormData({
          title: "",
          description: "",
          quantity: 1,
          pickupAddress: "",
          longitude: 0,
          latitude: 0,
          expirationDate: "",
          donarId: "",
        });
      }
    } catch (error) {
      setMessage("Error creating food listing. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Create Food Listing</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label>Title</label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded"
          required
        />
       {/* add a feature to add Image of the food */}
        <label>Message</label>
        <textarea
          name="description"
          placeholder="Message"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded"
          required
        />
        <label >Quantity</label>
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="w-full border rounded"
          required
        />
        <label >PickUp Adress</label>

        <input
          type="text"
          name="pickupAddress"
          placeholder="Pickup Address"
          value={formData.pickupAddress}
          onChange={handleChange}
          className="w-full border rounded"
          required
        />

       
        <label >Expiration Date</label>

        <input
          type="date"
          name="expirationDate"
          value={formData.expirationDate}
          onChange={handleChange}
          className="w-full  border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Listing"}
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
