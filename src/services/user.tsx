import {
  createUser as createLocalUser,
  loginUser as loginLocalUser,
  getCurrentUser,
} from "@/utils/localStorage";

export interface IUserRequest {
  name: string;
  phone?: string;
  email: string;
  password: string;
  address?: {
    zipcode: string;
    address: string;
    number: string;
  };
}

export const createUser = async (user: IUserRequest) => {
  try {
    // Create user in localStorage
    return createLocalUser(user);
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      data: { error: "An error occurred while creating user" },
    };
  }
};

export const login = async (email: string, password: string) => {
  try {
    // Login user using localStorage
    const result = loginLocalUser(email, password);

    if (result.status === 200 && result.data.token) {
      // Store token in localStorage
      localStorage.setItem("token", result.data.token);
    }

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const logout = () => {
  // Remove token from localStorage
  localStorage.removeItem("token");

  // Reload page to reset state
  window.location.reload();
};

export const userAuth = async () => {
  try {
    // Get current user from localStorage
    const user = getCurrentUser();
    return user ? { authenticated: true, user } : { authenticated: false };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateInfo = async (userId: number, data: any) => {
  try {
    const storedUsers = localStorage.getItem("users");
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const userIndex = users.findIndex((user: any) => user.id === userId);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...data };
      localStorage.setItem("users", JSON.stringify(users));
      return { status: 200, data: { message: "User updated successfully" } };
    }

    return { status: 404, data: { error: "User not found" } };
  } catch (error) {
    console.error(error);
    return { status: 500, data: { error: "An error occurred" } };
  }
};

export const updatePassword = async (data: {
  userId: number;
  oldPassword: string;
  newPassword: string;
}) => {
  try {
    const storedUsers = localStorage.getItem("users");
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const userIndex = users.findIndex(
      (user: any) =>
        user.id === data.userId && user.password === data.oldPassword,
    );

    if (userIndex !== -1) {
      users[userIndex].password = data.newPassword;
      localStorage.setItem("users", JSON.stringify(users));
      return {
        status: 200,
        data: { message: "Password updated successfully" },
      };
    }

    return { status: 400, data: { error: "Invalid old password" } };
  } catch (error) {
    console.error(error);
    return { status: 500, data: { error: "An error occurred" } };
  }
};

export const updateAddress = async (userId: number, data: any) => {
  try {
    const storedUsers = localStorage.getItem("users");
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const userIndex = users.findIndex((user: any) => user.id === userId);
    if (userIndex !== -1) {
      users[userIndex].address = { ...users[userIndex].address, ...data };
      localStorage.setItem("users", JSON.stringify(users));
      return { status: 200, data: { message: "Address updated successfully" } };
    }

    return { status: 404, data: { error: "User not found" } };
  } catch (error) {
    console.error(error);
    return { status: 500, data: { error: "An error occurred" } };
  }
};
