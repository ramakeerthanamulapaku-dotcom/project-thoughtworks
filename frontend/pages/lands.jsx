import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLands } from "../redux/thunks/landThunk";
import AddLandForm from "../components/Lands/AddLandForm";

const Lands = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.lands);

  useEffect(() => {
    dispatch(fetchLands());
  }, [dispatch]);

  return (
    <div className="container">
      <h2>Your Lands</h2>

      <AddLandForm />

      {list.map((land) => (
        <div key={land._id} className="card">
          <h3>{land.name}</h3>
          <p>{land.location}</p>

          {/* 👇 Display uploaded image */}
          <img
            src={`http://localhost:5000/${land.image}`}
            alt="land"
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />
        </div>
      ))}
    </div>
  );
};

export default Lands;