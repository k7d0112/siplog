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