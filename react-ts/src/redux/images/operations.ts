import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const ACCESS_KEY: string = import.meta.env.VITE_ACCESS_KEY;

type FetchImagesParams = {
  query: string;
  page: number;
};

type Image = {
  id: string;
  description: string;
  urls: {
    small: string;
    regular: string;
  };
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
      const res = await axios.get("/search/photos", {
        params: {
          client_id: ACCESS_KEY,
          query,
          page,
          per_page: 20,
        },
      });
      const data = res.data as fetchImagesResponse;
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
