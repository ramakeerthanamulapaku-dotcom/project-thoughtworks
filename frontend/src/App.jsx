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