import { BrowserRouter, Routes, Route } from "react-router-dom";

import UploadMarksheet from "../pages/UploadMarksheet";
import AIExtraction from "../pages/AIExtraction";

function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/upload"
          element={<UploadMarksheet />}
        />

        <Route
          path="/ai-extraction"
          element={<AIExtraction />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;