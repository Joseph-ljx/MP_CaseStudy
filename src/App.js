/**
 * The Main App page for router
 * @author Joseph Liao
 */

import { Route, Routes } from "react-router-dom";
import Input from "./components/Input";
import Wel from "./components/Wel";

/**
 * Register the router paths for different pages
 * @returns pages
 */

function App() {
  return (
    <Routes>
      <Route path="/" element={<Input />} />
      <Route path="success" element={<Wel />} />
    </Routes>
  );
}

export default App;
