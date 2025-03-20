'use client'

import { ReportDetailModalProps } from '@/app/_types/Report';
import { FaPen, FaTrashAlt } from "react-icons/fa";

import React, { useEffect, useState } from 'react';

export const ReportDetailModal: React.FC<ReportDetailModalProps> =({ report, onClose }) => {
  // 編集用の状態管理用state
  const [editedReport, setEditedReport] = useState(report);
  // 編集モードのフラグ
  const [isEditing, setIsEditing] = useState(false);
  // フォームのバリデーションエラーを管理する state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // report propsが変わった際にeditreportを更新
  useEffect(() => {
    setEditedReport(report);
  }, [report]);

  // const handleUpdate = async () => {
  //   try {
  //     const res = await fetch('/api/users/reports', {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(editedReport),
  //     });
  //     if(res.ok) {
  //       alert('レポートを更新しました');
  //       onClose();
  //     } else {
  //       const errorData = await res.json();
  //       alert('更新に失敗しました：' + errorData.status);
  //     }
  //   } catch (error) {
  //     console.error('レポート更新エラー:', error);
  //   }
  // };
   // フォームのバリデーション関数
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (editedReport.title.trim() === '') {
      newErrors.title = 'タイトルを入力してください';
    }
    if (editedReport.content.trim() === '') {
      newErrors.content = '詳細を入力してください';
    }
    if (editedReport.cost === undefined || isNaN(Number(editedReport.cost))) {
      newErrors.cost = '費用を正しく入力してください';
    }
    if (editedReport.type === 'HAND_DRIP') {
      if (editedReport.bitterness === undefined || isNaN(Number(editedReport.bitterness))) {
        newErrors.bitterness = '苦味を正しく入力してください';
      }
      if (editedReport.sweetness === undefined || isNaN(Number(editedReport.sweetness))) {
        newErrors.sweetness = '甘味を正しく入力してください';
      }
      if (editedReport.aroma === undefined || isNaN(Number(editedReport.aroma))) {
        newErrors.aroma = '香りを正しく入力してください';
      }
      if (editedReport.acidity === undefined || isNaN(Number(editedReport.acidity))) {
        newErrors.acidity = '酸味を正しく入力してください';
      }
      if (editedReport.aftertaste === undefined || isNaN(Number(editedReport.aftertaste))) {
        newErrors.aftertaste = '後味を正しく入力してください';
      }
      if (editedReport.roastLevel === undefined || isNaN(Number(editedReport.roastLevel))) {
        newErrors.roastLevel = '焙煎度を正しく入力してください';
      }
      if (!editedReport.beanOrigin || editedReport.beanOrigin.trim() === '') {
        newErrors.beanOrigin = '豆の原産国を入力してください';
      }
    } else if (editedReport.type === 'CAFE') {
      if (!editedReport.cafeName || editedReport.cafeName.trim() === '') {
        newErrors.cafeName = '利用したカフェ名を入力してください';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // バリデーションエラーがあれば中断
    if (!validateForm()) return;

    try {
      const res = await fetch('/api/users/reports', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedReport),
      });
      if (res.ok) {
        alert('更新に成功しました');
        setIsEditing(false);
        onClose();
      } else {
        const errorData = await res.json();
        alert('更新に失敗しました:' + errorData.status);
      }
    } catch (error) {
      console.error('レポート更新エラー', error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('本当にレポートを削除しますか？')) return;
    try {
      const res = await fetch('/api/users/reports', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: report.id,
        }),
      });
      if(res.ok) {
        alert('レポートを削除しました');
        onClose();
      } else {
        const errorData = await res.json();
        alert('レポートの削除に失敗しました' + errorData.status);
      }
    } catch (error) {
      console.error('レポート削除エラー:', error);
    }
  };

  // 通常の表示と編集モードで表示内容を切り替える
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-[9999]'>
      <div className='bg-white p-6 rounded shadow-lg max-w-full w-11/12 max-h-[80%] overflow-y-auto'>
        <div className='mb-4 pb-2 border-b-2 border-mainBlue flex items-center justify-between'>
          <h2 className='text-lg font-bold'>レポート詳細</h2>
          <div className='flex items-center gap-x-3'>
            {/* レポート更新ボタン */}
            <FaPen
              size={15}
              className='fill-mainBlue'
              onClick={() => setIsEditing(true)}
            />
            {/* レポート削除ボタン */}
            <FaTrashAlt
              size={15}
              className='fill-red-600'
              onClick={handleDelete}
            />
          </div>
        </div>
        {isEditing ? (
          <form onSubmit={handleEditSubmit} className="flex flex-col gap-2">
            <label className="text-sm"><strong>タイトル：</strong></label>
            <input
              type="text"
              value={editedReport.title}
              onChange={(e) => setEditedReport({ ...editedReport, title: e.target.value })}
              className="border border-mainGray rounded p-1"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            <label className="text-sm"><strong>詳細：</strong></label>
            <textarea
              value={editedReport.content}
              onChange={(e) => setEditedReport({ ...editedReport, content: e.target.value })}
              className="border border-mainGray rounded p-1"
            />
            {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
            <label className="text-sm"><strong>費用：</strong></label>
            <input
              type="number"
              value={editedReport.cost}
              onChange={(e) => setEditedReport({ ...editedReport, cost: parseInt(e.target.value, 10) })}
              className="border border-mainGray rounded p-1"
            />
            {errors.cost && <p className="text-red-500 text-sm">{errors.cost}</p>}
            {editedReport.type === 'HAND_DRIP' && (
              <>
                <label className="text-sm"><strong>苦味：</strong></label>
                <input
                  type="number"
                  value={editedReport.bitterness ?? ''}
                  onChange={(e) => setEditedReport({ ...editedReport, bitterness: parseInt(e.target.value, 10) || 0 })}
                  className="border border-mainGray rounded p-1"
                />
                {errors.bitterness && <p className="text-red-500 text-sm">{errors.bitterness}</p>}
                <label className="text-sm"><strong>甘味：</strong></label>
                <input
                  type="number"
                  value={editedReport.sweetness ?? ''}
                  onChange={(e) => setEditedReport({ ...editedReport, sweetness: parseInt(e.target.value, 10) || 0 })}
                  className="border border-mainGray rounded p-1"
                />
                {errors.sweetness && <p className="text-red-500 text-sm">{errors.sweetness}</p>}
                <label className="text-sm"><strong>香り：</strong></label>
                <input
                  type="number"
                  value={editedReport.aroma ?? ''}
                  onChange={(e) => setEditedReport({ ...editedReport, aroma: parseInt(e.target.value, 10) || 0 })}
                  className="border border-mainGray rounded p-1"
                />
                {errors.aroma && <p className="text-red-500 text-sm">{errors.aroma}</p>}
                <label className="text-sm"><strong>酸味：</strong></label>
                <input
                  type="number"
                  value={editedReport.acidity ?? ''}
                  onChange={(e) => setEditedReport({ ...editedReport, acidity: parseInt(e.target.value, 10) || 0 })}
                  className="border border-mainGray rounded p-1"
                />
                {errors.acidity && <p className="text-red-500 text-sm">{errors.acidity}</p>}
                <label className="text-sm"><strong>後味：</strong></label>
                <input
                  type="number"
                  value={editedReport.aftertaste ?? ''}
                  onChange={(e) => setEditedReport({ ...editedReport, aftertaste: parseInt(e.target.value, 10) || 0 })}
                  className="border border-mainGray rounded p-1"
                />
                {errors.aftertaste && <p className="text-red-500 text-sm">{errors.aftertaste}</p>}
                <label className="text-sm"><strong>焙煎度：</strong></label>
                <input
                  type="number"
                  value={editedReport.roastLevel ?? ''}
                  onChange={(e) => setEditedReport({ ...editedReport, roastLevel: parseInt(e.target.value, 10) || 0 })}
                  className="border border-mainGray rounded p-1"
                />
                {errors.roastLevel && <p className="text-red-500 text-sm">{errors.roastLevel}</p>}
                <label className="text-sm"><strong>豆の原産国：</strong></label>
                <input
                  type="text"
                  value={editedReport.beanOrigin || ''}
                  onChange={(e) => setEditedReport({ ...editedReport, beanOrigin: e.target.value })}
                  className="border border-mainGray rounded p-1"
                />
                {errors.beanOrigin && <p className="text-red-500 text-sm">{errors.beanOrigin}</p>}
              </>
            )}
            {editedReport.type === 'CAFE' && (
              <>
                <label className="text-sm"><strong>利用したカフェ名：</strong></label>
                <input
                  type="text"
                  value={editedReport.cafeName || ''}
                  onChange={(e) => setEditedReport({ ...editedReport, cafeName: e.target.value })}
                  className="border border-mainGray rounded p-1"
                />
                {errors.cafeName && <p className="text-red-500 text-sm">{errors.cafeName}</p>}
              </>
            )}
            <div className='flex justify-end gap-2 mt-4'>
              <button
                type='button'
                onClick={() => setIsEditing(false)}
                className='px-3 py-1 bg-gray-200 text-mainBlack rounded'
              >
                キャンセル
              </button>
              <button
                type='submit'
                className='px-3 py-1 bg-mainBlue text-white rounded'
              >
                更新
              </button>
            </div>
          </form>
        ) : (
          <>
            <p className='py-1 border-b border-mainGray'><strong>タイトル：</strong>{report.title}</p>
            <p className='py-1 border-b border-mainGray'><strong>詳細：</strong>{report.content}</p>
            <p className='mb-1 py-1 border-b border-mainGray'><strong>費用：</strong>{report.cost} 円</p>
            {report.type === 'HAND_DRIP' && (
              <>
                <p><strong>苦味：</strong>{report.bitterness}<span className='text-mainGray pl-3'>1~5 (1:控えめ、5:苦め)</span></p>
                <p><strong>甘味：</strong>{report.sweetness}<span className='text-mainGray pl-3'>1~5 (1:控えめ、5:甘め)</span></p>
                <p><strong>香り：</strong>{report.aroma}<span className='text-mainGray pl-3'>1~5 (1:控えめ、5:強め)</span></p>
                <p><strong>酸味：</strong>{report.acidity}<span className='text-mainGray pl-3'>1~5 (1:控えめ、5:強め)</span></p>
                <p><strong>後味：</strong>{report.aftertaste}<span className='text-mainGray pl-3'>1~5 (1:キレ、2:コク、3:バランス、4:スッキリ、5:まろやか)</span></p>
                <p><strong>焙煎度：</strong>{report.roastLevel}<span className='text-mainGray pl-3'>1~5 (1:浅煎り(ライトロースト)、5:深煎り(イタリアンロースト))</span></p>
                <p><strong>豆の原産国：</strong>{report.beanOrigin}</p>
              </>
            )}
            {report.type === 'CAFE' && (
              <p><strong>利用したカフェ：</strong>{report.cafeName}</p>
            )}
            <div className='flex justify-end mt-4'>
              <button
                onClick={onClose}
                className='px-3 py-1 bg-gray-200 rounded'
              >
                閉じる
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}