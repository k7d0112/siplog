// レポート新規作成モーダルコンポーネント用型
export type ReportModalProps = {
  onClose: () => void,
  onReportCreated: () => void,
}

// レポート作成時バリデーション後のエラーの型
export type FormErrors = {
  title?: string,
  content?: string,
  cost?: string,
  bitterness?: string,
  sweetness?: string,
  aroma?: string,
  acidity?: string,
  aftertaste?: string,
  roastLevel?: string,
  beanOrigin?: string,
  cafeName?: string,
}

type ReportType = 'HAND_DRIP' | 'CAFE';

export type ReportPayloadBase = {
  userId: string,
  type: ReportType,
  title: string,
  content: string,
  cost: number,
}

type HandDripPayload = ReportPayloadBase & {
  type: 'HAND_DRIP',
  bitterness: number,
  sweetness: number,
  aroma: number,
  acidity: number,
  aftertaste: number,
  roastLevel: number,
  beanOrigin: string,
}

type CafePayload = ReportPayloadBase & {
  type: 'CAFE',
  cafeName: string,
}

export type ReportPayload = HandDripPayload | CafePayload;