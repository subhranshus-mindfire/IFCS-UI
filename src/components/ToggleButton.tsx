import { useState } from 'react'

const ToggleSwitch = () => {
  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev)
  }

  return (
    <label className='flex cursor-pointer select-none items-center'>
      <div className='relative'>
        <input
          type='checkbox'
          checked={isChecked}
          onChange={handleCheckboxChange}
          className='sr-only'
        />
        {/* Background */}
        <div
          className={`block h-6 w-10 border border-gray-200 rounded-full transition-colors duration-300 ${isChecked ? 'bg-bg-button' : 'bg-white'
            }`}
        ></div>
        {/* Dot */}
        <div
          className={`dot absolute top-1 h-4 w-4 rounded-full mx-1 bg-gray-200 transition-transform duration-300 ${isChecked ? 'translate-x-4' : 'translate-x-0'
            }`}
        ></div>
      </div>
    </label>
  )
}

export default ToggleSwitch
