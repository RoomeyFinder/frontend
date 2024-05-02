import axios from "axios"
import { FunctionComponent, useCallback } from "react"

export default function TwitterAuthButton({
  childComponent = () => <></>,
}: {
  childComponent: FunctionComponent<
    { [x: string]: any } & { onClick: () => void }
  >
}) {
  const login = useCallback(() => {
    const requestData = {
      url: "http://api.twitter.com/oauth/request_token",
      method: "post",
      headers: {
        "User-Agent": "themattharris' HTTP Client",
        Host: "api.twitter.com",
        Accept: "*/*",
        // Authorization:
        //   `OAuth oauth_callback="http%3A%2F%2Flocalhost%2Fsign-in-with-twitter%2F", oauth_consumer_key="cChZNFj6T5R0TigYB9yd1w", oauth_nonce="ea9ec8429b68d6b77cd5600adbbb0456", oauth_signature="F1Li3tvehgcraF8DMJ7OyxO4w9Y%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1318467427", oauth_version="1.0"`,
      },
    }

    axios(requestData)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])
  return <>{childComponent({ onClick: login })}</>
}
