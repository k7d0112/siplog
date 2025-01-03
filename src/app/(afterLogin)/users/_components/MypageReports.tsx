import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { FaPlus, FaPen, FaTrashAlt } from "react-icons/fa";
import { BarChartComponent, PieChartComponent, RadarChartComponent } from "./Chart";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "@/app/globals.css";

export const MypageReports = () => {
  return(
    <>
      {/* swiperで任意にスライドできるスライドを実装予定 */}
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        className='w-[350px] h-[350px] mx-auto shadow-md relative'
      >
        <SwiperSlide>
          <BarChartComponent/>
        </SwiperSlide>
        <SwiperSlide>
          <PieChartComponent/>
        </SwiperSlide>
        <SwiperSlide>
          <RadarChartComponent/>
        </SwiperSlide>
      </Swiper>

      {/* 個人レポートの一覧表示を実装予定 */}
      <div className='w-full mt-4 mx-auto shadow-md border border-lineGray'>
        {/* レポートヘッダー */}
        <div className='w-full flex items-center justify-between py-2 px-3'>
          <div className='flex items-center gap-x-1'>
            <MdArrowLeft size={25} className='fill-mainBlack' />
            <span className='font-noto font-normal text-mainBlack text-xs'>2024/12</span>
            <MdArrowRight size={25} className='fill-mainBlack' />
          </div>
          <div>
            <FaPlus size={20} className='fill-mainBlue' />
          </div>
        </div>
        {/* レポート一覧 */}
        <ul className='border-t border-lineGray'>
          {/* レポート詳細はモーダルで表示 */}
          <button
            className='w-full'
          >
            <li className='flex items-center justify-between border-b border-lineGray px-3 py-2'>
              <div className='flex items-center gap-x-2'>
                <span className='font-noto font-normal text-mainBlack text-xs'>2024/12/17</span>
                <span className='font-noto font-medium text-mainBlue text-xs'>カフェ</span>
              </div>
              <div className='flex items-center gap-x-3'>
                <FaPen size={15} className='fill-mainBlue' />
                <FaTrashAlt size={15} className='fill-red-600' />
              </div>
            </li>
          </button>
          <li className='flex items-center justify-between border-b border-lineGray px-3 py-2'>
            <div className='flex items-center gap-x-2'>
              <span className='font-noto font-normal text-mainBlack text-xs'>2024/12/17</span>
              <span className='font-noto font-medium text-mainBlue text-xs'>カフェ</span>
            </div>
            <div className='flex items-center gap-x-3'>
              <FaPen size={15} className='fill-mainBlue' />
              <FaTrashAlt size={15} className='fill-red-600' />
            </div>
          </li>
          <li className='flex items-center justify-between border-b border-lineGray px-3 py-2'>
            <div className='flex items-center gap-x-2'>
              <span className='font-noto font-normal text-mainBlack text-xs'>2024/12/17</span>
              <span className='font-noto font-medium text-mainBlue text-xs'>カフェ</span>
            </div>
            <div className='flex items-center gap-x-3'>
              <FaPen size={15} className='fill-mainBlue' />
              <FaTrashAlt size={15} className='fill-red-600' />
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}