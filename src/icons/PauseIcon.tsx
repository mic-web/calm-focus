import React from 'react'

type Props = {
  className?: string
}

const Icon: React.FC<Props> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="16 0 20 80" fill="currentColor">
    <rect width="10" height="70" y="5" rx="8" />
    <rect width="10" height="70" y="5" x="40" rx="8" />
  </svg>
)

export default Icon
