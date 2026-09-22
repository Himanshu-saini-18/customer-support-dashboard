import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchTickets = createAsyncThunk(
  "tickets/fetchTickets",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Unable to load tickets");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateTicketStatus = createAsyncThunk(
  "tickets/updateTicketStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Unable to update ticket");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  tickets: [],
  selectedTicket: null,
  searchText: "",
  statusFilter: "All",
  priorityFilter: "All",
  loading: false,
  updating: false,
  error: null,
};

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },

    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
    },

    setPriorityFilter: (state, action) => {
      state.priorityFilter = action.payload;
    },

    selectTicket: (state, action) => {
      state.selectedTicket = action.payload;
    },

    closeTicket: (state) => {
      state.selectedTicket = null;
    },

    clearFilters: (state) => {
      state.searchText = "";
      state.statusFilter = "All";
      state.priorityFilter = "All";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTicketStatus.pending, (state) => {
        state.updating = true;
      })
      .addCase(updateTicketStatus.fulfilled, (state, action) => {
        state.updating = false;

        const index = state.tickets.findIndex(
          (ticket) => ticket.id === action.payload.id,
        );

        if (index !== -1) {
          state.tickets[index] = action.payload;
        }

        if (state.selectedTicket?.id === action.payload.id) {
          state.selectedTicket = action.payload;
        }
      })
      .addCase(updateTicketStatus.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      });
  },
});

export const {
  setSearchText,
  setStatusFilter,
  setPriorityFilter,
  selectTicket,
  closeTicket,
  clearFilters,
} = ticketsSlice.actions;

export default ticketsSlice.reducer;