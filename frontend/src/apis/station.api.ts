import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Station } from '../interfaces/Station';

const API_URL = 'http://localhost:8080/stations'; 

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

// Hàm chuẩn bị dữ liệu 
const prepareData = (station: any) => ({
    ...station,
    // Đảm bảo là string ISO, nếu input là Date object thì dùng toISOString()
    created_at: typeof station.created_at === 'string' ? station.created_at : station.created_at.toISOString(),
    updated_at: typeof station.updated_at === 'string' ? station.updated_at : station.updated_at.toISOString(),
});

// Lấy danh sách (READ)
export const fetchStationsThunk = createAsyncThunk(
    'stations/fetchStations', 
    async () => {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Lỗi khi lấy dữ liệu bến xe.');
        return await response.json(); 
    }
);

// Thêm mới (CREATE)
export const addStationThunk = createAsyncThunk(
    'stations/addStation', 
    async (stationData: Station) => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(prepareData(stationData)),
        });
        if (!response.ok) throw new Error('Không thể thêm bến xe.');
        return await response.json();
    }
);

// Cập nhật (UPDATE)
export const updateStationThunk = createAsyncThunk(
    'stations/updateStation', 
    async (stationData: Station) => {
        const response = await fetch(`${API_URL}/${stationData.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(prepareData(stationData)),
        });
        if (!response.ok) throw new Error('Không thể cập nhật bến xe.');
        return await response.json();
    }
);

// Xóa (DELETE)
export const deleteStationThunk = createAsyncThunk(
    'stations/deleteStation', 
    async (id: string) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Không thể xóa bến xe.');
        return id; 
    }
);

const StationSlice = createSlice({
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

export default StationSlice.reducer;