import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  urls: JSON.parse(localStorage.getItem("urls")) || [""],
  metadata: JSON.parse(localStorage.getItem("metadata")) || [],
  editedMetadata: {},
  isEditing: {},
  isLoading: false,
  invalidUrls: [],
};

const metadataSlice = createSlice({
  name: "metadata",
  initialState,
  reducers: {
    setUrls: (state, action) => {
      state.urls = action.payload;
      localStorage.setItem("urls", JSON.stringify(state.urls));
    },
    addUrl: (state) => {
      state.urls.push("");
      localStorage.setItem("urls", JSON.stringify(state.urls));
    },
    removeUrl: (state, action) => {
      state.urls = state.urls.filter((_, index) => index !== action.payload);
      if (state.urls.length === 0) state.urls = [""];
      localStorage.setItem("urls", JSON.stringify(state.urls));
    },
    setMetadata: (state, action) => {
      state.metadata = action.payload;
      localStorage.setItem("metadata", JSON.stringify(state.metadata));
    },
    setEditedMetadata: (state, action) => {
      state.editedMetadata = {
        ...state.editedMetadata,
        [action.payload.index]: {
          ...state.editedMetadata[action.payload.index],
          [action.payload.field]: action.payload.value,
        },
      };
    },
    toggleEditing: (state, action) => {
      state.isEditing[action.payload] = !state.isEditing[action.payload];
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setInvalidUrls: (state, action) => {
      state.invalidUrls = action.payload;
    },
    resetState: (state) => {
      state.urls = [""];
      state.metadata = [];
      state.editedMetadata = {};
      state.isEditing = {};
      state.invalidUrls = [];
      localStorage.removeItem("urls");
      localStorage.removeItem("metadata");
    },
  },
});

export const {
  setUrls,
  addUrl,
  removeUrl,
  setMetadata,
  setEditedMetadata,
  toggleEditing,
  setLoading,
  setInvalidUrls,
  resetState,
} = metadataSlice.actions;

export default metadataSlice.reducer;
