import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// CommentCreate
export const CommentCreate = createAsyncThunk(
  "CommentCreate",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://twitter-api-three.vercel.app/v1/createcomment", data);
      // const response = await axios.post("http://localhost:4000/v1/createcomment", data);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.log(error?.response?.data)
      return rejectWithValue(error?.response?.data);
    }
  }
);


const commentSlice = createSlice({
  name: "post",
  initialState: {
    data: null,
    loading: false,
    errors: null,
  },
  reducers: {},
  extraReducers: (builder) => {
      // CommentCreate
      builder.addCase(CommentCreate.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CommentCreate.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(CommentCreate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default commentSlice.reducer;
