export default function Search() {

return (
    // diem khoi hanh
        <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                w-[83.5%] flex flex-row justify-center gap-3 
                py-[7.3%] px-0 
                "
        >
        <button
            type="button"
        
            className="flex-1 bg-white/90 rounded-lg shadow-md px-6 py-5 text-center min-h-[100px] flex flex-col justify-center hover:shadow-lg transition-shadow cursor-pointer"
        >
            <p className="text-gray-800 font-bold text-sm leading-none mb-1">
            Điểm Khởi Hành
            </p>
            <p className="text-gray-500 text-sm">
                Chọn điểm khởi hành
            </p>
        </button>

        {/*diem den*/}
        <button
            type="button"

            className="flex-1 bg-white/90 rounded-lg shadow-md px-6 py-5 text-center min-h-[100px] flex flex-col justify-center hover:shadow-lg transition-shadow cursor-pointer"
        >
            <p className="text-gray-800 font-bold text-sm leading-none mb-1">
            Điểm Đến
            </p>
            <p className="text-gray-500 text-sm">
                Chọn điểm đến
            </p>
        </button>

        {/*ngay khoi hanh*/}
        <button
            type="button"
            className="flex-1 bg-white/90 rounded-lg shadow-md px-6 py-5 text-center min-h-[100px] flex flex-col justify-center hover:shadow-lg transition-shadow cursor-pointer">
            <p className="text-gray-800 font-bold text-sm leading-none mb-2">Ngày Khởi Hành</p>
            <div className="flex items-center justify-center gap-3 text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                </svg>
                <span className="text-sm">
                    Chọn ngày
                </span>
            </div>
        </button>

            {/*search button*/}
            <div className="flex-1 bg-orange-400 rounded-lg shadow-md px-6 py-5 text-center min-h-[100px] flex flex-col justify-center">
                <button

                className="text-white font-bold text-base flex items-center justify-center gap-3 w-full h-full hover:bg-orange-500 transition-colors rounded-lg"
                >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
                Tìm Chuyến Xe
                </button>
            </div>
        </div>
    );
}