interface LoginCredentials {
  email: string;
  password: string;
}

interface SuccessResponse {
  userId: string;
}

interface ErrorResponse {
  message: string;
}

export const login = async (credentials: LoginCredentials): Promise<string> => {
  try {
    const response = await fetch("http://localhost:8080/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      // Handle the error response
      const errorResponse: ErrorResponse = await response.json();
      throw new Error(errorResponse.message);
    }

    // Read the response as a json
    const loginResponse: SuccessResponse = await response.json();

    return loginResponse.userId;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
