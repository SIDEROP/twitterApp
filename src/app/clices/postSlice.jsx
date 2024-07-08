import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

// postCreate
export const postCreate = createAsyncThunk(
  "postCreate",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://twitter-api-three.vercel.app/v1/createpost", data);
      // const response = await axios.post("http://localhost:4000/v1/createpost", data);
      return response.data;
    } catch (error) {
      toast(error.message)
      return rejectWithValue(error?.response?.data);
    }
  }
);

// postGet all
export const postGet = createAsyncThunk(
  "postGet",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://twitter-api-three.vercel.app/v1/getpost");
      // const response = await axios.get("http://localhost:4000/v1/getpost");
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// userLike
export const userLike = createAsyncThunk(
  "userLike",
  async (data, { rejectWithValue }) => {
    try {
      let {userId,postId} = data;
      const response = await axios.put(`https://twitter-api-three.vercel.app/v1/likepost/${userId}/${postId}`);
      // const response = await axios.put(`http://localhost:4000/v1/likepost/${userId}/${postId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// getuserpost
export const getUserPost = createAsyncThunk(
  "getUserPost",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.post(`https://twitter-api-three.vercel.app/v1/getuserpost/${userId}`);
      // const response = await axios.post(`http://localhost:4000/v1/getuserpost/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// userViews
export const userViews = createAsyncThunk(
  "userViews",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.put(`https://twitter-api-three.vercel.app/v1/views/${userId}`);
      // const response = await axios.post(`http://localhost:4000/v1/getuserpost/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    userPost:[],
    post: null,
    loading: false,
    errors: null,
  },
  reducers: {},
  extraReducers: (builder) => {
      // postCreate
      builder.addCase(postCreate.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postCreate.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(postCreate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      // postGet
      builder.addCase(postGet.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postGet.fulfilled, (state, action) => {
        state.post = action.payload;
        state.loading = false;
      })
      .addCase(postGet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      // userLike
      builder.addCase(userLike.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLike.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(userLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      // getUserPost
      builder.addCase(getUserPost.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserPost.fulfilled, (state, action) => {
        state.userPost = action.payload;
        state.loading = false;
      })
      .addCase(getUserPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      // // userViews
      // builder.addCase(userViews.pending, (state, action) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(userViews.fulfilled, (state, action) => {
      //   state.userPost = action.payload;
      //   state.loading = false;
      // })
      // .addCase(userViews.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // });
  },
});

export default postSlice.reducer;
