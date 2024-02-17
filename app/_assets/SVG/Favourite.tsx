export default function FavouriteIcon({ isFilled }: { isFilled?: boolean }) {
  return (
    <svg
      width="19"
      height="17"
      viewBox="0 0 19 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {isFilled ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.4004 1.9687C7.601 -0.128324 4.59416 -0.776395 2.33962 1.14385C0.0850697 3.06409 -0.23234 6.27461 1.53817 8.54571C3.01023 10.4339 7.4652 14.4164 8.9253 15.7054C9.0886 15.8496 9.1703 15.9217 9.2656 15.95C9.3487 15.9747 9.4397 15.9747 9.5229 15.95C9.6182 15.9217 9.6998 15.8496 9.8632 15.7054C11.3233 14.4164 15.7782 10.4339 17.2503 8.54571C19.0208 6.27461 18.7421 3.04389 16.4488 1.14385C14.1555 -0.756195 11.1998 -0.128324 9.4004 1.9687Z"
          fill="#FE251B"
        />
      ) : (
        <path
          d="M13.4504 0C11.8754 0 10.3905 0.724413 9.40039 1.90155C8.41026 0.724413 6.92539 0 5.35039 0C2.5603 0 0.400391 2.17302 0.400391 4.98007C0.400391 8.42067 3.4603 11.1826 8.09522 15.438L9.40039 16.6154L10.7056 15.438C15.3404 11.1826 18.4004 8.42063 18.4004 4.98007C18.4004 2.17302 16.2405 0 13.4504 0ZM9.95579 14.2467L9.77324 14.4143L9.40039 14.7506L9.02758 14.4143L8.84525 14.2469C6.6637 12.2443 4.77963 10.5148 3.53412 8.96833C2.32444 7.46632 1.78501 6.23631 1.78501 4.98007C1.78501 3.99072 2.14942 3.07921 2.81114 2.41351C3.47065 1.75002 4.37242 1.38462 5.35039 1.38462C6.48119 1.38462 7.59909 1.91107 8.34073 2.79281L9.40039 4.05264L10.46 2.79281C11.2017 1.91107 12.3195 1.38462 13.4504 1.38462C14.4284 1.38462 15.3301 1.75002 15.9897 2.41347C16.6514 3.07921 17.0158 3.99068 17.0158 4.98007C17.0158 6.23631 16.4763 7.46628 15.2667 8.96824C14.0213 10.5147 12.1373 12.2441 9.95579 14.2467Z"
          fill="currentColor"
        />
      )}
    </svg>
  )
}
