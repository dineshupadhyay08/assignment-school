import { useForm } from "react-hook-form";
import { useState } from "react";

const API_BASE_URL = "http://localhost:5000";

function AddSchool() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("contact", data.contact);
      formData.append("email_id", data.email_id);
      formData.append("image", data.image[0]); // file input

     const res = await fetch(`${API_BASE_URL}/api/schools`, {   // instead of /api/addSchool
        method: "POST",
        body: formData,
        
}
);

      const result = await res.json();

      if (result.success) {
        alert("School added successfully!");
        reset(); // clear form
      } else {
        alert("Failed to add school!");
      }
    } catch (error) {
      console.error(error);
      alert("Error uploading school data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add New School</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="School Name"
          {...register("name", { required: true })}
          className="border p-2 rounded"
        />
        {errors.name && <span className="text-red-500 text-sm">Name is required</span>}

        <input
          type="text"
          placeholder="Address"
          {...register("address", { required: true })}
          className="border p-2 rounded"
        />
        {errors.address && <span className="text-red-500 text-sm">Address is required</span>}

        <input
          type="text"
          placeholder="City"
          {...register("city", { required: true })}
          className="border p-2 rounded"
        />
        {errors.city && <span className="text-red-500 text-sm">City is required</span>}

        <input
          type="text"
          placeholder="State"
          {...register("state", { required: true })}
          className="border p-2 rounded"
        />
        {errors.state && <span className="text-red-500 text-sm">State is required</span>}

        <input
          type="number"
          placeholder="Contact Number"
          {...register("contact", { required: true })}
          className="border p-2 rounded"
        />
        {errors.contact && <span className="text-red-500 text-sm">Contact is required</span>}

        <input
          type="email"
          placeholder="Email ID"
          {...register("email_id", { required: true })}
          className="border p-2 rounded"
        />
        {errors.email_id && <span className="text-red-500 text-sm">Email is required</span>}

        <input
          type="file"
          {...register("image", { required: true })}
          className="border p-2 rounded"
        />
        {errors.image && <span className="text-red-500 text-sm">Image is required</span>}

        <button
          type="submit"
          className={`bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Add School"}
        </button>
      </form>
    </div>
  );
}

export default AddSchool;
