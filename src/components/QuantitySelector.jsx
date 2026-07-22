import React from 'react';
import { Button, Space } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

export default function QuantitySelector({
  value = 1,
  onChange,
  min = 1,
  max = 99,
  step = 1,
  disabled = false,
}) {
  // Formats number to always display 2 digits (e.g., 01, 02, 10)
  const formattedCount = String(value).padStart(2, '0');

  const handleDecrement = () => {
    const newValue = Math.max(min, value - step);
    if (onChange && newValue !== value) {
      onChange(newValue);
    }
  };

  const handleIncrement = () => {
    const newValue = Math.min(max, value + step);
    if (onChange && newValue !== value) {
      onChange(newValue);
    }
  };

  const buttonStyle = {
    width: '30px',
    height: '30px',
    borderRadius: '0px',
    border: '1px solid #fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <Space size={16} align="center">
      {/* Decrement Button */}
      <Button
        type="text"
        disabled={disabled || value <= min}
        icon={<MinusOutlined style={{ color: '#fff', fontSize: '14px' }} />}
        onClick={handleDecrement}
        style={buttonStyle}
      />

      {/* Formatted Number Display */}
      <span
        style={{
          color: '#fff',
          fontSize: '18px',
          fontFamily: 'sans-serif',
          fontWeight: '300',
          letterSpacing: '1px',
          minWidth: '40px',
          textAlign: 'center',
          userSelect: 'none',
        }}
      >
        {formattedCount}
      </span>

      {/* Increment Button */}
      <Button
        type="text"
        disabled={disabled || value >= max}
        icon={<PlusOutlined style={{ color: '#fff', fontSize: '14px' }} />}
        onClick={handleIncrement}
        style={buttonStyle}
      />
    </Space>
  );
}