

export default function CheckedRadioFill({  isSmall}: {
  isSmall?: boolean
}){
  if(isSmall)return (
    <svg
      width="6"
      height="6"
      viewBox="0 0 6 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="3" cy="3" r="3" fill="#3A86FF" />
    </svg>
  )

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
      <circle cx="5" cy="5" r="5" fill="#3A86FF" />
    </svg>
  )
}