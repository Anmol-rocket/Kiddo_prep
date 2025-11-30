"use client"

interface TimerProps {
  timeLeft: number
  totalTime: number
  isAnswering: boolean
}

export default function Timer({ timeLeft, totalTime, isAnswering }: TimerProps) {
  const percentage = (timeLeft / totalTime) * 100
  const isLowTime = percentage < 25

  const getColor = () => {
    if (isLowTime) return "text-red-500"
    if (percentage < 50) return "text-yellow-500"
    return "text-green-500"
  }

  const getBackgroundColor = () => {
    if (isLowTime) return "bg-red-500/20"
    if (percentage < 50) return "bg-yellow-500/20"
    return "bg-green-500/20"
  }

  return (
    <div
      className={`px-4 py-2 rounded-lg flex items-center gap-2 ${getBackgroundColor()} ${getColor()} font-semibold transition-all duration-300`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span className="text-sm md:text-base">{timeLeft}s</span>
    </div>
  )
}
