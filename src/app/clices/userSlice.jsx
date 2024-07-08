import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

// userCreate
export const userCreate = createAsyncThunk(
  "userCreate",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://twitter-api-three.vercel.app/v1/registered",
        data
      );
      // "http://localhost:4000/v1/registered",
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message)
      return rejectWithValue(error?.response?.data);
    }
  }
);

// userLogin
export const userLogin = createAsyncThunk(
  "userLogin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://twitter-api-three.vercel.app/v1/login", data);
      // const response = await axios.post("http://localhost:4000/v1/login", data);
      window.localStorage.setItem("token", response?.data?.token);
      return response.data;
    } catch (error) {
      window.localStorage.setItem("token", "");
      toast.error(error?.response?.data?.message)
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

// toggleFollow
export const toggleFollow = createAsyncThunk(
  "toggleFollow",
  async (data, { rejectWithValue }) => {
    try {
      let { userId, otherUserId } = data;
      const response = await axios.put(
        `https://twitter-api-three.vercel.app/v1/follow/${userId}/${otherUserId}`
      );
      // const response = await axios.put(
      //   `http://localhost:4000/v1/follow/${userId}/${otherUserId}`
      // );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

// userProtected
export const userProtected = createAsyncThunk(
  "userProtected",
  async (data, { rejectWithValue }) => {
    let neToken = window.localStorage.getItem("token");
    try {
      const response = await axios.post(
        `https://twitter-api-three.vercel.app/v1/protected/${data || neToken}`
      );
      // const response = await axios.post(
      //   `http://localhost:4000/v1/protected/${data || neToken}`
      // );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// userAddBookmark
export const userAddBookmark = createAsyncThunk(
  "userAddBookmark",
  async (data, { rejectWithValue }) => {
    try {
      let { userId, postId } = data;
      const response = await axios.post(
        `https://twitter-api-three.vercel.app/v1/addbookmark/${userId}/${postId}`
        // `http://localhost:4000/v1/addbookmark/${userId}/${postId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// getUserBookmarks
export const getUserBookmarks = createAsyncThunk(
  "getUserBookmarks",
  async (data, { rejectWithValue }) => {
    try {
      let { userId } = data;
      const response = await axios.post(
        `https://twitter-api-three.vercel.app/v1/getbookmarks/${userId}`
      );
      // const response = await axios.post(
      //   `http://localhost:4000/v1/getbookmarks/${userId}`
      // );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// userSearch
export const userSearch = createAsyncThunk(
  "userSearch",
  async (data, { rejectWithValue }) => {
    try {
      let { userName } = data;
      const response = await axios.post(
        `https://twitter-api-three.vercel.app/v1/search/${userName}`
      );
      // const response = await axios.post(
      //   `http://localhost:4000/v1/search/${userName}`
      // );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    search: null,
    toggleBtn: true,
    auth: false,
    user: null,
    bookmark: null,
    loading: false,
    error: null,
    userErorr: null,
    bookmarkErorr: null,
  },
  reducers: {
    toggle(state, action) {
      state.toggleBtn = !action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state, action) => {
        state.loading = true;
        state.userErorr = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.userErorr = action.payload;
      });
    // userProtected
    builder
      .addCase(userProtected.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userProtected.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.auth = true;
      })
      .addCase(userProtected.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // userCreate
    builder
      .addCase(userCreate.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userCreate.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(userCreate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // toggleFollow
    builder
      .addCase(toggleFollow.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleFollow.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(toggleFollow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // userAddBookmark
    builder
      .addCase(userAddBookmark.pending, (state, action) => {
        state.loading = true;
        state.bookmarkErorr = null;
      })
      .addCase(userAddBookmark.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(userAddBookmark.rejected, (state, action) => {
        state.loading = false;
        state.bookmarkErorr = action.payload;
      });
    // getUserBookmarks
    builder
      .addCase(getUserBookmarks.pending, (state, action) => {
        state.loading = true;
        state.bookmarkErorr = null;
      })
      .addCase(getUserBookmarks.fulfilled, (state, action) => {
        state.loading = false;
        state.bookmark = action.payload?.data;
      })
      .addCase(getUserBookmarks.rejected, (state, action) => {
        state.loading = false;
        state.bookmarkErorr = action.payload;
      });
    // userSearch
    builder
      .addCase(userSearch.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.search = action.payload?.data;
      })
      .addCase(userSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
export const { toggle } = userSlice.actions;
