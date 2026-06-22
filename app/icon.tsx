import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#22262B',
          borderRadius: 8,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 80 80" fill="none">
          <path d="M40 6L68 30V54L40 74L12 54V30L40 6Z" stroke="#FFFFFF" strokeWidth="3.5" fill="none" />
          <path d="M40 6L68 30H12L40 6Z" fill="#F27C23" />
          <path
            d="M12 30L12 54L28 54L28 38H52V54L68 54L68 30"
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinecap="square"
            fill="none"
          />
          <path
            d="M40 50V28M40 28L33 35M40 28L47 35"
            stroke="#FFFFFF"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
