import axios from "axios";

const API_URL = "http://localhost:5000";



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
    latitude,
    longitude,
    locationRange,
    category,
    text,
    page="1",
    postQty="10",
    sortPost="createdDate"
}:IPostRequest

) => {
  const response = await axios.get(
    `${API_URL}/user/getPosts?latitude=${latitude}&longitude=${longitude}&locationRange=${locationRange}&
    category=${category}&text=${text}&page=${page}&postQty=${postQty}&sortPost=${sortPost}`
  );
  return response.data;
};
