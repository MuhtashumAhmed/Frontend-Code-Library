// •	Server side API calling mai error ayega to ye page render hota hai.
// •	Always make client page 
"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
console.log(error);

  return (
    <div>
      <h2>Something went wrong</h2>
      <button onClick={() => reset()}>
        Try again
      </button>
    </div>
  )
}
