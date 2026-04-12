type LogoSize = 'sm' | 'md' | 'lg'
type LogoTheme = 'dark' | 'light'

const sizes = {
  sm: { icon: 28, name: 14, sub: 8 },
  md: { icon: 36, name: 18, sub: 9 },
  lg: { icon: 48, name: 24, sub: 11 },
}

export default function AliroxLogo({
  size = 'md',
  theme = 'dark',
}: {
  size?: LogoSize
  theme?: LogoTheme
}) {
  const s = sizes[size]
  const nameColor = theme === 'dark' ? '#ffffff' : '#000000'
  const subColor = theme === 'dark' ? '#00d4a0' : '#0F6E56'

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <rect width="48" height="48" rx="14" fill="#111318" stroke="#00d4a0" strokeWidth="1.5" />
        <text
          x="24"
          y="34"
          textAnchor="middle"
          fill="#00d4a0"
          fontSize="26"
          fontWeight="700"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
        >
          A
        </text>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{ fontSize: s.name, color: nameColor, fontWeight: 700, lineHeight: 1.2 }}>
          Alirox Clinic
        </span>
        <span
          style={{
            fontSize: s.sub,
            color: subColor,
            fontWeight: 600,
            letterSpacing: '0.08em',
            lineHeight: 1.2,
            marginTop: 2,
          }}
        >
          AI DENTAL SOFTWARE
        </span>
      </div>
    </div>
  )
}
