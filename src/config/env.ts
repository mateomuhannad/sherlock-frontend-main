import { Config } from "./ConfigType"

export const config: Config = {
  networkId: parseInt(process.env.REACT_APP_NETWORK_ID as string),
  sdAddress: process.env.REACT_APP_SD_ADDRESS as string,
  usdcAddress: process.env.REACT_APP_USDC_ADDRESS as string,
  wftmAddress: process.env.REACT_APP_WFTM_ADDRESS as string,
  stakingOneAddress: process.env.REACT_APP_STAKING_ONE_ADDRESS as string,
  stakingTwoAddress: process.env.REACT_APP_STAKING_TWO_ADDRESS as string,
  stakingThreeAddress: process.env.REACT_APP_STAKING_THREE_ADDRESS as string,
  stakingFourAddress: process.env.REACT_APP_STAKING_FOUR_ADDRESS as string,
  stakingFiveAddress: process.env.REACT_APP_STAKING_FIVE_ADDRESS as string,
  stakingSixAddress: process.env.REACT_APP_STAKING_SIX_ADDRESS as string,
}
