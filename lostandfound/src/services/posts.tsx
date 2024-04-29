import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || 'https://lost-found-api-d361.onrender.com';
//const API_URL = "http://localhost:3000";



interface IPostRequest {
    latitude?: string,
    longitude?: string,
    locationRange?: string,
    category?: string,
    text?: string,
    page?: string,
    postQty?: string,
    sortPost?: string
}

export const getPosts = async ({
  text,
  category,
  latitude,
  longitude,
  locationRange,
  page,
  postQty,
  sortPost
}: IPostRequest = {}) => {

  const queryParams = new URLSearchParams({
    ...(latitude && { latitude }),
    ...(longitude && { longitude }),
    ...(locationRange && { locationRange }),
    ...(category && { category }),
    ...(text && { text }),
    ...(page && { page }),
    ...(postQty && { postQty }),
    ...(sortPost && { sortPost }),
  }).toString();

  const url = `${API_URL}/user/getPosts?${queryParams}`;

  const response = await axios.get(url);
  return response.data;
};
