import axios from "axios";

const AUTH_ROUTES = "/api/auth";

const Host = import.meta.env.VITE_SERVER_URL;

const signUp = async (firstName: string, email: string, password: string) => {
  try {
    const response = await axios.post(
      `${Host}${AUTH_ROUTES}/signup`,
      {
        firstName,
        email,
        password,
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Signup failed");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${Host}${AUTH_ROUTES}/login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Login failed");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export { signUp, login };
