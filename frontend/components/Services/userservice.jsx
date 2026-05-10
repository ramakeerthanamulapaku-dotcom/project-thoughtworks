import API from "./api";

export const getUsers = () => API.get("/users");

export const createUser = (data) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("image", data.image);

  return API.post("/users", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
