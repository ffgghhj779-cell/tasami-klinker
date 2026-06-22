import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'TASAMI INDUSTRIAL — Premium Saudi Clinker Supply';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #22262B 0%, #2d3238 50%, #1a1d21 100%)',
          padding: '64px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: '#F27C23',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px',
              fontWeight: 800,
            }}
          >
            T
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: 'white', fontSize: '28px', fontWeight: 800, letterSpacing: '0.05em' }}>
              TASAMI INDUSTRIAL
            </span>
            <span style={{ color: '#F27C23', fontSize: '18px', fontWeight: 600 }}>
              تسامي الصناعية
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '900px' }}>
          <span style={{ color: 'white', fontSize: '52px', fontWeight: 800, lineHeight: 1.15 }}>
            Premium Saudi Clinker Supply
          </span>
          <span style={{ color: '#9CA3AF', fontSize: '24px', lineHeight: 1.4 }}>
            Global standards · Full documentation · Reliable delivery schedules
          </span>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          {['ISO 9001', 'SGS', 'SAUDI MADE', 'ISO 14001'].map((badge) => (
            <div
              key={badge}
              style={{
                padding: '8px 16px',
                borderRadius: '999px',
                border: '2px solid #F27C23',
                color: '#F27C23',
                fontSize: '14px',
                fontWeight: 700,
              }}
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
