import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';

const SCORES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function InterestModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    company: '',
    portfolioScore: 0,
    personScore: 0,
  });

  const handleSubmit = async () => {
    if (!form.company || !form.portfolioScore || !form.personScore) return;
    setLoading(true);
    setError(null);

    const { error: dbError } = await supabase
      .from('interests')
      .insert({
        company: form.company,
        portfolio_score: form.portfolioScore,
        person_score: form.personScore,
      });

    setLoading(false);
    if (dbError) {
      setError('제출에 실패했습니다. 다시 시도해주세요.');
      console.error('Supabase error:', dbError);
      return;
    }
    setSubmitted(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ company: '', portfolioScore: 0, personScore: 0 });
    }, 300);
  };

  return (
    <>
      {/* Floating Button — Top Right */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-8 z-50 flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] font-semibold cursor-pointer"
        style={{
          background: 'rgba(167, 139, 250, 0.12)',
          border: '1px solid rgba(167, 139, 250, 0.25)',
          color: 'rgba(167, 139, 250, 0.9)',
          backdropFilter: 'blur(16px)',
          letterSpacing: '0.02em',
        }}
        whileHover={{
          background: 'rgba(167, 139, 250, 0.2)',
          border: '1px solid rgba(167, 139, 250, 0.4)',
          scale: 1.03,
        }}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <line x1="19" y1="8" x2="19" y2="14" />
          <line x1="22" y1="11" x2="16" y2="11" />
        </svg>
        피드백 남기기
      </motion.button>

      {/* Modal Overlay + Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0"
              style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(8px)' }}
              onClick={handleClose}
            />

            {/* Modal Card */}
            <motion.div
              className="relative w-full max-w-md mx-4 rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(14, 16, 22, 0.95)',
                border: '1px solid rgba(167, 139, 250, 0.15)',
                boxShadow: '0 24px 80px rgba(0, 0, 0, 0.5), 0 0 40px rgba(167, 139, 250, 0.05)',
              }}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              {!submitted ? (
                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-lg font-bold" style={{ color: '#F3F6FB' }}>관심 인력 추가하기</h3>
                      <p className="text-[12px] mt-1" style={{ color: '#546178' }}>유희수에 대한 채용 관심도를 남겨주세요.</p>
                    </div>
                    <button
                      onClick={handleClose}
                      className="w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer"
                      style={{ background: 'rgba(255,255,255,0.05)' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#546178" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>

                  {/* Company Name */}
                  <div className="mb-7">
                    <label className="block text-[11px] font-semibold mb-2.5 tracking-wide" style={{ color: 'rgba(167, 139, 250, 0.6)', textTransform: 'uppercase' }}>
                      사명을 기재해주세요
                    </label>
                    <input
                      type="text"
                      placeholder="귀사명을 입력해주세요"
                      value={form.company}
                      onChange={e => setForm(prev => ({ ...prev, company: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg text-[13px] outline-none transition-all duration-200"
                      style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: '#F3F6FB',
                      }}
                      onFocus={e => e.currentTarget.style.borderColor = 'rgba(167, 139, 250, 0.4)'}
                      onBlur={e => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
                    />
                  </div>

                  {/* Person Interest Score */}
                  <ScoreSelector
                    label="사람에 대한 흥미도"
                    value={form.personScore}
                    onChange={v => setForm(prev => ({ ...prev, personScore: v }))}
                    accentColor="rgba(167, 139, 250, 0.8)"
                  />

                  {/* Portfolio Score */}
                  <ScoreSelector
                    label="포트폴리오에 대한 점수"
                    value={form.portfolioScore}
                    onChange={v => setForm(prev => ({ ...prev, portfolioScore: v }))}
                    accentColor="rgba(111, 216, 255, 0.8)"
                  />

                  {/* Error Message */}
                  {error && (
                    <p className="text-[12px] text-center mb-3" style={{ color: '#ef4444' }}>{error}</p>
                  )}

                  {/* Submit */}
                  <motion.button
                    onClick={handleSubmit}
                    disabled={!form.company || !form.portfolioScore || !form.personScore || loading}
                    className="w-full mt-2 py-3 rounded-xl text-[13px] font-semibold transition-all duration-200 cursor-pointer"
                    style={{
                      background: form.company && form.portfolioScore && form.personScore
                        ? 'rgba(167, 139, 250, 0.2)'
                        : 'rgba(255, 255, 255, 0.03)',
                      border: form.company && form.portfolioScore && form.personScore
                        ? '1px solid rgba(167, 139, 250, 0.3)'
                        : '1px solid rgba(255, 255, 255, 0.06)',
                      color: form.company && form.portfolioScore && form.personScore
                        ? 'rgba(167, 139, 250, 0.9)'
                        : '#546178',
                    }}
                    whileHover={form.company && form.portfolioScore && form.personScore ? { scale: 1.01 } : {}}
                    whileTap={form.company && form.portfolioScore && form.personScore ? { scale: 0.99 } : {}}
                  >
                    {loading ? '전송 중...' : '피드백 보내기'}
                  </motion.button>
                </div>
              ) : (
                /* Success State */
                <motion.div
                  className="p-8 text-center py-16"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="w-16 h-16 mx-auto mb-5 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(167, 139, 250, 0.1)' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(167, 139, 250, 0.8)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: '#F3F6FB' }}>소중한 시간 내어주셔서 감사합니다</h3>
                  <p className="text-[13px] mb-1" style={{ color: '#546178' }}>
                    <span style={{ color: 'rgba(167, 139, 250, 0.8)' }}>{form.company}</span>에서 보내주신 피드백을 확인했습니다.
                  </p>
                  <button
                    onClick={handleClose}
                    className="px-8 py-2.5 rounded-full text-[12px] font-medium cursor-pointer transition-all duration-200"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#98A4BA',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                  >
                    확인
                  </button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Score Selector Component ── */
function ScoreSelector({ label, value, onChange, accentColor }) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <label className="text-[11px] font-semibold tracking-wide" style={{ color: 'rgba(167, 139, 250, 0.6)', textTransform: 'uppercase' }}>
          {label}
        </label>
        {value > 0 && (
          <span className="text-[20px] font-bold" style={{ color: accentColor }}>{value}</span>
        )}
      </div>
      <div className="flex gap-1.5">
        {SCORES.map(s => {
          const isSelected = s <= value;
          return (
            <button
              key={s}
              onClick={() => onChange(s)}
              className="flex-1 h-9 rounded-md text-[11px] font-semibold transition-all duration-150 cursor-pointer"
              style={{
                background: isSelected ? `${accentColor.replace('0.8', '0.15')}` : 'rgba(255, 255, 255, 0.03)',
                border: isSelected ? `1px solid ${accentColor.replace('0.8', '0.3')}` : '1px solid rgba(255, 255, 255, 0.06)',
                color: isSelected ? accentColor : '#3A4A5E',
              }}
              onMouseEnter={e => {
                if (!isSelected) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                }
              }}
              onMouseLeave={e => {
                if (!isSelected) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                }
              }}
            >
              {s}
            </button>
          );
        })}
      </div>
    </div>
  );
}
