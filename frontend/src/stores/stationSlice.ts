import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Station } from '../interfaces/Station';
import { fetchStationsApi, addStationApi, updateStationApi, deleteStationApi } from '../apis/station.api';

interface StationState {
    stations: Station[];
    loading: boolean;
    error: string | null;
}

const initialState: StationState = {
    stations: [],
    loading: false,
    error: null,
};

export const fetchStationsThunk = createAsyncThunk(
    'stations/fetchStations', async () => await fetchStationsApi()
);

export const addStationThunk = createAsyncThunk(
    'stations/addStation', async (stationData: Station) => await addStationApi(stationData)
);

export const updateStationThunk = createAsyncThunk(
    'stations/updateStation', async (stationData: Station) => await updateStationApi(stationData)
);

export const deleteStationThunk = createAsyncThunk(
    'stations/deleteStation', async (id: string) => await deleteStationApi(id)
);

const stationSlice = createSlice({
    name: 'stations',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // FETCH (Read)
            .addCase(fetchStationsThunk.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchStationsThunk.fulfilled, (state, action) => {
                state.stations = action.payload;
                state.loading = false;
            })
            // ADD (Create)
            .addCase(addStationThunk.fulfilled, (state, action) => {
                state.stations.push(action.payload);
                state.loading = false;
            })
            // UPDATE (Update)
            .addCase(updateStationThunk.fulfilled, (state, action) => {
                const index = state.stations.findIndex(s => s.id === action.payload.id);
                if (index !== -1) {
                    state.stations[index] = action.payload;
                }
                state.loading = false;
            })
            // DELETE (Delete)
            .addCase(deleteStationThunk.fulfilled, (state, action) => {
                state.stations = state.stations.filter(s => s.id !== action.payload);
                state.loading = false;
            })
            // Xử lý lỗi chung
            .addMatcher((action) => action.type.endsWith('/rejected'), (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Có lỗi xảy ra.';
            });
    }
});

export default stationSlice.reducer;