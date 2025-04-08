import {
  initializeLocalStorage,
  getPosts as getLocalPosts,
  getUserPosts as getLocalUserPosts,
  getPostsCategories as getLocalCategories,
  createPost as createLocalPost,
  saveImageLink as saveLocalImageLink,
} from "@/utils/localStorage";

// Don't initialize here to prevent multiple initializations
// initializeLocalStorage() is now called in components

export interface IPostRequest {
  latitude?: string;
  longitude?: string;
  locationRange?: string;
  category?: string;
  text?: string;
  page?: string;
  postQty?: string;
  sortPost?: string;
}

export interface IPostResponse {
  posts: Post[];
  totalPages: number;
}

export interface Post {
  id: number;
  title: string;
  description: string;
  location: Location;
  createdDate: string;
  closedDate: any;
  category: {
    id: number;
    name: string;
  };
  images: {
    imageLink: string;
    postId: number;
  }[];
  userId?: number;
}

export interface Location {
  x: number;
  y: number;
}

export const getPosts = async ({
  text = "",
  category = "",
  latitude = "",
  longitude = "",
  locationRange = "",
  page = "1",
  postQty = "10",
  sortPost = "createdDate",
}: IPostRequest = {}) => {
  // Get posts from localStorage
  return getLocalPosts({
    text,
    category,
    latitude,
    longitude,
    locationRange,
    page,
    postQty,
    sortPost,
  });
};

export const getUserPosts = async () => {
  // Get current user ID from token
  const token = localStorage.getItem("token");
  if (!token) return { posts: [], totalPages: 0 };

  try {
    // Extract user ID from token
    const decodedToken = atob(token);
    const userId = parseInt(decodedToken.split(":")[0]);

    // Get user posts from localStorage
    const posts = getLocalUserPosts(userId);
    return posts;
  } catch (error) {
    console.error("Error getting user posts", error);
    return { posts: [], totalPages: 0 };
  }
};

export const getPostsCategories = async () => {
  // Get categories from localStorage
  return getLocalCategories();
};

interface CreatePost {
  title: string;
  description?: string;
  category: { id: number };
  latitude?: string;
  longitude?: string;
  locationRange?: string;
}

export const createPost = async (data: CreatePost) => {
  // Get current user ID from token
  const token = localStorage.getItem("token");
  if (!token) return { status: 401, data: { error: "Unauthorized" } };

  try {
    // Extract user ID from token
    const decodedToken = atob(token);
    const userId = parseInt(decodedToken.split(":")[0]);

    // Create post in localStorage
    return createLocalPost({ ...data, userId });
  } catch (error) {
    console.error("Error creating post", error);
    return { status: 500, data: { error: "An error occurred" } };
  }
};

export const saveImageLink = async (id: number, link: string) => {
  // Save image link in localStorage
  return saveLocalImageLink(id, link);
};
