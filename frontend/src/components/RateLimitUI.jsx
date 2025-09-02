import React from "react"

const RateLimitUI = ({ onRetry }) => {
  return (
    <div className="m-6 p-4 border border-error rounded-lg bg-error/10 text-error">
      <h2 className="text-lg font-bold">Rate Limit Reached</h2>
      <p className="mt-1 text-sm">You’ve hit the rate limit. Please try again later.</p>
      {onRetry && (
        <button 
          onClick={onRetry} 
          className="btn btn-error btn-sm mt-3"
        >
          Retry
        </button>
      )}
    </div>
  )
}

export default RateLimitUI
