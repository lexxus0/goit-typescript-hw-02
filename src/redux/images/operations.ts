import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Image } from "./slice";

const ACCESS_KEY: string = import.meta.env.VITE_ACCESS_KEY;

type FetchImagesParams = {
  query: string;
  page: number;
};

type fetchImagesResponse = {
  results: Image[];
  total: number;
  total_pages: number;
};

axios.defaults.baseURL = "https://api.unsplash.com/";

export const fetchImages = createAsyncThunk<Image[], FetchImagesParams>(
  "/search/photos",
  async ({ query, page }, thunkAPI) => {
    try {
      const res = await axios.get<fetchImagesResponse>("/search/photos", {
        params: {
          client_id: ACCESS_KEY,
          query,
          page,
          per_page: 20,
        },
      });
      const data = res.data;
      return data.results;
    } catch (error) {
      let errorMessage = "Failed to do something exceptional";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
