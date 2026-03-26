export default function SectionLabel({ children, color = 'text-violet-400' }) {
  return (
    <span className={`text-label ${color} block mb-4`}>
      {children}
    </span>
  );
}
