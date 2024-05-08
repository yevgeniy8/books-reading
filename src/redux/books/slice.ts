import {
  createSlice,
  isRejectedWithValue,
  PayloadAction,
} from "@reduxjs/toolkit";
import { addBook, deleteBook, addBookReview } from "./operations";
import { logOut } from "../../redux/auth/operations";
import { errorTypes } from "../../constants/";
import { IBook, IError, IFetchBooksResponse } from "../../types";

export interface IInitialState {
  goingToRead: IBook[];
  currentlyReading: IBook[];
  finishedReading: IBook[];
  updatedBook: IBook | null;
  error: IError | undefined;
  isError: boolean;
  isAdding: boolean;
  isDeleting: string[];
}

const initialState: IInitialState = {
  goingToRead: [],
  currentlyReading: [],
  finishedReading: [],
  updatedBook: null,
  error: { message: null, status: null, type: null },
  isError: false,
  isAdding: false,
  isDeleting: [],
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<IFetchBooksResponse>) => {
      state.goingToRead = action.payload.goingToRead;
      state.currentlyReading = action.payload.currentlyReading;
      state.finishedReading = action.payload.finishedReading;
    },
    updateBook: (state, action: PayloadAction<IBook>) => {
      state.goingToRead = state.goingToRead.filter(
        ({ _id }) => _id !== action.payload._id
      );
      state.currentlyReading = state.currentlyReading.filter(
        ({ _id }) => _id !== action.payload._id
      );

      state.updatedBook = action.payload;

      if (action.payload.pagesTotal === action.payload.pagesFinished) {
        state.finishedReading = [...state.finishedReading, action.payload];
      } else {
        state.currentlyReading = [...state.currentlyReading, action.payload];
      }
    },
    clearError: (state) => {
      state.error = { message: null, status: null, type: null };
      state.isError = false;
    },
    clearUpdatedBook: (state) => {
      state.updatedBook = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBook.fulfilled, (state, action) => {
        state.goingToRead = [...state.goingToRead, action.payload];
        state.isAdding = false;
      })
      .addCase(addBook.pending, (state) => {
        state.isAdding = true;
        state.isError = false;
        state.error = { message: null, status: null, type: null };
      })
      .addCase(addBook.rejected, (state, action) => {
        state.isAdding = false;
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.isDeleting = state.isDeleting.filter(
          (bookId) => bookId !== action.payload
        );
        state.goingToRead = state.goingToRead.filter(
          ({ _id }) => _id !== action.payload
        );
      })
      .addCase(deleteBook.pending, (state, action) => {
        state.isDeleting.push(action.meta.arg);
        state.isError = false;
        state.error = { message: null, status: null, type: null };
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.isDeleting = state.isDeleting.filter(
          (bookId) => bookId !== action.meta.arg
        );
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(addBookReview.fulfilled, (state, action) => {
        const idx = state.finishedReading.findIndex(
          ({ _id }) => _id === action.payload._id
        );
        state.finishedReading.splice(idx, 1, action.payload);
      })
      .addCase(addBookReview.pending, (state) => {
        state.isError = false;
        state.error = { message: null, status: null, type: null };
      })
      .addCase(addBookReview.rejected, (state, action) => {
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.goingToRead = [];
        state.currentlyReading = [];
        state.finishedReading = [];
        state.updatedBook = null;
      })
      .addMatcher<PayloadAction<IError>>(
        isRejectedWithValue,
        (state, action) => {
          if (action.payload.type === errorTypes.endOfSession) {
            state.goingToRead = [];
            state.currentlyReading = [];
            state.finishedReading = [];
            state.updatedBook = null;
          }
        }
      );
  },
});

export const { setBooks, updateBook, clearError, clearUpdatedBook } =
  booksSlice.actions;

export const booksReducer = booksSlice.reducer;
