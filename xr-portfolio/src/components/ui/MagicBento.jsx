import { useRef, useState, useCallback, useEffect, createContext, useContext } from 'react';

// Context to share mouse position from grid container to all cards
const BentoContext = createContext({ x: 0, y: 0, active: false });

function BentoCard({ children, className = '', style = {} }) {
  const cardRef = useRef(null);
  const containerMouse = useContext(BentoContext); // global mouse from grid
  const [localMouse, setLocalMouse] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [clickRipple, setClickRipple] = useState(null);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const count = 12 + Math.floor(Math.random() * 10);
    const s = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 1.5,
      delay: Math.random() * 4,
      duration: 2 + Math.random() * 3,
    }));
    setStars(s);
  }, []);

  // Convert container-level mouse coords to local card coords
  useEffect(() => {
    if (!containerMouse.active || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setLocalMouse({
      x: containerMouse.x - rect.left,
      y: containerMouse.y - rect.top,
    });
  }, [containerMouse]);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  const handleMouseMove = useCallback((e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setTilt({
      rotateX: ((centerY - y) / centerY) * 4,
      rotateY: ((x - centerX) / centerX) * 4,
    });
  }, []);

  const handleClick = useCallback((e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setClickRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top, id: Date.now() });
    setTimeout(() => setClickRipple(null), 600);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative rounded-xl ${isHovered ? 'p-[3px]' : 'p-[1px]'} ${className}`}
      style={{
        /* Border glow — uses container-level mouse so ALL cards react */
        background: containerMouse.active
          ? `radial-gradient(360px circle at ${localMouse.x}px ${localMouse.y}px, rgba(168, 33, 247, 1), rgba(140,100,255,0.4) 40%, transparent 70%)`
          : 'rgba(204, 119, 253, 0.15)',
        transform: isHovered
          ? `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`
          : 'none',
        transition: 'transform 0.15s ease-out, background 0.1s ease',
        ...style,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      <div className="relative overflow-hidden rounded-[11px] h-full" style={{ background: '#0A0A0F' }}>

        {/* Stars */}
        {stars.map(s => (
          <div key={s.id} className="absolute rounded-full pointer-events-none"
            style={{
              left: `${s.x}%`, top: `${s.y}%`,
              width: s.size, height: s.size,
              background: 'rgba(200,180,255,0.5)',
              animation: `bentoStar ${s.duration}s ${s.delay}s ease-in-out infinite`,
            }}
          />
        ))}

        {/* Inner spotlight glow */}
        <div className="pointer-events-none absolute inset-0 z-0"
          style={{
            opacity: containerMouse.active ? 1 : 0,
            transition: 'opacity 0.3s ease',
            background: `radial-gradient(600px circle at ${localMouse.x}px ${localMouse.y}px, rgba(140,100,255,0.08), transparent 60%)`,
          }}
        />

        {/* Click ripple */}
        {clickRipple && (
          <div className="pointer-events-none absolute z-0" key={clickRipple.id}
            style={{
              left: clickRipple.x - 60, top: clickRipple.y - 60,
              width: 120, height: 120,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(167,139,250,0.3), transparent 70%)',
              animation: 'bentoRipple 0.6s ease-out forwards',
            }}
          />
        )}

        {/* Content */}
        <div className="relative z-10 h-full p-7">{children}</div>
      </div>

      <style>{`
        @keyframes bentoStar {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.7; }
        }
        @keyframes bentoRipple {
          0% { transform: scale(0.5); opacity: 1; }
          100% { transform: scale(3); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default function MagicBento({ children, gridClassName, gridStyle }) {
  const containerRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0, active: false });

  const handleMouseMove = useCallback((e) => {
    setMouse({ x: e.clientX, y: e.clientY, active: true });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouse(prev => ({ ...prev, active: false }));
  }, []);

  return (
    <BentoContext.Provider value={mouse}>
      <div
        ref={containerRef}
        className={gridClassName || "grid gap-3 md:grid-cols-3 md:grid-rows-2"}
        style={gridStyle || { gridAutoRows: 'minmax(180px, auto)' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
    </BentoContext.Provider>
  );
}

MagicBento.Card = BentoCard;
