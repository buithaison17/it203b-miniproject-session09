import Search from "../../components/Search";



import BX3 from '../../assets/images/BX-3.png';
import brand from '../../assets/images/brand.png'
import vivutodaybanner from '../../assets/images/vivutodaybanner.png'
import saigonvungtau from '../../assets/images/saigonvungtau.png'
import back from '../../assets/homeIcon/back.png'
import continuebutton from '../../assets/homeIcon/continue.png'
import banner from '../../assets/images/banner.jpg'
import saigonmuine from '../../assets/images/saigonmuine.png'
import saigonnhatrang from '../../assets/images/saigonnhatrang.png'
import nhatrangdalat from '../../assets/images/nhatrangdalat.png'
import nhaxe1 from '../../assets/images/nha-xe1.png'
import nhaxe2 from '../../assets/images/nha-xe2.png'
import nhaxe3 from '../../assets/images/nha-xe3.png'
import benxe1 from '../../assets/images/ben-xe1.png'
import benxe2 from '../../assets/images/ben-xe3.png'
import benxe3 from '../../assets/images/ben-xe6.png'

import saigon from '../../assets/images/saigon.png'
import vungtau from '../../assets/images/vungtau.png'
import dalat from '../../assets/images/dalat.png'
import quynhon from '../../assets/images/quynhon.png'
import hanoi from '../../assets/images/hanoi.png'
import nhatrang from '../../assets/images/nhatrang.png'
import danang from '../../assets/images/danang.png'
import phanthiet from '../../assets/images/phanthiet.png'
import futa from '../../assets/images/futa.png'


import haitugiologo from '../../assets/homeIcon/haitugiologo.png'
import vtcnews from '../../assets/homeIcon/vtcnews.png'
import EvaLogo from '../../assets/homeIcon/EvaLogo.png'
import Afamily from '../../assets/homeIcon/Afamily.png'
import logobaodanang from '../../assets/homeIcon/logobaodanang.png'
import logobaobariavungtau from '../../assets/homeIcon/logobaobariavungtau.png'
import satisfaction from '../../assets/homeIcon/satisfaction.png'
import ribbon from '../../assets/homeIcon/ribbon.png'
import cooperate from '../../assets/homeIcon/cooperate.png'
import telephone from '../../assets/homeIcon/telephone.png'

