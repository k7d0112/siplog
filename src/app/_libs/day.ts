// APIで取得したcreatedAtやupdateAtなどの日付データをday.jsを使って表示フォーマットを整える
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

// UTCとタイムゾーンを考慮するためのプラグインを適応
dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDate = (date: string) => {
  return dayjs.utc(date).tz('Asia/Tokyo').format('YYYY/MM/DD');
}

export const formatCreatedAt = (date: Date) => {
  return dayjs.utc(date).tz('Asia/Tokyo').format('MM/DD HH:mm');
}