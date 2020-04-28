import React from 'react'

type Props = {
  className?: string
}

const Icon: React.FC<Props> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 282 363">
    <path
      d="M77.929 81.071l63.64 63.64c3.905 3.905 10.236 3.905 14.142 0 3.905-3.906 3.905-10.237 0-14.142l-47.48-47.48c38.89 1.11 77.059 12.657 105.537 33.828C242.858 138.542 262 170.249 262 212.266c0 .591.051 1.171.15 1.734H262c0 44.529-15.434 76.59-37.763 97.441-22.468 20.982-52.628 31.275-83.084 30.81-30.463-.465-60.743-11.69-83.332-33.129C35.372 287.815 20 255.933 20 213c0-5.523-4.477-10-10-10s-10 4.477-10 10c0 48.067 17.377 85.31 44.053 110.628 26.537 25.186 61.756 38.086 96.794 38.621 35.044.535 70.384-11.297 97.041-36.19C264.684 301.035 282 263.471 282 214h-.15c.099-.563.15-1.143.15-1.734 0-48.983-22.671-86.401-56.3-111.4-32.048-23.825-73.887-36.324-115.692-37.732l45.703-45.703c3.905-3.905 3.905-10.236 0-14.142-3.906-3.905-10.237-3.905-14.142 0l-63.64 63.64c-3.905 3.905-3.905 10.237 0 14.142z"
      clipRule="evenodd"
    />
  </svg>
)

export default Icon
