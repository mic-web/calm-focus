import React from 'react'

type Props = {
  className?: string
}

const Icon: React.FC<Props> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 0 80 98" fill="currentColor" className={className}>
    <path d="M71.06 44.1c3.386 2.39 3.386 7.41 0 9.8L10.212 96.878C6.237 99.684.75 96.842.75 91.977V6.023c0-4.866 5.487-7.708 9.461-4.901l60.85 42.976z" />
  </svg>
)

export default Icon
