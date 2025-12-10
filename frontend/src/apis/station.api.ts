import type { Station } from '../interfaces/Station';

// Đã cập nhật cổng API
const API_URL = 'http://localhost:8080/stations'; 

// Hàm chuyển đổi Date objects thành chuỗi ISO (Chỉ cần thiết khi gửi đi, giữ nguyên)
// Lưu ý: Hàm này giả định dữ liệu đầu vào là Station (có thể là string hoặc Date, cần cẩn thận)
const prepareData = (station: any) => ({
    ...station,
    // Đảm bảo là string ISO, nếu input là Date object thì dùng toISOString()
    created_at: typeof station.created_at === 'string' ? station.created_at : station.created_at.toISOString(),
    updated_at: typeof station.updated_at === 'string' ? station.updated_at : station.updated_at.toISOString(),
});

// Lấy danh sách
export async function fetchStationsApi(): Promise<Station[]> {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Lỗi khi lấy dữ liệu bến xe.');
    
    // TRẢ VỀ CHUỖI NGÀY THÁNG GỐC để Redux Store lưu trữ
    const data: Station[] = await response.json();
    return data; 
}

// Thêm mới
export async function addStationApi(station: Station): Promise<Station> {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prepareData(station)),
    });
    if (!response.ok) throw new Error('Không thể thêm bến xe.');
    
    // TRẢ VỀ CHUỖI NGÀY THÁNG GỐC
    return response.json();
}

// Cập nhật
export async function updateStationApi(station: Station): Promise<Station> {
    const response = await fetch(`${API_URL}/${station.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prepareData(station)),
    });
    if (!response.ok) throw new Error('Không thể cập nhật bến xe.');
    
    // TRẢ VỀ CHUỖI NGÀY THÁNG GỐC
    return response.json();
}

// Xóa
export async function deleteStationApi(id: string): Promise<string> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Không thể xóa bến xe.');
    return id; 
}