export default function ActiveBall({ color }: { color?: string }) {
  return (
    <svg
      width="10"
      height="11"
      viewBox="0 0 10 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ border: "1.5px solid white", borderRadius: "50%" }}
    >
      <circle cx="5" cy="5.5" r="5" fill={color || "currentColor"} />
    </svg>
  )
}
