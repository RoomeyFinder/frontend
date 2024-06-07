
export default function Loading() {
  return (
    <>
      <svg
        viewBox="0 0 10 10"
        aria-hidden="true"
        focusable="false"
        role="img"
        className="StyledSpinner-c11n-8-100-4__sc-1qy1aqr-0 eZZISZ Icon-c11n-8-100-4__sc-13llmml-0 fqFVxM"
      >
        <title>Loading</title>
        <defs>
          <linearGradient id="__c11n_idwds59_a" x1=".5" y1="0" x2="0" y2=".5">
            <stop stopColor="currentColor" stopOpacity="1"></stop>
            <stop stopColor="currentColor" stopOpacity=".75" offset="1"></stop>
          </linearGradient>
          <linearGradient id="__c11n_idwds59_b" x1="0" y1=".5" x2=".5" y2="1">
            <stop stopColor="currentColor" stopOpacity=".75"></stop>
            <stop stopColor="currentColor" stopOpacity=".5" offset="1"></stop>
          </linearGradient>
          <linearGradient id="__c11n_idwds59_c" x1=".5" y1="1" x2="1" y2=".5">
            <stop stopColor="currentColor" stopOpacity=".5"></stop>
            <stop stopColor="currentColor" stopOpacity=".25" offset="1"></stop>
          </linearGradient>
          <linearGradient id="__c11n_idwds59_d" x1="1" y1=".5" x2="0" y2="0">
            <stop stopColor="currentColor" stopOpacity=".25"></stop>
            <stop stopColor="currentColor" stopOpacity="0" offset="1"></stop>
          </linearGradient>
        </defs>
        <g fill="none" strokeWidth="1.5">
          <path
            stroke="url(#__c11n_idwds59_a)"
            d="M 5 1 A 4 4 0 0 0 1 5"
          ></path>
          <path
            stroke="url(#__c11n_idwds59_b)"
            d="M 1 5 A 4 4 0 0 0 5 9"
          ></path>
          <path
            stroke="url(#__c11n_idwds59_c)"
            d="M 5 9 A 4 4 0 0 0 9 5"
          ></path>
          <path
            stroke="url(#__c11n_idwds59_d)"
            d="M 9 5 A 4 4 0 0 0 7 1.536"
          ></path>
        </g>
        <circle fill="currentColor" cx="5" cy="1" r=".25"></circle>
      </svg>
    </>
  )
}
