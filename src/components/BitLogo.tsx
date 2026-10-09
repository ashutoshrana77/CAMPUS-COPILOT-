import React from 'react';

interface BitLogoProps {
  size?: number | string;
  className?: string;
  showText?: boolean;
}

export const BitLogo: React.FC<BitLogoProps> = ({ size = 64, className = '', showText = false }) => {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-md select-none"
      >
        <defs>
          <radialGradient id="bitSun" cx="50%" cy="38%" r="45%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="70%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </radialGradient>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
          <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#0b2265" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Dark Navy Circle */}
        <circle cx="120" cy="120" r="116" fill="#0b257a" stroke="url(#goldGradient)" strokeWidth="6" />
        <circle cx="120" cy="120" r="108" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* Inner Ring Divider */}
        <circle cx="120" cy="120" r="76" fill="url(#bitSun)" stroke="url(#goldGradient)" strokeWidth="4" />

        {/* Sun rays behind the shield */}
        <g stroke="#fef08a" strokeWidth="2.5" opacity="0.85">
          <line x1="120" y1="46" x2="120" y2="58" />
          <line x1="102" y1="50" x2="107" y2="60" />
          <line x1="138" y1="50" x2="133" y2="60" />
          <line x1="86" y1="58" x2="94" y2="66" />
          <line x1="154" y1="58" x2="146" y2="66" />
          <line x1="74" y1="72" x2="84" y2="78" />
          <line x1="166" y1="72" x2="156" y2="78" />
        </g>

        {/* Top Text Arc: BIT */}
        <path id="topTextArc" d="M 50 120 A 70 70 0 0 1 190 120" fill="none" />
        <text
          x="120"
          y="35"
          fill="#ffffff"
          fontSize="24"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          textAnchor="middle"
          letterSpacing="4"
          filter="drop-shadow(0px 1px 2px rgba(0,0,0,0.6))"
        >
          BIT
        </text>

        {/* Left and Right Rosettes near BIT */}
        <g fill="#fbbf24" stroke="#78350f" strokeWidth="0.6">
          {/* Top Left Rosette */}
          <circle cx="70" cy="34" r="10" fill="#fbbf24" />
          <circle cx="70" cy="34" r="5" fill="#0b257a" />
          <path d="M 70 24 L 70 44 M 60 34 L 80 34" stroke="#0b257a" strokeWidth="1.5" />

          {/* Top Right Rosette */}
          <circle cx="170" cy="34" r="10" fill="#fbbf24" />
          <circle cx="170" cy="34" r="5" fill="#0b257a" />
          <path d="M 170 24 L 170 44 M 160 34 L 180 34" stroke="#0b257a" strokeWidth="1.5" />

          {/* Mid Left Rosette */}
          <circle cx="26" cy="115" r="9" fill="#fbbf24" />
          <circle cx="26" cy="115" r="4" fill="#0b257a" />
          <path d="M 26 106 L 26 124 M 17 115 L 35 115" stroke="#0b257a" strokeWidth="1.2" />

          {/* Mid Right Rosette */}
          <circle cx="214" cy="115" r="9" fill="#fbbf24" />
          <circle cx="214" cy="115" r="4" fill="#0b257a" />
          <path d="M 214 106 L 214 124 M 205 115 L 223 115" stroke="#0b257a" strokeWidth="1.2" />

          {/* Bottom Left Rosette */}
          <circle cx="65" cy="195" r="9" fill="#fbbf24" />
          <circle cx="65" cy="195" r="4.5" fill="#0b257a" />

          {/* Bottom Right Rosette */}
          <circle cx="175" cy="195" r="9" fill="#fbbf24" />
          <circle cx="175" cy="195" r="4.5" fill="#0b257a" />
        </g>

        {/* Bottom Text: INDIA */}
        <text
          x="120"
          y="214"
          fill="#ffffff"
          fontSize="21"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          textAnchor="middle"
          letterSpacing="4"
          filter="drop-shadow(0px 1px 2px rgba(0,0,0,0.6))"
        >
          INDIA
        </text>

        {/* Heraldic Shield in Center */}
        <g>
          {/* Shield Base */}
          <path
            d="M 76 75 C 76 75, 120 72, 120 72 C 120 72, 164 75, 164 75 C 164 122, 148 152, 120 166 C 92 152, 76 122, 76 75 Z"
            fill="url(#shieldGrad)"
            stroke="url(#goldGradient)"
            strokeWidth="3.5"
          />

          {/* Shield Inner Border */}
          <path
            d="M 82 81 C 82 81, 120 78, 120 78 C 120 78, 158 81, 158 81 C 158 118, 144 145, 120 158 C 96 145, 82 118, 82 81 Z"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="1.2"
            opacity="0.8"
          />

          {/* Traditional Knowledge Diya (Lamp) */}
          {/* Lamp Base Pedestal */}
          <rect x="105" y="132" width="30" height="6" rx="2" fill="#fbbf24" stroke="#78350f" strokeWidth="0.8" />
          <rect x="110" y="127" width="20" height="5" rx="1.5" fill="#fbbf24" stroke="#78350f" strokeWidth="0.8" />

          {/* Lamp Body (Deepak Bowl & Handle) */}
          <path
            d="M 94 108 C 96 122, 110 128, 120 128 C 130 128, 144 122, 146 108 C 152 108, 158 114, 155 120 C 152 126, 142 125, 142 125 C 138 129, 130 130, 120 130 C 108 130, 98 126, 94 108 Z"
            fill="url(#goldGradient)"
            stroke="#78350f"
            strokeWidth="1"
          />

          {/* Lamp Handle ring */}
          <ellipse cx="148" cy="116" rx="6" ry="8" fill="none" stroke="#fbbf24" strokeWidth="2.5" />

          {/* Central Dome on Diya */}
          <ellipse cx="120" cy="108" rx="8" ry="4" fill="#fbbf24" stroke="#78350f" strokeWidth="0.8" />
          <circle cx="120" cy="104" r="3" fill="#fef08a" />

          {/* Diya Wick & Glowing Flame */}
          <path
            d="M 97 106 C 96 98, 98 94, 99 92 C 101 95, 102 99, 101 106 Z"
            fill="#fef08a"
            stroke="#f59e0b"
            strokeWidth="1"
          />
          <path
            d="M 98 104 C 97 97, 98 93, 99 91 C 100 93, 101 97, 100 104 Z"
            fill="#ffffff"
          />
        </g>

        {/* Flourishing Leaves / Wheat stalks on left and right */}
        <g stroke="#fbbf24" strokeWidth="2.5" fill="none">
          {/* Left Wing Ribbon / Sheaf */}
          <path d="M 72 102 C 60 114, 52 136, 68 152 C 76 142, 74 120, 72 102 Z" fill="#fbbf24" opacity="0.95" stroke="#78350f" strokeWidth="0.8" />
          {/* Right Wing Ribbon / Sheaf */}
          <path d="M 168 102 C 180 114, 188 136, 172 152 C 164 142, 166 120, 168 102 Z" fill="#fbbf24" opacity="0.95" stroke="#78350f" strokeWidth="0.8" />
        </g>

        {/* Ribbon Banner at bottom: सिद्धिर्भवति कर्मजा */}
        <g>
          {/* Ribbon scroll background */}
          <path
            d="M 52 166 C 70 178, 170 178, 188 166 C 182 178, 172 188, 120 188 C 68 188, 58 178, 52 166 Z"
            fill="#fbbf24"
            stroke="#78350f"
            strokeWidth="1.2"
          />
          {/* Ribbon tails */}
          <polygon points="52,166 42,176 56,177" fill="#d97706" />
          <polygon points="188,166 198,176 184,177" fill="#d97706" />

          {/* Sanskrit Motto: सिद्धिर्भवति कर्मजा */}
          <text
            x="120"
            y="179"
            fill="#0b2265"
            fontSize="10.5"
            fontWeight="bold"
            fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
            textAnchor="middle"
            letterSpacing="0.5"
          >
            सिद्धिर्भवति कर्मजा
          </text>
        </g>
      </svg>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold tracking-tight text-blue-950 text-lg leading-tight">
              BHARAT INSTITUTE OF TECHNOLOGY
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-amber-600 tracking-wider uppercase">
              Campus Copilot • Academic AI
            </span>
            <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.2 rounded-full border border-blue-200">
              BIT INDIA
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
