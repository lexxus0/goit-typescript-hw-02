import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchImages } from "./operations";

type ImageState = {
  images: Image[];
  isLoading: boolean;
  error: string | null;
};

const INITIAL_STATE: ImageState = {
  images: [],
  isLoading: false,
  error: null,
};

export interface Image {
  id: string;
  description: string;
  urls: {
    small: string;
    regular: string;
  };
}

const imagesSlice = createSlice({
  name: "images",
  initialState: INITIAL_STATE,
  reducers: {
    clearImages(state) {
      state.images = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchImages.fulfilled,
        (state, action: PayloadAction<Image[]>) => {
          state.isLoading = false;
          state.error = null;
          const uniqueImages = action.payload.filter(
            (newImage) =>
              !state.images.some((image) => image.id === newImage.id)
          );

          state.images = state.images.concat(uniqueImages);
        }
      )
      .addCase(fetchImages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearImages } = imagesSlice.actions;
export const imagesReducer = imagesSlice.reducer;
