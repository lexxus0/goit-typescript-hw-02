import { RootState } from "../store";

export const selectIsLoading = (state: RootState) => state.images.isLoading;
export const selectError = (state: RootState) => state.images.error;
export const selectImages = (state: RootState) => state.images.images;
