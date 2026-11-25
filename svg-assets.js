/**
 * Generadores de gráficos vectoriales SVG inline dibujados por código.
 * Sin imágenes externas ni URLs de placeholders.
 */
(function (app) {
  function getIconSvg(name) {
  const icons = {
    speaker: `
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" opacity="0.2"></polygon>
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
      </svg>`,
    shield: `
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#1E6B40" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#2E8B57" opacity="0.18"></path>
        <path d="M9 12l2 2 4-4"></path>
      </svg>`,
    lock: `
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="5" y="11" width="14" height="10" rx="2"></rect>
        <path d="M8 11V7a4 4 0 0 1 8 0v4"></path>
      </svg>`
  };
  return icons[name] || '';
}

/**
 * Personaje guía: Tupak, el cóndor andino caricaturesco y amable
 * con su collar blanco característico y bufanda andina colorida.
 */
  function getTupakSvg(mood = 'happy') {
  const eyeStyle = mood === 'celebrate'
    ? `<path d="M86 68 Q91 62 96 68" fill="none" stroke="#1A242B" stroke-width="3" stroke-linecap="round"/>
       <path d="M114 68 Q119 62 124 68" fill="none" stroke="#1A242B" stroke-width="3" stroke-linecap="round"/>`
    : `<circle cx="91" cy="67" r="6.5" fill="#FFFFFF"/>
       <circle cx="92" cy="67" r="3.5" fill="#1A242B"/>
       <circle cx="93.5" cy="65.5" r="1.2" fill="#FFFFFF"/>
       <circle cx="119" cy="67" r="6.5" fill="#FFFFFF"/>
       <circle cx="118" cy="67" r="3.5" fill="#1A242B"/>
       <circle cx="119.5" cy="65.5" r="1.2" fill="#FFFFFF"/>`;

  return `
    <svg class="tupak-svg" viewBox="0 0 210 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Tupak el cóndor andino">
      <!-- Sombra suave -->
      <ellipse cx="105" cy="196" rx="52" ry="8" fill="#1A242B" opacity="0.12"/>

      <!-- Cola -->
      <path d="M86 155 L74 185 L98 176 L105 188 L114 176 L136 185 L124 155 Z" fill="#23323D"/>

      <!-- Ala izquierda -->
      <g class="tupak-wing-left">
        <path d="M68 110 C32 102, 16 128, 28 152 C40 164, 62 150, 74 136 Z" fill="#2B3D4B"/>
        <path d="M35 138 C46 136, 56 130, 66 124" stroke="#DCE5EB" stroke-width="4" stroke-linecap="round" fill="none"/>
      </g>

      <!-- Ala derecha -->
      <g class="tupak-wing-right">
        <path d="M142 110 C178 102, 194 128, 182 152 C170 164, 148 150, 136 136 Z" fill="#2B3D4B"/>
        <path d="M175 138 C164 136, 154 130, 144 124" stroke="#DCE5EB" stroke-width="4" stroke-linecap="round" fill="none"/>
      </g>

      <!-- Cuerpo -->
      <ellipse cx="105" cy="134" rx="40" ry="44" fill="#2B3D4B"/>
      <ellipse cx="105" cy="140" rx="24" ry="30" fill="#3D5263"/>

      <!-- Patas -->
      <path d="M90 174 L86 190 M86 190 L78 192 M86 190 L92 193" stroke="#D97724" stroke-width="5" stroke-linecap="round"/>
      <path d="M120 174 L124 190 M124 190 L118 193 M124 190 L132 192" stroke="#D97724" stroke-width="5" stroke-linecap="round"/>

      <!-- Collar blanco característico del cóndor -->
      <path d="M66 102 C68 118, 84 124, 105 124 C126 124, 142 118, 144 102 C136 94, 122 96, 105 96 C88 96, 74 94, 66 102 Z" fill="#FFFDF7" stroke="#DCE5EB" stroke-width="2"/>
      <circle cx="80" cy="108" r="9" fill="#FFFDF7"/>
      <circle cx="96" cy="112" r="10" fill="#FFFDF7"/>
      <circle cx="114" cy="112" r="10" fill="#FFFDF7"/>
      <circle cx="130" cy="108" r="9" fill="#FFFDF7"/>

      <!-- Bufanda colorida con motivos andinos -->
      <g class="tupak-scarf-tail">
        <path d="M122 108 L154 132 L140 144 L114 118 Z" fill="#D97724"/>
        <path d="M128 114 L147 129" stroke="#F4B400" stroke-width="4"/>
        <polygon points="136,126 141,130 136,134 131,130" fill="#FFFDF7"/>
        <line x1="142" y1="142" x2="146" y2="149" stroke="#F4B400" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="148" y1="138" x2="152" y2="145" stroke="#1D6FA5" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="153" y1="133" x2="157" y2="140" stroke="#2E8B57" stroke-width="2.5" stroke-linecap="round"/>
      </g>
      <path d="M74 100 Q105 116 136 100 L134 111 Q105 126 76 111 Z" fill="#D97724"/>
      <path d="M78 104 Q105 119 132 104" stroke="#F4B400" stroke-width="3.5" fill="none"/>
      <path d="M84 108 Q105 120 126 108" stroke="#1D6FA5" stroke-width="2.5" stroke-dasharray="5 4" fill="none"/>

      <!-- Cabeza y cresta -->
      <path d="M94 42 C96 28, 114 28, 116 42 C110 46, 100 46, 94 42 Z" fill="#C94A38"/>
      <ellipse cx="105" cy="70" rx="28" ry="27" fill="#E39A89"/>
      <ellipse cx="105" cy="74" rx="23" ry="20" fill="#F0B5A6"/>

      <!-- Ojos -->
      ${eyeStyle}

      <!-- Mejillas amables -->
      <circle cx="80" cy="77" r="4.5" fill="#D97724" opacity="0.35"/>
      <circle cx="130" cy="77" r="4.5" fill="#D97724" opacity="0.35"/>

      <!-- Pico curvo amigable -->
      <path d="M95 75 Q105 70 115 75 Q113 89 105 92 Q97 89 95 75 Z" fill="#F4B400" stroke="#D97724" stroke-width="2"/>
      <path d="M98 80 Q105 85 112 80" fill="none" stroke="#1A242B" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `;
}

  const AVATARS = [
  { id: 'condor', label: 'Cóndor Andino' },
  { id: 'tortuga', label: 'Tortuga Gigante' },
  { id: 'jaguar', label: 'Jaguar Amazónico' },
  { id: 'iguana', label: 'Iguana Marina' }
];

  function getAvatarSvg(avatarId) {
  const map = {
    condor: `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="40" r="38" fill="#E4F2FB"/>
        <path d="M22 68 C22 50, 58 50, 58 68" fill="#2B3D4B"/>
        <path d="M26 54 Q40 62 54 54" stroke="#FFFDF7" stroke-width="6" fill="none" stroke-linecap="round"/>
        <circle cx="40" cy="36" r="16" fill="#E39A89"/>
        <path d="M34 21 Q40 13 46 21" fill="#C94A38"/>
        <circle cx="34" cy="34" r="3" fill="#1A242B"/>
        <circle cx="46" cy="34" r="3" fill="#1A242B"/>
        <path d="M35 40 Q40 48 45 40 Z" fill="#F4B400"/>
      </svg>`,
    tortuga: `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="40" r="38" fill="#EAF7EF"/>
        <path d="M18 54 C18 32, 62 32, 62 54 Z" fill="#2E8B57"/>
        <polygon points="40,36 48,43 45,52 35,52 32,43" fill="#F4B400" opacity="0.6"/>
        <circle cx="60" cy="46" r="10" fill="#5BB381"/>
        <circle cx="63" cy="44" r="2.2" fill="#1A242B"/>
        <path d="M58 49 Q62 52 65 49" stroke="#1A242B" stroke-width="1.8" fill="none" stroke-linecap="round"/>
        <rect x="24" y="54" width="8" height="10" rx="4" fill="#5BB381"/>
        <rect x="48" y="54" width="8" height="10" rx="4" fill="#5BB381"/>
      </svg>`,
    jaguar: `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="40" r="38" fill="#FFF4CC"/>
        <circle cx="24" cy="24" r="8" fill="#D97724"/>
        <circle cx="56" cy="24" r="8" fill="#D97724"/>
        <circle cx="40" cy="43" r="22" fill="#F4B400"/>
        <ellipse cx="40" cy="49" rx="11" ry="8" fill="#FFFDF7"/>
        <circle cx="32" cy="38" r="3" fill="#1A242B"/>
        <circle cx="48" cy="38" r="3" fill="#1A242B"/>
        <polygon points="36,46 44,46 40,51" fill="#1A242B"/>
        <circle cx="27" cy="44" r="2.2" fill="#9E4E0D"/>
        <circle cx="53" cy="44" r="2.2" fill="#9E4E0D"/>
      </svg>`,
    iguana: `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="40" r="38" fill="#E8F5FC"/>
        <path d="M24 26 L28 19 L33 25 L38 18 L43 25 L48 19 L52 26" fill="#D97724"/>
        <ellipse cx="40" cy="44" rx="20" ry="18" fill="#2E8B57"/>
        <ellipse cx="40" cy="50" rx="14" ry="10" fill="#8CD4A9"/>
        <circle cx="32" cy="40" r="3" fill="#1A242B"/>
        <circle cx="48" cy="40" r="3" fill="#1A242B"/>
        <path d="M33 50 Q40 55 47 50" stroke="#1A242B" stroke-width="2" fill="none" stroke-linecap="round"/>
      </svg>`
  };
  return map[avatarId] || map.condor;
}

/**
 * Mapa SVG interactivo del Ecuador dividido en 4 regiones desbloqueables
 */
  function getEcuadorMapSvg(regionStatuses) {
  const getFill = (id, baseColor) => {
    const st = regionStatuses[id]?.status || 'locked';
    if (st === 'locked') return '#CBD5DF';
    return baseColor;
  };

  const getBadgeIcon = (id, x, y) => {
    const st = regionStatuses[id]?.status || 'locked';
    if (st === 'completed') {
      return `
        <g transform="translate(${x}, ${y})">
          <circle cx="0" cy="0" r="14" fill="#FFFDF7" stroke="#2E8B57" stroke-width="2.5"/>
          <path d="M-6 0 L-2 4 L6 -4" fill="none" stroke="#2E8B57" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </g>`;
    }
    if (st === 'available') {
      return `
        <g transform="translate(${x}, ${y})">
          <circle cx="0" cy="0" r="14" fill="#F4B400" stroke="#1A242B" stroke-width="2"/>
          <text x="0" y="5" text-anchor="middle" font-size="14" font-weight="800" fill="#1A242B">★</text>
        </g>`;
    }
    return `
      <g transform="translate(${x}, ${y})">
        <circle cx="0" cy="0" r="14" fill="#EFF3F6" stroke="#6B7C8A" stroke-width="2"/>
        <rect x="-5" y="-1" width="10" height="8" rx="1.5" fill="#6B7C8A"/>
        <path d="M-3 -1 V-4 A3 3 0 0 1 3 -4 V-1" fill="none" stroke="#6B7C8A" stroke-width="2"/>
      </g>`;
  };

  return `
    <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mapa interactivo de las 4 regiones del Ecuador">
      <!-- Océano Pacífico -->
      <rect x="0" y="0" width="500" height="400" rx="20" fill="#DDF0FA"/>
      <path d="M20 340 Q70 330 120 340 T220 340" fill="none" stroke="#1D6FA5" stroke-width="2.5" opacity="0.25"/>
      <path d="M30 220 Q70 212 110 220" fill="none" stroke="#1D6FA5" stroke-width="2.5" opacity="0.25"/>

      <!-- NIVEL 4: GALÁPAGOS (Recuadro Insular) -->
      <g class="map-region-group" data-region-id="galapagos" data-status="${regionStatuses.galapagos.status}" tabindex="0" role="button" aria-label="Nivel 4: Región Galápagos">
        <rect x="18" y="24" width="142" height="118" rx="16" fill="#C7E6F7" stroke="#1D6FA5" stroke-width="2.5" stroke-dasharray="6 4"/>
        <path d="M46 68 C38 58, 56 46, 68 58 C76 68, 62 84, 48 80 Z" fill="${getFill('galapagos', '#1D6FA5')}"/>
        <circle cx="92" cy="60" r="11" fill="${getFill('galapagos', '#1D6FA5')}"/>
        <path d="M95 82 C90 74, 114 72, 118 84 C116 96, 98 96, 95 82 Z" fill="${getFill('galapagos', '#1D6FA5')}"/>
        <text x="89" y="122" text-anchor="middle" font-size="14" font-weight="800" fill="#1A242B">4. Galápagos</text>
        ${getBadgeIcon('galapagos', 136, 44)}
      </g>

      <!-- NIVEL 1: COSTA -->
      <g class="map-region-group" data-region-id="costa" data-status="${regionStatuses.costa.status}" tabindex="0" role="button" aria-label="Nivel 1: Región Costa">
        <path d="M238 48 L266 56 L254 148 L244 246 L236 308 L210 296 L186 248 L174 196 L192 140 L212 88 Z"
              fill="${getFill('costa', '#1D6FA5')}" stroke="#FFFDF7" stroke-width="3" stroke-linejoin="round"/>
        <text x="212" y="192" text-anchor="middle" font-size="16" font-weight="800" fill="#FFFFFF">1. Costa</text>
        ${getBadgeIcon('costa', 214, 146)}
      </g>

      <!-- NIVEL 2: SIERRA -->
      <g class="map-region-group" data-region-id="sierra" data-status="${regionStatuses.sierra.status}" tabindex="0" role="button" aria-label="Nivel 2: Región Sierra">
        <path d="M266 56 L328 52 L338 112 L318 190 L306 276 L278 352 L242 346 L236 308 L244 246 L254 148 Z"
              fill="${getFill('sierra', '#D97724')}" stroke="#FFFDF7" stroke-width="3" stroke-linejoin="round"/>
        <text x="285" y="194" text-anchor="middle" font-size="16" font-weight="800" fill="#FFFFFF">2. Sierra</text>
        ${getBadgeIcon('sierra', 290, 140)}
      </g>

      <!-- NIVEL 3: AMAZONÍA -->
      <g class="map-region-group" data-region-id="amazonia" data-status="${regionStatuses.amazonia.status}" tabindex="0" role="button" aria-label="Nivel 3: Región Amazonía">
        <path d="M328 52 L416 62 L464 136 L444 218 L392 268 L342 318 L278 352 L306 276 L318 190 L338 112 Z"
              fill="${getFill('amazonia', '#2E8B57')}" stroke="#FFFDF7" stroke-width="3" stroke-linejoin="round"/>
        <text x="386" y="194" text-anchor="middle" font-size="16" font-weight="800" fill="#FFFFFF">3. Amazonía</text>
        ${getBadgeIcon('amazonia', 390, 140)}
      </g>

      <!-- Brújula decorativa -->
      <g transform="translate(454, 346)">
        <circle cx="0" cy="0" r="22" fill="#FFFDF7" stroke="#1D6FA5" stroke-width="2"/>
        <polygon points="0,-16 5,0 0,-3 -5,0" fill="#D97724"/>
        <polygon points="0,16 5,0 0,3 -5,0" fill="#1D6FA5"/>
        <text x="0" y="-25" text-anchor="middle" font-size="11" font-weight="800" fill="#1A242B">N</text>
      </g>
    </svg>
  `;
}

/**
 * Paisajes vectoriales distintos para cada región
 */
  function getRegionSceneSvg(regionId) {
  const scenes = {
    costa: `
      <svg viewBox="0 0 900 220" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <rect width="900" height="220" fill="#7AC5EC"/>
        <circle cx="760" cy="58" r="36" fill="#F4B400"/>
        <path d="M0 148 Q150 128 300 148 T600 148 T900 148 L900 220 L0 220 Z" fill="#1D6FA5"/>
        <path d="M0 175 Q220 158 450 175 T900 175 L900 220 L0 220 Z" fill="#F4D38A"/>
        <!-- Palmeras -->
        <path d="M120 185 Q134 125 148 90" stroke="#9E4E0D" stroke-width="10" fill="none" stroke-linecap="round"/>
        <path d="M148 90 Q112 72 92 94" stroke="#2E8B57" stroke-width="10" fill="none" stroke-linecap="round"/>
        <path d="M148 90 Q180 72 204 94" stroke="#2E8B57" stroke-width="10" fill="none" stroke-linecap="round"/>
        <path d="M148 90 Q148 56 176 62" stroke="#2E8B57" stroke-width="10" fill="none" stroke-linecap="round"/>
      </svg>`,
    sierra: `
      <svg viewBox="0 0 900 220" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <rect width="900" height="220" fill="#9BD0F0"/>
        <ellipse cx="180" cy="55" rx="46" ry="16" fill="#FFFDF7" opacity="0.9"/>
        <ellipse cx="700" cy="48" rx="58" ry="18" fill="#FFFDF7" opacity="0.9"/>
        <!-- Volcanes nevados -->
        <polygon points="180,220 380,44 580,220" fill="#A65514"/>
        <polygon points="325,92 380,44 435,92 405,104 380,90 355,104" fill="#FFFDF7"/>
        <polygon points="480,220 670,58 860,220" fill="#D97724"/>
        <polygon points="622,99 670,58 718,99 692,108 670,96 648,108" fill="#FFFDF7"/>
        <path d="M0 185 Q240 160 480 185 T900 185 L900 220 L0 220 Z" fill="#2E8B57"/>
      </svg>`,
    amazonia: `
      <svg viewBox="0 0 900 220" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <rect width="900" height="220" fill="#BEEAD0"/>
        <circle cx="720" cy="52" r="30" fill="#F4B400" opacity="0.85"/>
        <!-- Copas de selva -->
        <circle cx="110" cy="145" r="78" fill="#1E6B40"/>
        <circle cx="240" cy="155" r="85" fill="#2E8B57"/>
        <circle cx="680" cy="150" r="88" fill="#1E6B40"/>
        <circle cx="810" cy="145" r="76" fill="#2E8B57"/>
        <!-- Río amazónico -->
        <path d="M320 220 C370 175, 510 165, 560 135 C590 116, 480 115, 450 135 C390 175, 220 180, 170 220 Z" fill="#1D6FA5"/>
        <rect y="185" width="900" height="35" fill="#2E8B57" opacity="0.55"/>
      </svg>`,
    galapagos: `
      <svg viewBox="0 0 900 220" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <rect width="900" height="220" fill="#8CD0F5"/>
        <circle cx="160" cy="56" r="32" fill="#F4B400"/>
        <rect y="140" width="900" height="80" fill="#1D6FA5"/>
        <!-- Islas volcánicas -->
        <path d="M220 155 Q310 85 400 155 Z" fill="#465763"/>
        <path d="M510 155 Q620 75 740 155 Z" fill="#2E8B57"/>
        <!-- Olas -->
        <path d="M40 180 Q90 170 140 180 T240 180" fill="none" stroke="#FFFDF7" stroke-width="4" opacity="0.6"/>
        <path d="M620 188 Q670 178 720 188 T820 188" fill="none" stroke="#FFFDF7" stroke-width="4" opacity="0.6"/>
      </svg>`
  };
  return scenes[regionId] || scenes.costa;
}

/**
 * 4 insignias regionales SVG inline
 */
  function getBadgeSvg(regionId) {
  const badges = {
    costa: `
      <svg viewBox="0 0 72 72" width="54" height="54" xmlns="http://www.w3.org/2000/svg">
        <circle cx="36" cy="36" r="32" fill="#1D6FA5" stroke="#F4B400" stroke-width="4"/>
        <circle cx="36" cy="28" r="10" fill="#F4B400"/>
        <path d="M14 44 Q25 38 36 44 T58 44" fill="none" stroke="#FFFDF7" stroke-width="4" stroke-linecap="round"/>
      </svg>`,
    sierra: `
      <svg viewBox="0 0 72 72" width="54" height="54" xmlns="http://www.w3.org/2000/svg">
        <circle cx="36" cy="36" r="32" fill="#D97724" stroke="#F4B400" stroke-width="4"/>
        <polygon points="16,52 36,18 56,52" fill="#FFFDF7"/>
        <polygon points="28,32 36,18 44,32" fill="#E4F2FB"/>
        <polygon points="16,52 28,32 44,32 56,52" fill="#9E4E0D"/>
      </svg>`,
    amazonia: `
      <svg viewBox="0 0 72 72" width="54" height="54" xmlns="http://www.w3.org/2000/svg">
        <circle cx="36" cy="36" r="32" fill="#2E8B57" stroke="#F4B400" stroke-width="4"/>
        <path d="M36 16 C50 22, 54 40, 36 56 C18 40, 22 22, 36 16 Z" fill="#FFFDF7"/>
        <line x1="36" y1="22" x2="36" y2="54" stroke="#2E8B57" stroke-width="3" stroke-linecap="round"/>
      </svg>`,
    galapagos: `
      <svg viewBox="0 0 72 72" width="54" height="54" xmlns="http://www.w3.org/2000/svg">
        <circle cx="36" cy="36" r="32" fill="#15537C" stroke="#F4B400" stroke-width="4"/>
        <path d="M18 44 C18 26, 52 26, 52 44 Z" fill="#F4B400"/>
        <circle cx="54" cy="40" r="6" fill="#FFFDF7"/>
        <line x1="24" y1="44" x2="24" y2="52" stroke="#FFFDF7" stroke-width="4" stroke-linecap="round"/>
        <line x1="44" y1="44" x2="44" y2="52" stroke="#FFFDF7" stroke-width="4" stroke-linecap="round"/>
      </svg>`
  };
  return badges[regionId] || badges.costa;
}

  /**
   * Camino serpenteante SVG inline con 12 estaciones distribuidas en 4 paisajes regionales:
   * Costa (1-3), Sierra (4-6), Amazonía (7-9) y Galápagos (10-12).
   */
  function getWindingTrailMapSvg(session, stationsMeta, fromStation = null) {
    const coords = {
      1: { x: 115, y: 675 },
      2: { x: 310, y: 650 },
      3: { x: 505, y: 675 },
      4: { x: 505, y: 490 },
      5: { x: 310, y: 465 },
      6: { x: 115, y: 490 },
      7: { x: 115, y: 300 },
      8: { x: 310, y: 275 },
      9: { x: 505, y: 300 },
      10: { x: 505, y: 110 },
      11: { x: 310, y: 85 },
      12: { x: 115, y: 110 }
    };

    const segments = [
      'M 115 675 Q 212 638 310 650',
      'M 310 650 Q 408 686 505 675',
      'M 505 675 C 585 620, 585 545, 505 490',
      'M 505 490 Q 408 452 310 465',
      'M 310 465 Q 212 502 115 490',
      'M 115 490 C 35 435, 35 355, 115 300',
      'M 115 300 Q 212 262 310 275',
      'M 310 275 Q 408 312 505 300',
      'M 505 300 C 585 245, 585 165, 505 110',
      'M 505 110 Q 408 72 310 85',
      'M 310 85 Q 212 122 115 110'
    ];

    const fullPath =
      'M 115 675 Q 212 638 310 650 Q 408 686 505 675 ' +
      'C 585 620, 585 545, 505 490 ' +
      'Q 408 452 310 465 Q 212 502 115 490 ' +
      'C 35 435, 35 355, 115 300 ' +
      'Q 212 262 310 275 Q 408 312 505 300 ' +
      'C 585 245, 585 165, 505 110 ' +
      'Q 408 72 310 85 Q 212 122 115 110';

    const completedPaths = segments
      .map((d, idx) => {
        const stationDone = session.stations[idx + 1]?.completed;
        if (!stationDone) return '';
        return `
          <path d="${d}" fill="none" stroke="#1A242B" stroke-width="13" stroke-linecap="round"/>
          <path d="${d}" fill="none" stroke="#F4B400" stroke-width="8" stroke-linecap="round"/>
        `;
      })
      .join('');

    const tupakInner = getTupakSvg('happy').replace(/<svg[^>]*>|<\/svg>/g, '');
    const avatarInner = getAvatarSvg(session.avatarId).replace(/<svg[^>]*>|<\/svg>/g, '');

    const stationNodes = stationsMeta
      .map(meta => {
        const n = meta.stationNumber;
        const pos = coords[n];
        const st = session.stations[n] || { completed: false, stars: 0 };
        const isCurrent = n === session.currentStation;
        const status = st.completed ? 'completed' : isCurrent ? 'available' : 'locked';

        const fill = status === 'completed' ? '#2E8B57' : status === 'available' ? '#F4B400' : '#CBD5DF';
        const stroke = status === 'locked' ? '#6B7C8A' : '#1A242B';
        const textColor = status === 'completed' ? '#FFFFFF' : '#1A242B';

        const starBadge = st.completed
          ? `<g transform="translate(${pos.x + 19}, ${pos.y - 19})">
               <circle cx="0" cy="0" r="12" fill="#FFFDF7" stroke="#F4B400" stroke-width="2.5"/>
               <text x="0" y="4.5" text-anchor="middle" font-size="14" font-weight="800" fill="#D97724">${st.stars > 0 ? '★' : '✓'}</text>
             </g>`
          : '';

        const lockBadge = status === 'locked'
          ? `<g transform="translate(${pos.x + 19}, ${pos.y - 19})">
               <circle cx="0" cy="0" r="10.5" fill="#EFF3F6" stroke="#6B7C8A" stroke-width="1.8"/>
               <rect x="-4" y="-1" width="8" height="6" rx="1" fill="#6B7C8A"/>
               <path d="M-2.5 -1 V-3.5 A2.5 2.5 0 0 1 2.5 -3.5 V-1" fill="none" stroke="#6B7C8A" stroke-width="1.6"/>
             </g>`
          : '';

        const avatarMarker = isCurrent
          ? `<g class="trail-avatar-marker" transform="translate(${pos.x - 42}, ${pos.y - 72})">
               <!-- Medallón de Tupak acompañante -->
               <circle cx="20" cy="24" r="19" fill="#FFF9E6" stroke="#D97724" stroke-width="2.5"/>
               <svg x="3" y="7" width="34" height="34" viewBox="0 0 210 210">${tupakInner}</svg>
               <!-- Medallón destacado del avatar del estudiante -->
               <circle cx="54" cy="24" r="24" fill="#FFFDF7" stroke="#1D6FA5" stroke-width="3.5"/>
               <svg x="33" y="3" width="42" height="42" viewBox="0 0 80 80">${avatarInner}</svg>
               <polygon points="36,48 48,48 42,57" fill="#1D6FA5"/>
             </g>`
          : '';

        return `
          <g class="trail-station-node" data-station="${n}" data-status="${status}" tabindex="0" role="button" aria-label="Estación ${n}: ${meta.stationTitle} (${meta.regionName})">
            <circle cx="${pos.x}" cy="${pos.y}" r="22" fill="${fill}" stroke="${stroke}" stroke-width="3.5"/>
            <text x="${pos.x}" y="${pos.y + 6}" text-anchor="middle" font-size="16" font-weight="800" fill="${textColor}">${n}</text>
            <rect x="${pos.x - 60}" y="${pos.y + 27}" width="120" height="23" rx="8" fill="#FFFDF7" opacity="0.96" stroke="#B9C8D4" stroke-width="1.4"/>
            <text x="${pos.x}" y="${pos.y + 42.5}" text-anchor="middle" font-size="11" font-weight="800" fill="#1A242B">${meta.stationTitle}</text>
            ${starBadge}
            ${lockBadge}
          </g>
        `;
      })
      .join('');

    const targetPos = coords[session.currentStation] || coords[1];
    const startPos = (fromStation && coords[fromStation]) ? coords[fromStation] : targetPos;

    const walkingAvatar = `
      <g id="trail-avatar-walker" class="trail-avatar-walker"
         style="transform: translate(${startPos.x - 42}px, ${startPos.y - 72}px);"
         data-target-x="${targetPos.x - 42}"
         data-target-y="${targetPos.y - 72}">
        <g class="trail-avatar-marker">
          <circle cx="20" cy="24" r="19" fill="#FFF9E6" stroke="#D97724" stroke-width="2.5"/>
          <svg x="3" y="7" width="34" height="34" viewBox="0 0 210 210">${tupakInner}</svg>
          <circle cx="54" cy="24" r="24" fill="#FFFDF7" stroke="#1D6FA5" stroke-width="3.5"/>
          <svg x="33" y="3" width="42" height="42" viewBox="0 0 80 80">${avatarInner}</svg>
          <polygon points="36,48 48,48 42,57" fill="#1D6FA5"/>
        </g>
      </g>
    `;

    return `
      <svg viewBox="0 0 620 760" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Camino serpenteante de 12 estaciones por las 4 regiones del Ecuador">
        <!-- FRANJA 4 (ARRIBA): GALÁPAGOS -->
        <g id="trail-zone-galapagos">
          <rect x="0" y="0" width="620" height="190" fill="#B8E3FA"/>
          <rect x="0" y="95" width="620" height="95" fill="#1D6FA5" opacity="0.85"/>
          <circle cx="560" cy="40" r="22" fill="#F4B400"/>
          <path d="M55 125 Q115 62 175 125 Z" fill="#465763"/>
          <path d="M250 125 Q310 58 370 125 Z" fill="#2E8B57"/>
          <path d="M440 125 Q505 70 570 125 Z" fill="#465763"/>
        </g>

        <!-- FRANJA 3: AMAZONÍA -->
        <g id="trail-zone-amazonia">
          <rect x="0" y="190" width="620" height="190" fill="#C6EBD5"/>
          <circle cx="70" cy="290" r="56" fill="#1E6B40"/>
          <circle cx="170" cy="305" r="52" fill="#2E8B57"/>
          <circle cx="450" cy="305" r="54" fill="#2E8B57"/>
          <circle cx="555" cy="290" r="58" fill="#1E6B40"/>
          <path d="M235 380 C275 320, 385 300, 355 240 C335 205, 290 200, 265 190 L315 190 C355 215, 415 245, 385 300 C360 340, 310 355, 290 380 Z" fill="#1D6FA5" opacity="0.85"/>
        </g>

        <!-- FRANJA 2: SIERRA -->
        <g id="trail-zone-sierra">
          <rect x="0" y="380" width="620" height="190" fill="#CEE8F9"/>
          <polygon points="30,570 155,408 280,570" fill="#A65514"/>
          <polygon points="118,456 155,408 192,456 172,464 155,452 138,464" fill="#FFFDF7"/>
          <polygon points="340,570 475,402 605,570" fill="#D97724"/>
          <polygon points="432,455 475,402 518,455 495,463 475,450 455,463" fill="#FFFDF7"/>
          <path d="M0 535 Q160 510 310 535 T620 535 L620 570 L0 570 Z" fill="#2E8B57" opacity="0.85"/>
        </g>

        <!-- FRANJA 1 (ABAJO): COSTA -->
        <g id="trail-zone-costa">
          <rect x="0" y="570" width="620" height="190" fill="#8CD0F5"/>
          <circle cx="545" cy="612" r="24" fill="#F4B400"/>
          <path d="M0 680 Q155 660 310 680 T620 680 L620 760 L0 760 Z" fill="#1D6FA5"/>
          <path d="M0 715 Q200 695 400 715 T620 715 L620 760 L0 760 Z" fill="#F4D38A"/>
          <path d="M58 725 Q68 672 78 642" stroke="#9E4E0D" stroke-width="7" fill="none" stroke-linecap="round"/>
          <path d="M78 642 Q50 630 38 646" stroke="#2E8B57" stroke-width="7" fill="none" stroke-linecap="round"/>
          <path d="M78 642 Q104 630 116 646" stroke="#2E8B57" stroke-width="7" fill="none" stroke-linecap="round"/>
        </g>

        <!-- SENDERO CURVO BASE (PENDIENTE PUNTEADO) Y TRAMOS RECORRIDOS (TRAZO FIRME) -->
        <path d="${fullPath}" fill="none" stroke="#FFFDF7" stroke-width="14" stroke-linecap="round" opacity="0.72"/>
        <path d="${fullPath}" fill="none" stroke="#7E91A1" stroke-width="4" stroke-dasharray="9 9" stroke-linecap="round" opacity="0.8"/>
        ${completedPaths}

        <!-- 12 ESTACIONES INTERACTIVAS Y AVATAR CAMINANTE -->
        ${stationNodes}
        ${walkingAvatar}
      </svg>
    `;
  }

  function getCelebrationSparklesSvg() {
    return `
      <svg viewBox="0 0 260 64" width="220" height="54" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="28" cy="24" r="6" fill="#F4B400"/>
        <circle cx="232" cy="24" r="6" fill="#2E8B57"/>
        <polygon points="68,10 72,20 82,22 74,29 76,39 68,34 60,39 62,29 54,22 64,20" fill="#F4B400"/>
        <polygon points="130,4 136,18 150,20 139,30 142,44 130,37 118,44 121,30 110,20 124,18" fill="#D97724"/>
        <polygon points="192,10 196,20 206,22 198,29 200,39 192,34 184,39 186,29 178,22 188,20" fill="#1D6FA5"/>
      </svg>
    `;
  }

  /**
   * Mini-sendero horizontal compacto para la vista de juego (12 estaciones)
   */
  function getMiniTrailSvg(session, activeStationNumber) {
    const startX = 36;
    const stepX = 56;
    const y = 44;
    const endX = startX + 11 * stepX;

    const regionColors = {
      costa: '#1D6FA5',
      sierra: '#D97724',
      amazonia: '#2E8B57',
      galapagos: '#15537C'
    };

    const getRegionForStation = n => {
      if (n <= 3) return 'costa';
      if (n <= 6) return 'sierra';
      if (n <= 9) return 'amazonia';
      return 'galapagos';
    };

    const avatarInner = getAvatarSvg(session.avatarId).replace(/<svg[^>]*>|<\/svg>/g, '');

    let completedLineEnd = startX;
    for (let n = 1; n <= 12; n += 1) {
      if (session.stations[n]?.completed || n <= activeStationNumber) {
        completedLineEnd = startX + (n - 1) * stepX;
      }
    }

    let nodesSvg = '';
    for (let n = 1; n <= 12; n += 1) {
      const cx = startX + (n - 1) * stepX;
      const st = session.stations[n] || { completed: false };
      const isActive = n === activeStationNumber;
      const regColor = regionColors[getRegionForStation(n)];
      const fill = st.completed ? '#2E8B57' : isActive ? '#F4B400' : '#E2EBF0';
      const stroke = isActive ? '#1A242B' : regColor;
      const textColor = st.completed ? '#FFFFFF' : '#1A242B';

      nodesSvg += `
        <g>
          <circle cx="${cx}" cy="${y}" r="${isActive ? 14 : 11}" fill="${fill}" stroke="${stroke}" stroke-width="${isActive ? 3 : 2}"/>
          <text x="${cx}" y="${y + 4}" text-anchor="middle" font-size="11" font-weight="800" fill="${textColor}">${n}</text>
        </g>
      `;

      if (isActive) {
        nodesSvg += `
          <g transform="translate(${cx - 15}, ${y - 42})">
            <circle cx="15" cy="14" r="14" fill="#FFFDF7" stroke="#1D6FA5" stroke-width="2.5"/>
            <svg x="2" y="1" width="26" height="26" viewBox="0 0 80 80">${avatarInner}</svg>
            <polygon points="11,27 19,27 15,33" fill="#1D6FA5"/>
          </g>
        `;
      }
    }

    return `
      <svg viewBox="0 0 688 68" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Progreso en el sendero de 12 estaciones, estación actual ${activeStationNumber}">
        <line x1="${startX}" y1="${y}" x2="${endX}" y2="${y}" stroke="#B9C8D4" stroke-width="4" stroke-dasharray="6 6" stroke-linecap="round"/>
        <line x1="${startX}" y1="${y}" x2="${completedLineEnd}" y2="${y}" stroke="#F4B400" stroke-width="6" stroke-linecap="round"/>
        ${nodesSvg}
      </svg>
    `;
  }

  app.svg = {
    AVATARS,
    getIconSvg,
    getTupakSvg,
    getAvatarSvg,
    getEcuadorMapSvg,
    getWindingTrailMapSvg,
    getMiniTrailSvg,
    getRegionSceneSvg,
    getBadgeSvg,
    getCelebrationSparklesSvg
  };
})(window.RutaCondor = window.RutaCondor || {});
