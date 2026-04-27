import React from 'react';

const ProceduralGroundBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10" aria-hidden>
      {/* Base dark */}
      <div className="absolute inset-0" style={{ background: '#07070D' }} />

      {/* Violet radial glow — top left */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 80% 60% at 20% 10%, rgba(91,79,233,0.18) 0%, transparent 60%)',
      }} />

      {/* Blue glow — right */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 60% 50% at 85% 30%, rgba(67,56,202,0.12) 0%, transparent 55%)',
      }} />

      {/* Bottom fade */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.6) 100%)',
      }} />

      {/* Animated slow pulse glow */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(91,79,233,0.07) 0%, transparent 70%)',
          animation: 'bgPulse 8s ease-in-out infinite',
        }}
      />
    </div>
  );
};

export default ProceduralGroundBackground;
