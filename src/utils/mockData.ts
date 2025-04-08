// Mock data for the application

export interface MockCategory {
  id: number;
  name: string;
}

export interface MockImage {
  imageLink: string;
  postId: number;
}

export interface MockLocation {
  x: number;
  y: number;
}

export interface MockPost {
  id: number;
  title: string;
  description: string;
  location: MockLocation;
  createdDate: string;
  closedDate: string | null;
  category: {
    id: number;
    name: string;
  };
  images: MockImage[];
  userId: number;
}

export interface MockUser {
  id: number;
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: {
    zipcode: string;
    address: string;
    number: string;
  };
}

// Mock categories
export const mockCategories: MockCategory[] = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Clothing" },
  { id: 3, name: "Accessories" },
  { id: 4, name: "Documents" },
  { id: 5, name: "Pets" },
  { id: 6, name: "Other" },
];

// Mock posts
export const mockPosts: MockPost[] = [
  {
    id: 1,
    title: "Lost iPhone 13",
    description:
      "Lost my iPhone 13 Pro Max in Central Park. It has a blue case with a picture of a cat on it.",
    location: { x: 40.7812, y: -73.9665 },
    createdDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    closedDate: null,
    category: { id: 1, name: "Electronics" },
    images: [
      {
        imageLink:
          "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&q=80",
        postId: 1,
      },
    ],
    userId: 1,
  },
  {
    id: 2,
    title: "Missing Wallet",
    description:
      "Lost my brown leather wallet near the subway station. Contains ID and credit cards.",
    location: { x: 40.758, y: -73.9855 },
    createdDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    closedDate: null,
    category: { id: 3, name: "Accessories" },
    images: [
      {
        imageLink:
          "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
        postId: 2,
      },
    ],
    userId: 2,
  },
  {
    id: 3,
    title: "Lost Keys",
    description:
      "Lost my house keys with a red keychain near the library. Has 3 keys and a small USB drive.",
    location: { x: 40.7527, y: -73.9772 },
    createdDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    closedDate: null,
    category: { id: 6, name: "Other" },
    images: [
      {
        imageLink:
          "https://images.unsplash.com/photo-1582550740000-969f38a550af?w=800&q=80",
        postId: 3,
      },
    ],
    userId: 1,
  },
  {
    id: 4,
    title: "Missing Laptop",
    description:
      "Lost my MacBook Pro at the coffee shop on 5th Avenue. It has a sticker of a rocket on the cover.",
    location: { x: 40.7308, y: -73.9973 },
    createdDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    closedDate: null,
    category: { id: 1, name: "Electronics" },
    images: [
      {
        imageLink:
          "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
        postId: 4,
      },
    ],
    userId: 3,
  },
  {
    id: 5,
    title: "Lost Glasses",
    description:
      "Lost my prescription glasses with black frames at the park. They're in a blue case.",
    location: { x: 40.7829, y: -73.9654 },
    createdDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    closedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    category: { id: 3, name: "Accessories" },
    images: [
      {
        imageLink:
          "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=800&q=80",
        postId: 5,
      },
    ],
    userId: 2,
  },
];

// Mock users
export const mockUsers: MockUser[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    phone: "555-1234",
    address: {
      zipcode: "10001",
      address: "123 Main St",
      number: "4B",
    },
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    phone: "555-5678",
    address: {
      zipcode: "10002",
      address: "456 Park Ave",
      number: "7A",
    },
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    password: "password123",
    phone: "555-9012",
  },
];
