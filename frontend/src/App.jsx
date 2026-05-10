
import WorkerSimulator from "./worker/WorkerSimulator.jsx";
import WorkerMap from "./pages/WorkerMap.jsx";
import {io} from "socket.io-client";
function App() {
  return (
    <>
      <WorkerSimulator />
    </>
  );
}

import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Common/Navbar";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <AppRoutes />
    </>
  );
}

export default App;

