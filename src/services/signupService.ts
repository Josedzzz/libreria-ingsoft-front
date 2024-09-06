interface signupCredentials {
  email: string;
  username: string;
  password: string;
}

interface SuccesResponse {
  userId: string;
}

interface ErrorResponse {
  message: string;
}

export const signup = async (
  credentials: signupCredentials
): Promise<string> => {
  try {
    const response = await fetch("http://localhost:8080/users/register", {
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
    const signupResponse: SuccesResponse = await response.json();
    return signupResponse.userId;
  } catch (error) {
    console.error("Error during sign up", error);
    throw error;
  }
};
