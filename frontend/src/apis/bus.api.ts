import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Bus } from '../interfaces/Bus'; 
import type { BusImage } from '../interfaces/Bus'; 

const API_URL_BUS = 'http://localhost:8080/buses';
const API_URL_IMAGE = 'http://localhost:8080/bus_images'; 

export interface CombinedBus extends Bus {
    images: BusImage[]; 
}

interface BusState {
    buses: CombinedBus[]; 
    simpleBuses: Bus[];
    loading: boolean;
    error: string | null;
}

const initialState: BusState = {
    buses: [],
    simpleBuses: [],
    loading: false,
    error: null,
};

const generateNewImageId = (currentImages: BusImage[]): string => {
    const imgIds = currentImages
      .map(img => img.id)
      .filter(id => id.startsWith('IMG'))
      .map(id => parseInt(id.replace('IMG', '')))
      .filter(num => !isNaN(num));

    const maxNum = imgIds.length > 0 ? Math.max(...imgIds) : 0;
    const newIdNum = maxNum + 1;

    return `IMG${String(newIdNum).padStart(3, '0')}`;
};

// Hàm chuẩn bị dữ liệu (đảm bảo Date objects được chuyển thành chuỗi ISO string)
const prepareData = (data: any) => ({
    ...data,
    created_at: typeof data.created_at === 'string' ? data.created_at : data.created_at.toISOString(),
    updated_at: typeof data.updated_at === 'string' ? data.updated_at : data.updated_at.toISOString(),
});

// Lấy danh sách xe cơ bản (không có hình ảnh)
export const fetchSimpleBusesThunk = createAsyncThunk(
    'buses/fetchSimpleBuses', 
    async () => {
        const response = await fetch(API_URL_BUS);
        if (!response.ok) throw new Error('Lỗi khi lấy dữ liệu xe cơ bản.');
        // Chỉ trả về Bus[]
        return await response.json() as Bus[]; 
    }
);

// Lấy danh sách xe cùng hình ảnh
export const fetchBusesThunk = createAsyncThunk(
    'buses/fetchBuses', 
    async () => {
        // Fetch cả hai bảng
        const [busRes, imageRes] = await Promise.all([
            fetch(API_URL_BUS),
            fetch(API_URL_IMAGE)
        ]);

        if (!busRes.ok) throw new Error('Lỗi khi lấy dữ liệu xe.');
        if (!imageRes.ok) throw new Error('Lỗi khi lấy dữ liệu hình ảnh.');

        const buses: Bus[] = await busRes.json();
        const images: BusImage[] = await imageRes.json();

        // Map hình ảnh vào xe buýt 
        const imagesMap = new Map<string, BusImage[]>();
        images.forEach(img => {
            if (!imagesMap.has(img.bus_id)) {
                imagesMap.set(img.bus_id, []);
            }
            imagesMap.get(img.bus_id)?.push(img);
        });

        // Kết hợp và trả về
        return buses.map(bus => ({
            ...bus,
            images: imagesMap.get(bus.id) || [],
        })) as CombinedBus[];
    }
);


// Thêm mới
// data: { bus: Bus (thông tin xe), newImageUrls: string[] (URL ảnh đã upload) }
export const addBusThunk = createAsyncThunk(
    'buses/addBus', 
    async (data: { bus: Bus, newImageUrls: string[] }) => { 
        const { bus, newImageUrls } = data;
        
        // 1. POST Bus chính (Không đổi)
        const busRes = await fetch(API_URL_BUS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(prepareData(bus)),
        });
        if (!busRes.ok) throw new Error('Không thể thêm xe.');
        const newBus: Bus = await busRes.json();
        
        // A. Fetch tất cả ảnh hiện có để tìm ID lớn nhất
        const allImagesRes = await fetch(API_URL_IMAGE);
        const allImages: BusImage[] = await allImagesRes.json();
        
        const currentMaxId = generateNewImageId(allImages);
        let imageCounter = parseInt(currentMaxId.replace('IMG', '')); 

        // 2. POST các BusImage liên quan
        const imagePromises = newImageUrls.map(url => {
            const newImageId = `IMG${String(imageCounter++).padStart(3, '0')}`; // Tạo ID mới
            
            return fetch(API_URL_IMAGE, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: newImageId, 
                    bus_id: newBus.id, 
                    image_url: url,
                } as Omit<BusImage, 'created_at' | 'updated_at'>), 
            })
        });        
        
        const imageResponses = await Promise.all(imagePromises);
        const newImagesData: BusImage[] = await Promise.all(
            imageResponses.map(res => {
                if (!res.ok) throw new Error('Lỗi khi thêm hình ảnh.');
                return res.json();
            })
        );
        
        // Trả về đối tượng kết hợp
        return { ...newBus, images: newImagesData } as CombinedBus;
    }
);

