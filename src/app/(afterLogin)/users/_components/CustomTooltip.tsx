import React from 'react';
import { TooltipProps } from 'recharts';

export const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  label,
  payload,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-white p-2 border border-gray-300 rounded shadow'>
        <p className='text-sm'>
          {`${label}：${payload[0].value}円`}
        </p>
      </div>
    );
  }
  return null;
}