import { useState } from 'react';
import useSWR from 'swr';
// import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
// import { FaPlus, FaPen, FaTrashAlt } from "react-icons/fa";
import { BarChartComponent, PieChartComponent, RadarChartComponent } from "./Chart";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "@/app/globals.css";
import { ReportModal } from './ReportModal';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import { BarChartData, MutateReport, PieChartData, RadarChartData, ReportsResponse } from '@/app/_types/Report';
import { ReportDetailModal } from './ReportDetailModal';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

export const MypageReports = () => {
  const { token } = useSupabaseSession();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // レポート詳細表示用のレポートを保管するstate
  const [selectedReport, setSelectedReport] = useState<MutateReport | null>(null);

  // useSWR により /api/reports から最新のレポート一覧を取得
  const fetcher = (url: string): Promise<ReportsResponse> => {
    if (!token) return Promise.reject(new Error('No token'));
    return fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    }).then((res) => res.json());
  };
  // const { data: reports, mutate } = useSWR("/api/users/reports", fetcher);

  const { data, mutate } = useSWR<ReportsResponse>(token ? "/api/users/reports" : null, fetcher);
  // ReportModal.tsx でレポートが新規作成されたときのコールバック
  const handleReportCreated = () => {
    // mutate() を呼び出して最新データを再取得
    mutate();
    // デバッグ用
    console.log(data);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
  }

  const handleReportClick = (report: MutateReport) => {
    setSelectedReport(report);
  }

  // 取得したレポートデータを元にグラフ用のデータを生成(整形)する
  let barChartData: BarChartData[] = [];
  let pieChartCafeData:PieChartData[] = [];
  let pieChartHandDripData:PieChartData[] = [];
  let radarChartData: RadarChartData[] = [];

  if (data && data.reports && Array.isArray(data.reports)) {
    const reports = data.reports;
    // 棒グラフ用データ:月毎の費用計算
    barChartData = reports.reduce<BarChartData[]>((acc, report) => {
      const date = new Date(report.createdAt);
      const month = `${date.getFullYear()}/${('0' + (date.getMonth() + 1)).slice(-2)}`;
      const existing = acc.find(item => item.month === month);
      if (existing) {
        existing.cost += report.cost;
      } else {
        acc.push({ month, cost: report.cost });
      }
      return acc;
    }, []);
    // データの表示順を古い→新しいにソート
    barChartData.sort((a, b) => a.month.localeCompare(b.month));

    // 円グラフ用データ:カフェ名または豆の原産国名毎に集計
    const cafePieReports = reports.filter(r => r.type === 'CAFE');
    const handDripPieReports = reports.filter(r => r.type === 'HAND_DRIP');
    // カフェデータの集計
    if (cafePieReports.length > 0) {
      // カフェ名と件数を集計
      const cafeCountMap = new Map<string, number>();
      cafePieReports.forEach((report) => {
        const cafeName = report.cafeName || '不明カフェ';
        cafeCountMap.set(cafeName, (cafeCountMap.get(cafeName) || 0) + 1);
      });
      pieChartCafeData = Array.from(cafeCountMap.entries()).map(([name, count]) => ({
        name,
        value: count,
      }));
    }
    // ハンドドリップの集計
    if (handDripPieReports.length > 0) {
      // 原産国名と件数の集計
      const originCountMap = new Map<string, number>();
      handDripPieReports.forEach((report) => {
        const origin = report.beanOrigin || '無名原産国';
        originCountMap.set(origin, (originCountMap.get(origin) || 0) + 1);
      });
      pieChartHandDripData = Array.from(originCountMap.entries()).map(([name, count]) => ({
        name,
        value: count,
      }));
    }

    // レーダーチャート:ハンドドリップレポートの各評価の平均値

    const handDripReports = reports.filter(r => r.type === 'HAND_DRIP');
    if (handDripReports.length > 0) {
      const sums = handDripReports.reduce((acc, r) => {
        acc.bitterness += r.bitterness ?? 0;
        acc.sweetness += r.sweetness ?? 0;
        acc.aroma += r.aroma ?? 0;
        acc.acidity += r.acidity ?? 0;
        acc.aftertaste += r.aftertaste ?? 0;
        acc.roastLevel += r.roastLevel ?? 0;
        return acc;
      }, { bitterness: 0, sweetness: 0, aroma: 0, acidity: 0, aftertaste: 0, roastLevel: 0 });
      radarChartData = [
        { subject: '苦味', value: sums.bitterness / handDripReports.length },
        { subject: '甘味', value: sums.sweetness / handDripReports.length },
        { subject: '香り', value: sums.aroma / handDripReports.length },
        { subject: '酸味', value: sums.acidity / handDripReports.length },
        { subject: '後味', value: sums.aftertaste / handDripReports.length },
        { subject: '焙煎度', value: sums.roastLevel / handDripReports.length },
      ];
    }
  }

  const isLoading = (data === undefined);

  return(
    <>
      {/* 新規レポート作成用モーダル */}
      {isModalOpen && (
        <ReportModal
          onClose={handleModalClose}
          onReportCreated={handleReportCreated}
        />
      )}

      {/* 詳細表示用モーダル */}
      {selectedReport && (
        <ReportDetailModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}

      {/* swiperで任意にスライドできるスライドを実装予定 */}
      {isLoading ? (
        <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className='w-[350px] h-[350px] mx-auto shadow-md relative bg-white'
      >
        {[...Array(4)].map((_, index) => (
          <SwiperSlide key={index}>
            <div className='flex items-center justify-center w-full h-full'>
              <Skeleton width={300} height={300} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      ) : (
        <>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            className='w-[350px] h-[350px] mx-auto shadow-md relative bg-white'
          >
            <SwiperSlide>
              <BarChartComponent data={barChartData} />
            </SwiperSlide>
            <SwiperSlide>
              {/* ハンドドリップ用円グラフ */}
              <PieChartComponent data={pieChartHandDripData} title='ハンドドリップ用グラフ' />
            </SwiperSlide>
            <SwiperSlide>
              {/* カフェ用円グラフ */}
              <PieChartComponent data={pieChartCafeData} title='カフェ用グラフ' />
            </SwiperSlide>
            <SwiperSlide>
              <RadarChartComponent data={radarChartData} />
            </SwiperSlide>
          </Swiper>

          {/* 個人レポート表示エリア */}
          <div className='w-full mt-4 mb-10 mx-auto shadow-md border border-lineGray bg-white'>
            {/* レポートヘッダー */}
            <div className='w-full flex items-center justify-between py-2 px-3'>
              <div className='flex items-center gap-x-1'>
                <p className='font-noto text-mainBlack font-medium text-xs'>レポート一覧</p>
                {/* <MdArrowLeft size={25} className='fill-mainBlack' />
                現在の日付からデフォルトの月を表示し、前後のボタンを押すことで前後の月のレポートを表示で記すようにする
                <span className='font-noto font-normal text-mainBlack text-xs'>2024/12</span>
                <MdArrowRight size={25} className='fill-mainBlack' /> */}
              </div>
              <div onClick={handleModalOpen} className='cursor-pointer ml-auto'>
                <FaPlus size={20} className='fill-mainBlue'/>
              </div>
            </div>
            {/* レポート一覧 */}
            <ul className='border-t border-lineGray'>
              {isLoading ? (
                <>
                  {[...Array(3)].map((_, index) => (
                    <li
                      key={index}
                      className='flex items-center justify-between border-b border-lineGray px-3 py-2'
                    >
                      <div className='flex items-center gap-x-2'>
                        <Skeleton width={80} height={16} />
                        <Skeleton width={50} height={16} />
                      </div>
                    </li>
                  ))}
                </>
              ) : (
                data && data.reports && Array.isArray(data.reports) ? (
                  data.reports.map((report) => (
                    <li
                      key={report.id}
                      className='flex items-center justify-between border-b border-lineGray px-3 py-2 cursor-pointer'
                      onClick={() => handleReportClick(report)}
                    >
                      <div className='flex items-center gap-x-2'>
                        <span className='font-noto font-normal text-mainBlack text-xs'>
                          {/* {report.createdAt.substring(0, 10)} */}
                          {new Date(report.createdAt).toLocaleDateString()}
                        </span>
                        <span className='font-noto font-medium text-mainBlue text-xs'>
                          {report.type === 'CAFE' ? 'カフェ' : 'ハンドドリップ'}
                        </span>
                      </div>
                      {/* <div className='flex items-center gap-x-3'>
                        <FaPen size={15} className='fill-mainBlue' />
                        <FaTrashAlt size={15} className='fill-red-600' />
                      </div> */}
                    </li>
                  ))
                ) : (
                  <li className='p-3'>レポートはまだ登録されていません。</li>
                )
              )}
              {/* {data && data.reports && Array.isArray(data.reports) ? (
                data.reports.map((report) => (
                  <li
                    key={report.id}
                    className='flex items-center justify-between border-b border-lineGray px-3 py-2 cursor-pointer'
                    onClick={() => handleReportClick(report)}
                  >
                    <div className='flex items-center gap-x-2'>
                      <span className='font-noto font-normal text-mainBlack text-xs'>
                        {report.createdAt.substring(0, 10)}
                        {new Date(report.createdAt).toLocaleDateString()}
                      </span>
                      <span className='font-noto font-medium text-mainBlue text-xs'>
                        {report.type === 'CAFE' ? 'カフェ' : 'ハンドドリップ'}
                      </span>
                    </div>
                    <div className='flex items-center gap-x-3'>
                      <FaPen size={15} className='fill-mainBlue' />
                      <FaTrashAlt size={15} className='fill-red-600' />
                    </div>
                  </li>
                ))
              ) : (
                <li className='p-3'>レポートはまだ登録されていません。</li>
              )} */}
              {/* <li className='flex items-center justify-between border-b border-lineGray px-3 py-2'>
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
              </li> */}
            </ul>
          </div>
        </>
      )}
    </>
  );
}