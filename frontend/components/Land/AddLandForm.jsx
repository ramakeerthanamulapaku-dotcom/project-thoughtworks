import { useState } from "react";
import { useDispatch } from "react-redux";
import { addLand } from "../../redux/thunks/landThunk";

const AddLandForm = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    location: "",
    image: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addLand(form));
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>Add Land</h3>

      <input
        placeholder="Land Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Location"
        onChange={(e) => setForm({ ...form, location: e.target.value })}
      />

      <input
        type="file"
        onChange={(e) =>
          setForm({ ...form, image: e.target.files[0] })
        }
      />

      <button type="submit">Add Land</button>
    </form>
  );
};

export default AddLandForm;