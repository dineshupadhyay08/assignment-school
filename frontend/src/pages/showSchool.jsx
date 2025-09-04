import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:5000";

function SchoolList() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/schools`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSchools(data.data);
        }
      })
      .catch((err) => console.error("Error fetching schools:", err));
  }, []);


  const handleDeleteAll = async () => {
  if (!window.confirm("Are you sure you want to delete ALL schools?")) return;

  try {
    const res = await fetch(`${API_BASE_URL}/api/schools`, { method: "DELETE" });
    const result = await res.json();
    if (result.success) {
      alert("All schools deleted!");
      setSchools([]); // frontend state clear
    } else {
      alert("Failed to delete schools");
    }
  } catch (err) {
    console.error(err);
    alert("Error deleting schools");
  }
};


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {schools.map((s) => (
        <div
          key={s.id}
          className="max-w-xs rounded-2xl shadow-lg border border-white bg-white overflow-hidden relative"
        >
          {/* School Image */}
          <img
            src={
              s.image
                ? `${API_BASE_URL}/uploads/schoolImages/${s.image}`
                : "https://via.placeholder.com/400x250?text=No+Image"
            }
            alt={s.name}
            className="w-full h-44 object-cover transform transition duration-300 hover:scale-110"
            loading="lazy"
          />

          {/* + Button */}
          <button className="absolute top-3 right-3 bg-white rounded-full shadow-md p-2 hover:bg-gray-100">
            <span className="text-pink-500 text-xl font-bold">+</span>
          </button>

          {/* Card Content */}
          <div className="p-4 space-y-2">
            {/* Rating + Board */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex space-x-1 text-yellow-500">
                {"★".repeat(4)} <span className="text-gray-300">★</span>
              </div>
              <span className="text-blue-600 font-semibold">
                {s.board || "CBSE"}
              </span>
            </div>

            {/* City */}
            <span className="text-blue-500 text-sm">{s.city}</span>

            {/* School Name */}
            <h3 className="font-bold text-lg">{s.name}</h3>

            {/* Address */}
            <p className="text-gray-500">{s.address}</p>

            {/* Email */}
            <p className="text-gray-400 text-sm">{s.email_id}</p>
          </div>

          {/* Button */}
          <div className="p-4 pt-0">
            <button className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600">
              Apply Now 
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SchoolList;