// Cập nhật
// data: { bus: Bus (thông tin xe), imagesToDelete: string[] (ID ảnh cũ), imagesToAdd: string[] (URL ảnh mới) }
export const updateBusThunk = createAsyncThunk(
    'buses/updateBus', 
    async (data: { bus: Bus, imagesToDelete: string[], imagesToAdd: string[] }) => {
        const { bus, imagesToDelete, imagesToAdd } = data;
        
        // 1. PUT Bus chính
        const busRes = await fetch(`${API_URL_BUS}/${bus.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(prepareData(bus)),
        });
        if (!busRes.ok) throw new Error('Không thể cập nhật xe.');
        const updatedBus: Bus = await busRes.json();

        // 2. DELETE ảnh cũ
        const deletePromises = imagesToDelete.map(id => 
            fetch(`${API_URL_IMAGE}/${id}`, { method: 'DELETE' })
        );
        await Promise.all(deletePromises);

        // 3. POST ảnh mới
        const addPromises = imagesToAdd.map(url =>
            fetch(API_URL_IMAGE, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bus_id: bus.id, image_url: url } as Omit<BusImage, 'id'>)
            })
        );
        await Promise.all(addPromises); // Không cần kết quả POST

        // 4. Fetch lại toàn bộ ảnh hiện tại để đồng bộ state
        const currentImagesRes = await fetch(`${API_URL_IMAGE}?bus_id=${bus.id}`);
        const currentImages: BusImage[] = await currentImagesRes.json();
        
        // Trả về đối tượng kết hợp mới
        return { ...updatedBus, images: currentImages } as CombinedBus;
    }
);

// Xóa
export const deleteBusThunk = createAsyncThunk(
    'buses/deleteBus', 
    async (id: string) => {
        // 1. Fetch tất cả ảnh liên quan
        const imagesRes = await fetch(`${API_URL_IMAGE}?bus_id=${id}`);
        const imagesToDelete: BusImage[] = await imagesRes.json();

        // 2. DELETE tất cả ảnh
        const deleteImagePromises = imagesToDelete.map(img => 
            fetch(`${API_URL_IMAGE}/${img.id}`, { method: 'DELETE' })
        );
        await Promise.all(deleteImagePromises);

        // 3. DELETE Bus chính
        const busRes = await fetch(`${API_URL_BUS}/${id}`, { method: 'DELETE' });
        if (!busRes.ok) throw new Error('Không thể xóa xe.');
        
        return id; 
    }
);

const busSlice = createSlice({
    name: 'buses',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // FETCH (Read)
            .addCase(fetchBusesThunk.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchBusesThunk.fulfilled, (state, action) => {
                state.buses = action.payload;
                state.loading = false;
            })
            .addCase(fetchSimpleBusesThunk.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchSimpleBusesThunk.fulfilled, (state, action) => {
                state.simpleBuses = action.payload; // <-- Lưu vào state mới
                state.loading = false;
            })
            // ADD (Create)
            .addCase(addBusThunk.fulfilled, (state, action) => {
                state.buses.push(action.payload);
                state.loading = false;
            })
            // UPDATE (Update)
            .addCase(updateBusThunk.fulfilled, (state, action) => {
                const index = state.buses.findIndex(b => b.id === action.payload.id);
                if (index !== -1) {
                    state.buses[index] = action.payload; 
                }
                state.loading = false;
            })
            // DELETE (Delete)
            .addCase(deleteBusThunk.fulfilled, (state, action) => {
                state.buses = state.buses.filter(b => b.id !== action.payload);
                state.loading = false;
            })
            // Xử lý lỗi chung
            .addMatcher((action) => action.type.endsWith('/rejected'), (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Lỗi xử lý xe.';
            });
    }
});

export default busSlice.reducer;