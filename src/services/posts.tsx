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


export interface IPostResponse {
  posts: Post[]
  totalPages: number
}

export interface Post {
  id: number
  title: string
  description: string
  location: Location
  createdDate: string
  closedDate: any
  category: {
    id: number
    name: string
  }
  images: {
    imageLink:string,
    postId: number
  }[]
}

export interface Location {
  x: number
  y: number
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
    ...(category === 'all' ? {} : { category } ),
    ...(text && { text }),
    ...(page && { page }),
    ...(postQty && { postQty }),
    ...(sortPost && { sortPost }),
  }).toString();

  const url = `${API_URL}/user/getPosts?${queryParams}`;

  const response = await axios.get<IPostResponse>(url);

  return response.data;



};


export const getPostsCategories = async () => {
  const url = `${API_URL}/get-categories`;
  const response = await axios.get(url);
  return response.data;
}