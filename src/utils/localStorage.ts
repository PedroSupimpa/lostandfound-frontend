import {
  MockCategory,
  MockPost,
  MockUser,
  mockCategories,
  mockPosts,
  mockUsers,
} from "./mockData";

// Initialize localStorage with mock data if it doesn't exist
// Using a flag to prevent multiple initializations
let isInitialized = false;
export const initializeLocalStorage = (): void => {
  if (isInitialized) return;
  isInitialized = true;
  if (!localStorage.getItem("posts")) {
    localStorage.setItem("posts", JSON.stringify(mockPosts));
  }

  if (!localStorage.getItem("categories")) {
    localStorage.setItem("categories", JSON.stringify(mockCategories));
  }

  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(mockUsers));
  }

  if (!localStorage.getItem("nextPostId")) {
    localStorage.setItem("nextPostId", String(mockPosts.length + 1));
  }

  if (!localStorage.getItem("nextUserId")) {
    localStorage.setItem("nextUserId", String(mockUsers.length + 1));
  }
};

// Posts CRUD operations
export const getPosts = (filters: {
  text?: string;
  category?: string;
  latitude?: string;
  longitude?: string;
  locationRange?: string;
  page?: string;
  postQty?: string;
  sortPost?: string;
}) => {
  const storedPosts = localStorage.getItem("posts");
  let posts: MockPost[] = storedPosts ? JSON.parse(storedPosts) : [];

  // Apply filters
  if (filters.text) {
    const searchText = filters.text.toLowerCase();
    posts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchText) ||
        post.description.toLowerCase().includes(searchText),
    );
  }

  if (filters.category && filters.category !== "all") {
    posts = posts.filter(
      (post) => post.category.id.toString() === filters.category,
    );
  }

  if (filters.latitude && filters.longitude && filters.locationRange) {
    const lat = parseFloat(filters.latitude);
    const lng = parseFloat(filters.longitude);
    const range = parseFloat(filters.locationRange);

    posts = posts.filter((post) => {
      const distance = Math.sqrt(
        Math.pow(post.location.x - lat, 2) + Math.pow(post.location.y - lng, 2),
      );
      return distance <= range;
    });
  }

  // Sort posts
  if (filters.sortPost) {
    posts.sort((a, b) => {
      if (filters.sortPost === "createdDate") {
        return (
          new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
        );
      }
      return 0;
    });
  }

  // Pagination
  const page = filters.page ? parseInt(filters.page) : 1;
  const postQty = filters.postQty ? parseInt(filters.postQty) : 10;
  const startIndex = (page - 1) * postQty;
  const endIndex = startIndex + postQty;
  const paginatedPosts = posts.slice(startIndex, endIndex);

  return {
    posts: paginatedPosts,
    totalPages: Math.ceil(posts.length / postQty),
  };
};

export const getUserPosts = (userId: number) => {
  const storedPosts = localStorage.getItem("posts");
  const posts: MockPost[] = storedPosts ? JSON.parse(storedPosts) : [];
  return posts.filter((post) => post.userId === userId);
};

export const getPostsCategories = () => {
  const storedCategories = localStorage.getItem("categories");
  return storedCategories ? JSON.parse(storedCategories) : [];
};

export const createPost = (data: {
  title: string;
  description?: string;
  category: { id: number };
  latitude?: string;
  longitude?: string;
  locationRange?: string;
  userId: number;
  images?: { imageLink: string }[];
}) => {
  const storedPosts = localStorage.getItem("posts");
  const posts: MockPost[] = storedPosts ? JSON.parse(storedPosts) : [];

  // Get next post ID
  const nextPostIdStr = localStorage.getItem("nextPostId") || "1";
  const nextPostId = parseInt(nextPostIdStr);

  // Get category
  const storedCategories = localStorage.getItem("categories");
  const categories: MockCategory[] = storedCategories
    ? JSON.parse(storedCategories)
    : [];
  const category = categories.find((cat) => cat.id === data.category.id) || {
    id: 6,
    name: "Other",
  };

  // Create new post
  const newPost: MockPost = {
    id: nextPostId,
    title: data.title,
    description: data.description || "",
    location: {
      x: data.latitude ? parseFloat(data.latitude) : 0,
      y: data.longitude ? parseFloat(data.longitude) : 0,
    },
    createdDate: new Date().toISOString(),
    closedDate: null,
    category: category,
    images: data.images
      ? data.images.map((img) => ({ ...img, postId: nextPostId }))
      : [],
    userId: data.userId,
  };

  // Add post to array and save
  posts.push(newPost);
  localStorage.setItem("posts", JSON.stringify(posts));
  localStorage.setItem("nextPostId", String(nextPostId + 1));

  return { status: 201, data: newPost };
};

export const saveImageLink = (postId: number, link: string) => {
  const storedPosts = localStorage.getItem("posts");
  const posts: MockPost[] = storedPosts ? JSON.parse(storedPosts) : [];

  const postIndex = posts.findIndex((post) => post.id === postId);
  if (postIndex !== -1) {
    posts[postIndex].images.push({ imageLink: link, postId });
    localStorage.setItem("posts", JSON.stringify(posts));
    return { status: 200, data: { message: "Image added successfully" } };
  }

  return { status: 404, data: { error: "Post not found" } };
};

// User CRUD operations
export const createUser = (userData: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: {
    zipcode: string;
    address: string;
    number: string;
  };
}) => {
  const storedUsers = localStorage.getItem("users");
  const users: MockUser[] = storedUsers ? JSON.parse(storedUsers) : [];

  // Check if email already exists
  const existingUser = users.find((user) => user.email === userData.email);
  if (existingUser) {
    return { status: 400, data: { error: "Email already in use" } };
  }

  // Get next user ID
  const nextUserIdStr = localStorage.getItem("nextUserId") || "1";
  const nextUserId = parseInt(nextUserIdStr);

  // Create new user
  const newUser: MockUser = {
    id: nextUserId,
    ...userData,
  };

  // Add user to array and save
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("nextUserId", String(nextUserId + 1));

  return { status: 201, data: { message: "User created successfully" } };
};

export const loginUser = (email: string, password: string) => {
  const storedUsers = localStorage.getItem("users");
  const users: MockUser[] = storedUsers ? JSON.parse(storedUsers) : [];

  const user = users.find(
    (user) => user.email === email && user.password === password,
  );
  if (user) {
    // Create a token (just for simulation)
    const token = btoa(`${user.id}:${user.email}:${Date.now()}`);
    return {
      status: 200,
      data: { token, user: { ...user, password: undefined } },
    };
  }

  return { status: 401, data: { error: "Invalid email or password" } };
};

export const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    // Extract user ID from token
    const decodedToken = atob(token);
    const userId = parseInt(decodedToken.split(":")[0]);

    const storedUsers = localStorage.getItem("users");
    const users: MockUser[] = storedUsers ? JSON.parse(storedUsers) : [];

    const user = users.find((user) => user.id === userId);
    if (user) {
      return { ...user, password: undefined };
    }
  } catch (error) {
    console.error("Error decoding token", error);
  }

  return null;
};
