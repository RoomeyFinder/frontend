import { useState, useEffect } from "react"
import { pluralizeText } from "../_utils"

const TimeSince = ({ date }: { date: any }) => {
  const [timeSince, setTimeSince] = useState("")

  useEffect(() => {
    const timeDiff = new Date().getTime() - new Date(date).getTime()
    const seconds = Math.floor(timeDiff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    let result = ""
    if (days > 0) {
      result = `${days} ${pluralizeText("day", days, "s")} ago`
    } else if (hours > 0) {
      result = `${hours} ${pluralizeText("hr", hours, "s")} ago`
    } else if (minutes > 0) {
      result = `${minutes} ${pluralizeText("min", minutes, "s")} ago`
    } else {
      result = `${seconds} ${pluralizeText("sec", seconds, "s")} ago`
    }

    setTimeSince(result)
  }, [date])

  return timeSince
}

export default TimeSince
