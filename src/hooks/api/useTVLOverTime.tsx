import { useCallback, useState } from "react"
import { BigNumber } from "ethers"
import axios from "./axios"
import { getTVLOverTime as getTVLOverTimeUrl } from "./urls"

type TVLDataPoint = {
  date: string
  totalLiquidityUSD: number
}

type GetTVLOverTimeResponseData =
  | {
      ok: true
      data: {
        timestamp: number
        value: string
      }[]
    }
  | {
      ok: false
      error: string
    }

// const parseResponse = (response: GetTVLOverTimeResponseData): TVLDataPoint[] | null => {
//   if (response.ok === false) return null

//   return response.data.map((r) => ({
//     timestamp: r.timestamp,
//     value: BigNumber.from(r.value),
//   }))
// }

export const useTVLOverTime = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [data, setData] = useState<TVLDataPoint[] | null>(null)
  const [spookySwap, setSpookySwap] = useState<TVLDataPoint[]>([])
  const [beethovenX, setBeethovenX] = useState<TVLDataPoint[]>([])
  const [tombFinance, setTombFinance] = useState<TVLDataPoint[]>([])

  const getTVLOverTime = useCallback(async () => {
    try {
      setLoading(true)

      // const { data: responseData } = await axios.get<Array<TVLDataPoint>>("charts/Fantom")
      const {
        data: { tvl: spookySwapData },
      } = await axios.get<{ tvl: Array<TVLDataPoint> }>("protocol/spookyswap")
      setSpookySwap(spookySwapData)
      const {
        data: { tvl: beethovenXData },
      } = await axios.get<{ tvl: Array<TVLDataPoint> }>("protocol/beethoven-x")
      setBeethovenX(beethovenXData)
      const {
        data: { tvl: tombFinanceData },
      } = await axios.get<{ tvl: Array<TVLDataPoint> }>("protocol/tomb-finance")
      setTombFinance(tombFinanceData)
      // console.log(spookySwapData)
      // setData(spookySwapData)
      // console.log(responseData)

      // const { data: responseData } = await axios.get<GetTVLOverTimeResponseData>(getTVLOverTimeUrl())

      // if (responseData.ok === true) {
      //   setData(parseResponse(responseData))
      // } else {
      //   setData(null)
      //   setError(new Error(responseData.error))
      // }
    } catch (error) {
      console.error(error)
      setData(null)
      setError(error as Error)
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    loading,
    data,
    spookySwap,
    beethovenX,
    tombFinance,
    error,
    getTVLOverTime,
  }
}
