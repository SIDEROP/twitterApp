import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./clices/userSlice";
import postSlice from "./clices/postSlice";
import CommentSlice from "./clices/Comment.Slice";

export const store = configureStore({
  reducer: {
    app: userSlice,
    post:postSlice,
    comment:CommentSlice
  }
});
