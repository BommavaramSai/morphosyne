import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createSelector } from "@reduxjs/toolkit";

const getCookie = (name) => {
  const cookieValue = document.cookie.match(
    "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
  );
  return cookieValue ? cookieValue.pop() : null;
};

const setCookie = (name, value, days) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);
  const cookieValue =
    encodeURIComponent(value) +
    (days ? `; expires=${expirationDate.toUTCString()}` : "") +
    "; path=/";
  document.cookie = name + "=" + cookieValue;
};

const deleteCookie = (name) => {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

// Async thunk action for checking if the user is authenticated
export const checkAuthenticated = createAsyncThunk(
  "user/checkAuthenticated",
  async (_, { rejectWithValue }) => {
    try {
      const cookieExists = (name) => {
        const cookieValue = getCookie(name);
        return cookieValue !== null;
      };

      const accessToken = cookieExists("accessToken");

      if (accessToken) {
        const response = await axios.post(
          `http://127.0.0.1:8000/auth/jwt/verify/`
        );
        if (response.data.code !== "token_not_valid") {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          };
          const body = JSON.stringify({ token: accessToken });
        } else {
          throw new Error("Access token not found");
        }
        return response.data;
      } else {
        throw new Error("Access token not found");
      }
    } catch (error) {
      //   throw new Error(error.response.data.message);
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk action for user registration
export const registerUser = createAsyncThunk(
  "user/register",
  async ({ email, first_name, last_name, password, re_password }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const body = JSON.stringify({
      email,
      first_name,
      last_name,
      password,
      re_password,
    });
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/auth/users/`,
        body,
        config
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Async thunk action for user registration
export const reset_password = createAsyncThunk(
  "user/reset_password",
  async ({ email }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email });
    try {
      await axios.post(
        `http://127.0.0.1:8000/auth/users/reset_password/`,
        body,
        config
      );
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Async thunk action for user registration
export const reset_password_confirm = createAsyncThunk(
  "user/reset_password",
  async ({ uid, token, new_password, re_new_password }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ uid, token, new_password, re_new_password });
    try {
      await axios.post(
        `http://127.0.0.1:8000/auth/users/reset_password_confirm/`,
        body,
        config
      );
      // return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Async thunk action for user registration
export const verify = createAsyncThunk(
  "user/verify",
  async ({ uid, token }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ uid, token });
    try {
      await axios.post(
        `http://127.0.0.1:8000/auth/users/activation/`,
        body,
        config
      );
      // return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Async thunk action for user login
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer token",
      },
    };

    const body = JSON.stringify({ email, password });

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/auth/jwt/create/`,
        body,
        config
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Async thunk action for loading the authenticated user's data
export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      //   const state = getState();

      const cookieExists = (name) => {
        const cookieValue = getCookie(name);
        return cookieValue !== null;
      };

      const accessToken = cookieExists("accessToken");

      if (accessToken) {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${accessToken}`,
            Accept: "application/json",
          },
        };

        const response = await axios.get(
          `http://127.0.0.1:8000/auth/users/me/`,
          config
        );
        return response.data;
      } else {
        throw new Error("Access token not found");
      }
    } catch (error) {
      //   throw new Error(error.response.data.message);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  registerStatus: null,
  //   access: localStorage.getItem("access"),
  //   refresh: localStorage.getItem("refresh"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUserSuccess: (state) => {
      state.registerStatus = "fulfilled";
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
    },
    loginSuccessful: (state, action) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload.access;
      state.refreshToken = action.payload.refresh;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.registerStatus = "fulfilled";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
        state.isAuthenticated = true;

        setCookie("accessToken", action.payload.access, 7); // Set expiration to 7 days
        setCookie("refreshToken", action.payload.refresh, 30); // Set expiration to 30 days
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = action.error.message;
        state.isAuthenticated = false;
        state.accessToken = null;
        state.refreshToken = null;
      })
      .addCase(loadUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.accessToken = null;
        state.refreshToken = null;
      })
      .addCase(checkAuthenticated.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuthenticated.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.isAuthenticated;
        state.user = action.payload.user;
      })
      .addCase(checkAuthenticated.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(reset_password.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(reset_password.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(reset_password.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, loginSuccessful, registerUserSuccess } =
  userSlice.actions;
export default userSlice.reducer;

export const selectRegisterStatus = createSelector(
  (state) => state.user.registerStatus,
  (registerStatus) => registerStatus
);
