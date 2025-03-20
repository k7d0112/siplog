'use client'

import { useState } from 'react';
import { FormErrors, ReportModalProps } from '../_types/Report';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';

export const ReportModal: React.FC<ReportModalProps> = ({ onClose, onReportCreated }) => {
  // タブ切り替え用
  const [reportType, setReportType] = useState<'HAND_DRIP' | 'CAFE'>('HAND_DRIP');
  // 共有項目
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [cost, setCost] = useState('');
  // ハンドドリップ専用項目
  const [bitterness, setBitterness] = useState('');
  const [sweetness, setSweetness] = useState('');
  const [aroma, setAroma] = useState('');
  const [acidity, setAcidity] = useState('');
  const [aftertaste, setAftertaste] = useState('');
  const [roastLevel, setRoastLevel] = useState('');
  const [beanOrigin, setBeanOrigin] = useState('');
  // カフェ専用項目
  const [cafeName, setCafeName] = useState('');
  // 各入力欄のエラーメッセージを管理する state
  const [errors, setErrors] = useState<FormErrors>({});

  // userId を session から取得
  const { session, token } = useSupabaseSession();
  const userId = session?.user.id;
  if (!userId) {
    return <p>ログイン情報が取得できませんでした。</p>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 新しいエラーオブジェクトの作成
    const newErrors: FormErrors = {};

    // 共有項目のバリデーション
    if (title.trim() === "") {
      newErrors.title = "レポートタイトルを入力してください";
    }
    if (content.trim() === "") {
      newErrors.content = "レポート詳細を入力してください";
    }
    if (cost.trim() === "" || isNaN(parseInt(cost.trim(), 10))) {
      newErrors.cost = "費用を正しく入力してください";
    }

    // レポート種別ごとのバリデーション
    if (reportType === "HAND_DRIP") {
      if (bitterness.trim() === "" || isNaN(parseInt(bitterness.trim(), 10))) {
        newErrors.bitterness = "苦味を正しく入力してください";
      }
      if (sweetness.trim() === "" || isNaN(parseInt(sweetness.trim(), 10))) {
        newErrors.sweetness = "甘味を正しく入力してください";
      }
      if (aroma.trim() === "" || isNaN(parseInt(aroma.trim(), 10))) {
        newErrors.aroma = "香りを正しく入力してください";
      }
      if (acidity.trim() === "" || isNaN(parseInt(acidity.trim(), 10))) {
        newErrors.acidity = "酸味を正しく入力してください";
      }
      if (aftertaste.trim() === "" || isNaN(parseInt(aftertaste.trim(), 10))) {
        newErrors.aftertaste = "後口を正しく入力してください";
      }
      if (roastLevel.trim() === "" || isNaN(parseInt(roastLevel.trim(), 10))) {
        newErrors.roastLevel = "焙煎度を正しく入力してください";
      }
      if (beanOrigin.trim() === "") {
        newErrors.beanOrigin = "豆の原産国を入力してください";
      }
    } else if (reportType === "CAFE") {
      if (cafeName.trim() === "") {
        newErrors.cafeName = "利用したカフェ名を入力してください";
      }
    }

    // エラーがあれば state を更新して送信処理を中断
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // エラーがなければエラー表示をクリア
    setErrors({});

    // 各数値フィールドは trim した上で parseInt を実施する
    const payload: any = {
      userId,
      type: reportType,
      title: title.trim(),
      content: content.trim(),
      cost: parseInt(cost.trim(), 10),
      ...(reportType === 'HAND_DRIP'
        ? {
            bitterness: parseInt(bitterness.trim(), 10),
            sweetness: parseInt(sweetness.trim(), 10),
            aroma: parseInt(aroma.trim(), 10),
            acidity: parseInt(acidity.trim(), 10),
            aftertaste: parseInt(aftertaste.trim(), 10),
            roastLevel: parseInt(roastLevel.trim(), 10),
            beanOrigin: beanOrigin.trim(),
          }
        : {
            cafeName: cafeName.trim(),
          }),
    };

    // デバッグ用に payload を出力（必要に応じて削除）
    console.log("Payload:", payload);

    try {
      const res = await fetch('/api/users/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: token, // 必要ならここにトークンを追加する
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        onReportCreated();
        onClose();
      } else {
        // レスポンスのエラーメッセージを取得して表示（デバッグ用）
        const errorData = await res.json();
        console.error('レポートの作成に失敗しました', errorData);
      }
    } catch (error) {
      console.error('レポート作成中にエラーが発生しました:', error);
    }
  };

  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-[9999]'>
      <div className='bg-white p-6 rounded shadow-lg max-w-full w-11/12 max-h-[80%] overflow-y-auto'>
        <h2 className='text-lg font-bold mb-4'>レポート作成</h2>
        {/* タブ切り替え */}
        <div className='flex space-x-4 border-b mb-4'>
          <button
            type='button'
            className={`py-2 px-4 ${
              reportType === 'HAND_DRIP'
                ? 'border-b-2 border-blue-500 font-semibold'
                : 'text-gray-600'
            }`}
            onClick={() => setReportType('HAND_DRIP')}
          >
            ハンドドリップ
          </button>
          <button
            type='button'
            className={`py-2 px-4 ${
              reportType === 'CAFE'
                ? 'border-b-2 border-blue-500 font-semibold'
                : 'text-gray-600'
            }`}
            onClick={() => setReportType('CAFE')}
          >
            カフェ
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* 共通項目 */}
          <div>
            <label className='block text-sm mb-1'>レポートタイトル</label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='w-full border border-gray-300 rounded p-1'
              required
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>
          <div>
            <label className='block text-sm mb-1'>レポート詳細</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className='w-full border border-gray-300 rounded p-1'
              required
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">{errors.content}</p>
            )}
          </div>
          <div>
            <label className='block text-sm mb-1'>費用</label>
            <input
              type='number'
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className='w-full border border-gray-300 rounded p-1'
              required
              placeholder='1000'
            />
            {errors.cost && (
              <p className="text-red-500 text-sm mt-1">{errors.cost}</p>
            )}
          </div>

          {/* レポート種別ごとの入力項目 */}
          {reportType === 'HAND_DRIP' && (
            <>
              <div>
                <label className='block text-sm mb-1'>苦味</label>
                <input
                  type='number'
                  value={bitterness}
                  onChange={(e) => setBitterness(e.target.value)}
                  className='w-full border border-gray-300 rounded p-1'
                  required
                  placeholder='1~5(1:控えめ、5:苦め)'
                />
                {errors.bitterness && (
                  <p className="text-red-500 text-sm mt-1">{errors.bitterness}</p>
                )}
              </div>
              <div>
                <label className='block text-sm mb-1'>甘味</label>
                <input
                  type='number'
                  value={sweetness}
                  onChange={(e) => setSweetness(e.target.value)}
                  className='w-full border border-gray-300 rounded p-1'
                  required
                  placeholder='1~5(1:控えめ、5:甘め)'
                />
                {errors.sweetness && (
                  <p className="text-red-500 text-sm mt-1">{errors.sweetness}</p>
                )}
              </div>
              <div>
                <label className='block text-sm mb-1'>香り</label>
                <input
                  type='number'
                  value={aroma}
                  onChange={(e) => setAroma(e.target.value)}
                  className='w-full border border-gray-300 rounded p-1'
                  required
                  placeholder='1~5(1:控えめ、5:強め)'
                />
                {errors.aroma && (
                  <p className="text-red-500 text-sm mt-1">{errors.aroma}</p>
                )}
              </div>
              <div>
                <label className='block text-sm mb-1'>酸味</label>
                <input
                  type='number'
                  value={acidity}
                  onChange={(e) => setAcidity(e.target.value)}
                  className='w-full border border-gray-300 rounded p-1'
                  required
                  placeholder='1~5(1:控えめ、5:強め)'
                />
                {errors.acidity && (
                  <p className="text-red-500 text-sm mt-1">{errors.acidity}</p>
                )}
              </div>
              <div>
                <label className='block text-sm mb-1'>後口</label>
                <input
                  type='number'
                  value={aftertaste}
                  onChange={(e) => setAftertaste(e.target.value)}
                  className='w-full border border-gray-300 rounded p-1'
                  required
                  placeholder='1~5(1:キレ、2:コク、3:バランス、4:スッキリ、5:まろやか)'
                />
                {errors.aftertaste && (
                  <p className="text-red-500 text-sm mt-1">{errors.aftertaste}</p>
                )}
              </div>
              <div>
                <label className='block text-sm mb-1'>焙煎度</label>
                <input
                  type='number'
                  value={roastLevel}
                  onChange={(e) => setRoastLevel(e.target.value)}
                  className='w-full border border-gray-300 rounded p-1'
                  required
                  placeholder='1~5(1:浅煎り(ライトロースト)、5:深煎り(イタリアンロースト))'
                />
                {errors.roastLevel && (
                  <p className="text-red-500 text-sm mt-1">{errors.roastLevel}</p>
                )}
              </div>
              <div>
                <label className='block text-sm mb-1'>豆の原産国</label>
                <input
                  type='text'
                  value={beanOrigin}
                  onChange={(e) => setBeanOrigin(e.target.value)}
                  className='w-full border border-gray-300 rounded p-1'
                  required
                  placeholder='例) コスタリカ'
                />
                {errors.beanOrigin && (
                  <p className="text-red-500 text-sm mt-1">{errors.beanOrigin}</p>
                )}
              </div>
            </>
          )}
          {reportType === 'CAFE' && (
            <div>
              <label className='block text-sm mb-1'>利用したカフェ名</label>
              <input
                type='text'
                value={cafeName}
                onChange={(e) => setCafeName(e.target.value)}
                className='w-full border border-gray-300 rounded p-1'
                required
                placeholder='例) スターバックス'
              />
              {errors.cafeName && (
                <p className="text-red-500 text-sm mt-1">{errors.cafeName}</p>
              )}
            </div>
          )}
          <div className='flex justify-end gap-2 mt-4'>
            <button type='button' onClick={onClose} className='px-3 py-1 bg-gray-200 rounded'>
              キャンセル
            </button>
            <button type='submit' className='px-3 py-1 bg-blue-500 text-white rounded'>
              作成
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};