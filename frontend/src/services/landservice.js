import API from "./api";

// GET lands
export const getLands = () => API.get("/lands");

// CREATE land with image
export const createLand = (data) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("location", data.location);
  formData.append("image", data.image); // 👈 file

  return API.post("/lands", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};