const HomepageScreen = () => { 
  

  return (
    <>
      <main className="flex flex-col items-center justify-center pt-25">

      <div className="relative">
        <img src={brand} alt="banner" className="w-full hidden lg:block" />
        <img src={vivutodaybanner} alt="mobile banner" className="w-full lg:hidden" />
        <Search></Search>
        
      </div>




        <section className="justify-center w-full max-w-320">
          <h2 className="text-2xl font-bold border-l-4 border-orange-500 pl-4 mb-6">Tuyến Đường Phổ Biến</h2>
          <div className="relative">
            <button id="backListButton" className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-2 rounded-full"><img src={back} alt="prev" className="w-7 h-7" /></button>
            <button id="continueListButton" className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-2 rounded-full"><img src={continuebutton} alt="next" className="w-7 h-7" /></button>
            <div className="overflow-hidden">
              <div className="flex gap-5 justify-center">
                <div className="flex-shrink-0 w-64  bg-white shadow rounded-lg overflow-hidden">
                  <img src={saigonvungtau} alt="" className="w-full h-45 object-cover " />
                  <div className="p-4 text-center"><p className="font-bold text-green-800">Sài Gòn – Vũng Tàu</p><p className="text-blue-700">150.000đ</p></div>
                </div>
                <div className="flex-shrink-0 w-64 bg-white shadow rounded-lg overflow-hidden">
                  <img src={saigonmuine} alt="" className="w-full h-45 object-cover" />
                  <div className="p-4 text-center"><p className="font-bold text-green-800">Sài Gòn – Mũi Né</p><p className="text-blue-700">180.000đ</p></div>
                </div>
                <div className="flex-shrink-0 w-64 bg-white shadow rounded-lg overflow-hidden">
                  <img src={saigonnhatrang} alt="" className="w-full h-45 object-cover" />
                  <div className="p-4 text-center"><p className="font-bold text-green-800">Sài Gòn – Nha Trang</p><p className="text-blue-700">240.000đ</p></div>
                </div>
                <div className="flex-shrink-0 w-64 bg-white shadow rounded-lg overflow-hidden">
                  <img src={nhatrangdalat} alt="" className="w-full h-45 object-cover" />
                  <div className="p-4 text-center"><p className="font-bold text-green-800">Sài Gòn – Đà Lạt</p><p className="text-blue-700">200.000đ</p></div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-8 mt-4 lg:hidden">
            <button id="backListButton2"><img src={back} alt="prev" className="w-7 h-7" /></button>
            <button id="continueListButton2"><img src={continuebutton} alt="next" className="w-7 h-7" /></button>
          </div>
        </section>

        {/* Ưu đãi nổi bật */}
        <br />
        <br />
        <section className="px-4 py-12">
          <h2 className="text-2xl font-bold border-l-4 border-orange-500">Ưu Đãi Nổi Bật</h2> <br />
          <div className="flex items-center gap-6">
            <button id="discountBackButton" className="lg:hidden"><img src="/assets/icons/back.png" alt="prev" className="w-7 h-7" /></button>
            <img src={banner} alt="banner" className="w-full max-w-320" />
            <button id="discountContinueButton" className="lg:hidden"><img src="/assets/icons/continue.png" alt="next" className="w-7 h-7" /></button>
          </div>
        </section>

        <br /><br />
        <section className="max-w-7xl mx-auto px-4 py-12 justify-center max-w-320 w-full">
          <h2 className="text-2xl font-bold border-l-4 border-orange-500 pl-4 mb-6">Nhà Xe Phổ Biến</h2> <br />
          <div className="relative">
            <button id="busListBackButton" className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-2 rounded-full"><img src={back} alt="prev" className="w-7 h-7" /></button>
            <button id="busListContinueButton" className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-2 rounded-full"><img src={continuebutton} alt="next" className="w-7 h-7" /></button>
            <div className="overflow-hidden">
              <div className="flex gap-5 justify-center">
                <div className="flex-shrink-0 w-72 bg-white shadow rounded-lg overflow-hidden">
                  <img src={futa} alt="" className="w-full h-50 object-cover" />
                  <p className="text-center py-4 font-bold">Nhà xe An Hòa Hiệp</p>
                </div>
                <div className="flex-shrink-0 w-72 bg-white shadow rounded-lg overflow-hidden">
                  <img src={nhaxe1} alt="" className="w-full h-50 object-cover" />
                  <p className="text-center py-4 font-bold">Nhà xe Futa Hà Sơn</p>
                </div>
                <div className="flex-shrink-0 w-72 bg-white shadow rounded-lg overflow-hidden">
                  <img src={nhaxe2} alt="" className="w-full h-50 object-cover" />
                  <p className="text-center py-4 font-bold">Nhà xe Vũ Linh</p>
                </div>
                <div className="flex-shrink-0 w-72 bg-white shadow rounded-lg overflow-hidden">
                  <img src={nhaxe3} alt="" className="w-full h-50 object-cover" />
                  <p className="text-center py-4 font-bold">Nhà xe Toàn Thắng</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-8 mt-4 lg:hidden">
            <button id="busListBackButton2"><img src="/assets/icons/back.png" alt="prev" className="w-7 h-7" /></button>
            <button id="busListContinueButton2"><img src="/assets/icons/continue.png" alt="next" className="w-7 h-7" /></button>
          </div>
          <br />
        </section>

        <br />
        <br />
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold border-l-4 border-orange-500 pl-4 mb-8">
              Top Reviews
            </h2>
            <br />

            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-3 lg:gap-4">


              <div className="col-span-2 md:col-span-3 lg:col-span-8 relative overflow-hidden shadow-lg">
                <img src={saigon} alt="Sài Gòn" className="w-full h-full object-cover" />
                <div className="absolute bottom-5 left-6 text-white">
                  <h3 className="text-2xl lg:text-3xl font-bold drop-shadow-2xl">Sài Gòn</h3>
                  <p className="text-lg lg:text-xl drop-shadow-2xl">287 bài viết</p>
                </div>
              </div>

              
              <div className="col-span-2 md:col-span-1 lg:col-span-4 relative overflow-hidden shadow-lg">
                <img src={vungtau} alt="Vũng Tàu" className="w-full h-full object-cover" />
                <div className="absolute bottom-5 left-6 text-white">
                  <h3 className="text-2xl lg:text-3xl font-bold drop-shadow-2xl">Vũng Tàu</h3>
                  <p className="text-lg lg:text-xl drop-shadow-2xl">98 bài viết</p>
                </div>
              </div>
              <div className="col-span-1 lg:col-span-4 relative overflow-hidden">
                <div className="col-span-1 lg:col-span-3 relative overflow-hidden shadow-lg">
                <img src={dalat} alt="Đà Lạt" className="w-full h-full object-cover" />
                <div className="absolute bottom-5 left-6 text-white">
                  <h3 className="text-xl lg:text-2xl font-bold drop-shadow-2xl">Đà Lạt</h3>
                  <p className="text-base drop-shadow-2xl">87 bài viết</p>
                </div>
              </div>
            <br />
              
              <div className="col-span-1 lg:col-span-4 relative overflow-hidden shadow-lg row-span-2">
                <img src={quynhon} alt="Quy Nhơn" className="w-full h-full object-cover" />
                <div className="absolute bottom-5 left-6 text-white">
                  <h3 className="text-xl lg:text-2xl font-bold drop-shadow-2xl">Quy Nhơn</h3>
                  <p className="text-base drop-shadow-2xl">81 bài viết</p>
                </div>
              </div>
              </div>
              

              
              <div className="col-span-2 lg:col-span-8 relative overflow-hidden shadow-lg">
                <img src={hanoi} alt="Hà Nội" className="w-full h-full object-cover" />
                <div className="absolute bottom-5 left-6 text-white">
                  <h3 className="text-2xl lg:text-3xl font-bold drop-shadow-2xl">Hà Nội</h3>
                  <p className="text-lg lg:text-xl drop-shadow-2xl">612 bài viết</p>
                </div>
              </div>

              

          
              <div className="col-span-2 lg:col-span-8 relative overflow-hidden shadow-lg">
                <img src={nhatrang} alt="Nha Trang" className="w-full h-full object-cover" />
                <div className="absolute bottom-5 left-6 text-white">
                  <h3 className="text-3xl lg:text-4xl font-bold drop-shadow-2xl">Nha Trang</h3>
                  <p className="text-xl lg:text-2xl drop-shadow-2xl">557 bài viết</p>
                </div>
              </div>

              <div className="col-span-1 lg:col-span-4 relative overflow-hidden">
                <div className="col-span-1 lg:col-span-4 relative overflow-hidden shadow-lg">
                <img src={danang} alt="Đà Nẵng" className="w-full h-full object-cover" />
                <div className="absolute bottom-5 left-6 text-white text-right right-6 left-auto">
                  <h3 className="text-2xl lg:text-3xl font-bold drop-shadow-2xl">Đà Nẵng</h3>
                  <p className="text-lg lg:text-xl drop-shadow-2xl">570 bài viết</p>
                </div>
              </div>
              <br />
              
              <div className="col-span-1 lg:col-span-4 relative overflow-hidden shadow-lg">
                <img src={phanthiet} alt="Phan Thiết" className="w-full h-full object-cover" />
                <div className="absolute bottom-5 left-6 text-white text-right right-6 left-auto">
                  <h3 className="text-2xl lg:text-3xl font-bold drop-shadow-2xl">Phan Thiết</h3>
                  <p className="text-lg lg:text-xl drop-shadow-2xl">276 bài viết</p>
                </div>
              </div>
              </div>
              

            </div>
          </div>
        </section>
        <br />
        <br />
        <section className="max-w-7xl mx-auto px-4 py-12 w-full">
          <h2 className="text-2xl font-bold border-l-4 border-orange-500 pl-4 mb-6">Bến Xe Phổ Biến</h2> <br />
          <div className="relative justify-center">
            <button id="busStationBackButton" className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-2 rounded-full"><img src={back} alt="prev" className="w-7 h-7" /></button>
            <button id="busStationContinueButton" className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-2 rounded-full"><img src={continuebutton} alt="next" className="w-7 h-7" /></button>
            <div className="overflow-hidden">
              <div className="flex gap-5 justify-center">
                <div className="flex-shrink-0 w-72 bg-white shadow rounded-lg overflow-hidden">
                  <img src={benxe1} alt="" className="w-full h-45 object-cover" />
                  <p className="text-center py-4 font-bold ">Bến xe Miền Đông Mới</p>
                </div>
                <div className="flex-shrink-0 w-72 bg-white shadow rounded-lg overflow-hidden">
                  <img src={benxe2} alt="" className="w-full h-45 object-cover" />
                  <p className="text-center py-4 font-bold">Bến xe Miền Tây</p>
                </div>
                <div className="flex-shrink-0 w-72 bg-white shadow rounded-lg overflow-hidden">
                  <img src={BX3} alt="" className="w-full h-45 object-cover" />
                  <p className="text-center py-4 font-bold">Bến xe Giáp Bát</p>
                </div>
                <div className="flex-shrink-0 w-72 bg-white shadow rounded-lg overflow-hidden">
                  <img src={benxe3} alt="" className="w-full h-45 object-cover" />
                  <p className="text-center py-4 font-bold">Bến xe Mỹ Đình</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-8 mt-4 lg:hidden">
            <button id="busStationBackButton2"><img src="/assets/icons/back.png" alt="prev" className="w-7 h-7" /></button>
            <button id="busStationContinueButton2"><img src="/assets/icons/continue.png" alt="next" className="w-7 h-7" /></button>
          </div>
        </section>

        <br />
        <br />
        <section className="bg-white py-16 w-full max-w-320">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold border-l-4 border-orange-500 pl-4 mb-10 inline-block">Nền Tảng Kết Nối Người Dùng Và Nhà xe</h2> <br />
            <br />
            <div className="grid gap-10">
              <div className="flex items-center gap-6 ">
                <div className="flex items-center gap-6 justify-center">
                <img src={satisfaction} alt="" className="w-16 h-16" />
                <div className="text-left"><p className="font-bold text-lg">ĐÁP ỨNG MỌI NHU CẦU TÌM KIẾM</p><p className="text-sm text-gray-600">Với hơn 5000+ tuyến đường và 1500+ nhà xe trên khắp cả nước</p></div>
              </div>
              <div className="flex items-center gap-6 justify-center">
                                <img src={ribbon} alt="" className="w-16 h-16" />
                <div className="text-left"><p className="font-bold text-lg">ĐẢM BẢO CÓ VÉ</p><p className="text-sm text-gray-600">Hoàn ngay 150% nếu không có vé, mang đến hành trình trọn vẹn</p></div>
              </div>
              </div>
              
                <div className="flex items-center gap-25">
                  <div className="flex items-center gap- justify-center">
                      <img src={cooperate} alt="" className="w-16 h-16" />
                    <div className="text-left"><p className="font-bold text-lg">CAM KẾT GIỮ VÉ</p><p className="text-sm text-gray-600">Vivutoday cam kết hoàn 150% nếu nhà xe không giữ vé</p></div>
                  </div>

                  <div className="flex items-center gap-7 justify-center">
                      <img src={telephone} alt="" className="w-16 h-16" />
                <div className="text-left"><p className="font-bold text-lg">TỔNG ĐÀI HỖ TRỢ KHÁCH HÀNG 24/7</p><p className="text-sm text-gray-600">Giải quyết kịp thời vấn đề của khách hàng một cách nhanh chóng</p></div>
              </div>
                </div>
              
              
              
              
            </div>
          </div>
        </section>
        <br />
        <br />
        <section className="py-12 w-full max-w-320">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold border-l-4 border-orange-500 pl-4 mb-10 inline-block">Vivutoday Được Nhắc Tên Trên</h2>
            <br />
            
            <div className="flex flex-wrap justify-center items-center gap-10">
              <img src={haitugiologo} alt="" className="h-20" />
              <img src={vtcnews} alt="" className="h-11" />
              <img src={EvaLogo} alt="" className="h-20" />
              <img src={Afamily} alt="" className="h-15" />
              <img src={logobaobariavungtau} alt="" className="h-11" />
              <img src={logobaodanang} alt="" className="h-11" />
            </div>
          </div>
        </section>

      </main>
    </>
  );
};

export default HomepageScreen;