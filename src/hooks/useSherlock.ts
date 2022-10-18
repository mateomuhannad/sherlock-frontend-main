import React from "react"
import { useAccount, useContract, useProvider, useSigner } from "wagmi"
import { TokenLockingWithNFTLimit } from "../contracts"
import StakingABI from "../abi/TokenLockingWithNFTLimit.json"
import { BigNumber } from "ethers"
import config from "../config"
import { AvailableERC20Tokens } from "./useERC20"

/**
 * React Hook for interacting with Sherlock contract.
 *
 * See https://github.com/sherlock-protocol/sherlock-v2-core
 */
export enum StakingTypeEnum {
  "One",
  "Two",
}
const StakingContractOneData = {
  SD: config.stakingOneAddress,
  USDC: config.stakingThreeAddress,
  WFTM: config.stakingFiveAddress,
}

const StakingContractTwoData = {
  SD: config.stakingTwoAddress,
  USDC: config.stakingFourAddress,
  WFTM: config.stakingSixAddress,
}

const useSherlock = (token: AvailableERC20Tokens) => {
  const addressOne = StakingContractOneData[token]
  const addressTwo = StakingContractTwoData[token]
  const provider = useProvider({ chainId: config.networkId })
  const { data: signerData } = useSigner()
  const accountData = useAccount()
  const contractOne = useContract<TokenLockingWithNFTLimit>({
    addressOrName: addressOne,
    signerOrProvider: accountData.isConnected ? signerData : provider,
    contractInterface: StakingABI.abi,
  })
  const contractTwo = useContract<TokenLockingWithNFTLimit>({
    addressOrName: addressTwo,
    signerOrProvider: accountData.isConnected ? signerData : provider,
    contractInterface: StakingABI.abi,
  })

  /**
   * Stake USDC
   *
   * @param amount Amount of USDC staked
   * @param period Lock time
   */
  const stake = React.useCallback(
    async (amount: BigNumber, type: StakingTypeEnum) => {
      if (!accountData?.address) return
      if (type === StakingTypeEnum.One) return contractOne.deposit(amount)
      else return contractTwo.deposit(amount)
    },
    [accountData?.address, contractOne, contractTwo]
  )

  /**
   * Unsttake and cash out an unlocked position
   */
  const unstake = React.useCallback(
    async (type: StakingTypeEnum) => {
      if (!accountData?.address) return
      if (type === StakingTypeEnum.One) return contractOne.claimAndWithdraw()
      else return contractTwo.claimAndWithdraw()
    },
    [accountData?.address, contractOne, contractTwo]
  )

  const claimRewards = React.useCallback(
    async (type: StakingTypeEnum) => {
      if (!accountData?.address) return
      if (type === StakingTypeEnum.One) return contractOne.claim()
      else return contractTwo.claim()
    },
    [accountData?.address, contractOne, contractTwo]
  )

  const checkRewards = React.useCallback(
    async (type: StakingTypeEnum) => {
      if (!accountData?.address) return
      if (type === StakingTypeEnum.One) return contractOne.CalculateReward(accountData?.address)
      else return contractTwo.CalculateReward(accountData?.address)
    },
    [accountData?.address, contractOne, contractTwo]
  )

  const tokenStaked = React.useCallback(
    async (type: StakingTypeEnum) => {
      if (!accountData?.address) return
      if (type === StakingTypeEnum.One) {
        if (!contractOne.provider && !contractOne.signer) return
        return contractOne.StakedTokens(accountData?.address)
      } else {
        if (!contractTwo.provider && !contractTwo.signer) return
        return contractTwo.StakedTokens(accountData?.address)
      }
    },
    [accountData?.address, contractOne, contractTwo]
  )

  const rewardFactor = React.useCallback(
    async (type: StakingTypeEnum) => {
      if (type === StakingTypeEnum.One) {
        if (!contractOne.provider && !contractOne.signer) return
        return contractOne.VaultReward()
      } else {
        if (!contractTwo.provider && !contractTwo.signer) return
        return contractTwo.VaultReward()
      }
    },
    [contractOne, contractTwo]
  )

  const checkTime = React.useCallback(
    async (type: StakingTypeEnum) => {
      if (!accountData?.address) return
      if (type === StakingTypeEnum.One) return contractOne.CalculateTime(accountData?.address)
      else return contractTwo.CalculateTime(accountData?.address)
    },
    [accountData?.address, contractOne, contractTwo]
  )

  return React.useMemo(
    () => ({
      addressOne,
      addressTwo,
      stake,
      unstake,
      claimRewards,
      checkRewards,
      tokenStaked,
      rewardFactor,
      checkTime,
    }),
    [stake, unstake, claimRewards, checkRewards, tokenStaked, rewardFactor, checkTime, addressOne, addressTwo]
  )
}
export default useSherlock
