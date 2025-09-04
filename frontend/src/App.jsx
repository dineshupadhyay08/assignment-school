import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AddSchool from "./pages/addSchool";
import ShowSchools from "./pages/showSchool";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/show-schools" replace />} />
        <Route path="/add-school" element={<AddSchool />} />
        <Route path="/show-schools" element={<ShowSchools />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
