import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { BusCompany } from '../interfaces/Bus';

const API_URL = 'http://localhost:8080/bus_company'; 

interface BusCompanyState {
    busCompany: BusCompany[];
    loading: boolean;
    error: string | null;
}

const initialState: BusCompanyState = {
    busCompany: [],
    loading: false,
    error: null,
};

// Hàm chuẩn bị dữ liệu (đảm bảo Date objects được chuyển thành chuỗi ISO string)
const prepareData = (company: any) => ({
    ...company,
    created_at: typeof company.created_at === 'string' ? company.created_at : company.created_at.toISOString(),
    updated_at: typeof company.updated_at === 'string' ? company.updated_at : company.updated_at.toISOString(),
});

// Lấy danh sách (READ)
export const fetchBusCompanyThunk = createAsyncThunk(
    'busCompany/fetchCompany', 
    async () => {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Lỗi khi lấy dữ liệu nhà xe.');
        return await response.json(); 
    }
);

// Thêm mới (CREATE)
export const addBusCompanyThunk = createAsyncThunk(
    'busCompany/addCompany', 
    async (companyData: BusCompany) => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(prepareData(companyData)),
        });
        if (!response.ok) throw new Error('Không thể thêm nhà xe.');
        return await response.json();
    }
);

// Cập nhật (UPDATE)
export const updateBusCompanyThunk = createAsyncThunk(
    'busCompany/updateCompany', 
    async (companyData: BusCompany) => {
        const response = await fetch(`${API_URL}/${companyData.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(prepareData(companyData)),
        });
        if (!response.ok) throw new Error('Không thể cập nhật nhà xe.');
        return await response.json();
    }
);

// Xóa (DELETE)
export const deleteBusCompanyThunk = createAsyncThunk(
    'busCompany/deleteCompany', 
    async (id: string) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Không thể xóa nhà xe.');
        return id; 
    }
);

const BusCompanySlice = createSlice({
    name: 'busCompany',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // FETCH (Read)
            .addCase(fetchBusCompanyThunk.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchBusCompanyThunk.fulfilled, (state, action) => {
                state.busCompany = action.payload;
                state.loading = false;
            })
            // ADD (Create)
            .addCase(addBusCompanyThunk.fulfilled, (state, action) => {
                state.busCompany.push(action.payload);
                state.loading = false;
            })
            // UPDATE (Update)
            .addCase(updateBusCompanyThunk.fulfilled, (state, action) => {
                const index = state.busCompany.findIndex(c => c.id === action.payload.id);
                if (index !== -1) {
                    state.busCompany[index] = action.payload; // Thay thế object cũ
                }
                state.loading = false;
            })
            // DELETE (Delete)
            .addCase(deleteBusCompanyThunk.fulfilled, (state, action) => {
                state.busCompany = state.busCompany.filter(c => c.id !== action.payload);
                state.loading = false;
            })
            // Xử lý lỗi chung
            .addMatcher((action) => action.type.endsWith('/rejected'), (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Lỗi xử lý nhà xe.';
            });
    }
});

export default BusCompanySlice.reducer;