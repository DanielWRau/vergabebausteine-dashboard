import type { AuthProvider } from "@refinedev/core";
import { account } from "./utility/appwriteClient";

export const authProvider: AuthProvider = {
  login: async ({ email, password }: { email: string; password: string }) => {
    try {
      await account.createEmailPasswordSession(email, password);
      return {
        success: true,
        redirectTo: "/",
      };
    } catch (error) {
      const err = error as { message?: string };
      return {
        success: false,
        error: {
          name: "LoginError",
          message: err.message || "Login failed",
        },
      };
    }
  },

  logout: async () => {
    try {
      await account.deleteSession("current");
      return {
        success: true,
        redirectTo: "/login",
      };
    } catch (error) {
      return {
        success: false,
        error: {
          name: "LogoutError",
          message: "Logout failed",
        },
      };
    }
  },

  check: async () => {
    try {
      const user = await account.get();
      if (user) {
        return {
          authenticated: true,
        };
      }
    } catch (error) {
      return {
        authenticated: false,
        redirectTo: "/login",
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },

  getPermissions: async () => null,

  getIdentity: async () => {
    try {
      const user = await account.get();
      if (user) {
        return {
          id: user.$id,
          name: user.name,
          email: user.email,
        };
      }
    } catch (error) {
      return null;
    }

    return null;
  },

  onError: async (error: any) => {
    console.error(error);
    return { error };
  },

  register: async ({ email, password, name }: { email: string; password: string; name: string }) => {
    try {
      await account.create("unique()", email, password, name);
      return {
        success: true,
        redirectTo: "/login",
      };
    } catch (error) {
      const err = error as { message?: string };
      return {
        success: false,
        error: {
          name: "RegisterError",
          message: err.message || "Registration failed",
        },
      };
    }
  },

  forgotPassword: async ({ email }: { email: string }) => {
    try {
      await account.createRecovery(
        email,
        `${window.location.origin}/reset-password`
      );
      return {
        success: true,
      };
    } catch (error) {
      const err = error as { message?: string };
      return {
        success: false,
        error: {
          name: "ForgotPasswordError",
          message: err.message || "Failed to send recovery email",
        },
      };
    }
  },

  updatePassword: async ({ password, confirmPassword }: { password: string; confirmPassword: string }) => {
    if (password !== confirmPassword) {
      return {
        success: false,
        error: {
          name: "UpdatePasswordError",
          message: "Passwords do not match",
        },
      };
    }

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const userId = urlParams.get("userId");
      const secret = urlParams.get("secret");

      if (userId && secret) {
        await account.updateRecovery(userId, secret, password);
        return {
          success: true,
          redirectTo: "/login",
        };
      }

      return {
        success: false,
        error: {
          name: "UpdatePasswordError",
          message: "Invalid recovery link",
        },
      };
    } catch (error) {
      const err = error as { message?: string };
      return {
        success: false,
        error: {
          name: "UpdatePasswordError",
          message: err.message || "Password update failed",
        },
      };
    }
  },
};
