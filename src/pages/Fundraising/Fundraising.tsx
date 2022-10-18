import React, { useEffect, useMemo, useState } from "react"
import { BigNumber, ethers, utils } from "ethers"
import { useDebounce } from "use-debounce"
import { useNavigate } from "react-router-dom"

import AllowanceGate from "../../components/AllowanceGate/AllowanceGate"
import { Button } from "../../components/Button/Button"
import { Box } from "../../components/Box"
import { Title } from "../../components/Title"
import { Text } from "../../components/Text"
import { Column, Row } from "../../components/Layout"

import useERC20 from "../../hooks/useERC20"
import ConnectGate from "../../components/ConnectGate/ConnectGate"
import useWaitTx from "../../hooks/useWaitTx"

import { formattedTimeDifference } from "../../utils/dates"

import styles from "./Fundraising.module.scss"
import TokenInput from "../../components/TokenInput/TokenInput"
import LoadingContainer from "../../components/LoadingContainer/LoadingContainer"
import { TxType } from "../../utils/txModalMessages"

type Rewards = {
  /**
   * Amount of SHER available to claim after once the fundraise event finishes.
   */
  sherAmount: ethers.BigNumber
  /**
   * Amount of USDC that needs to be staked for a period of time.
   */
  stake: ethers.BigNumber
  /**
   * Amount of USDC that needs to be paid to get SHER rewards.
   */
  price: ethers.BigNumber
}

export const FundraisingPage: React.FC = () => {
  const navigate = useNavigate()
  const { balance: usdcBalance } = useERC20("USDC")
  const { waitForTx } = useWaitTx()

  /**
   * User input. Amount of USDC willing to pay.
   */
  const [usdcInput, setUsdcInput] = useState<BigNumber>()

  /**
   * Fundraise deadline. USDC payments won't be accepted afterwards.
   */
  const [deadline, setDeadline] = useState<Date>()
  /**
   * Amount of SHER left in SherBuy contract, available for sale during the fundraise.
   */
  const [sherRemaining, setSherRemaining] = useState<ethers.BigNumber>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoadingRewards, setIsLoadingRewards] = useState(false)

  /**
   * These rewards are calculated based on how much USDC the user is willing to contribute.
   */
  const [rewards, setRewards] = useState<Rewards>()

  const handleUsdcChange = (value: BigNumber | undefined) => {
    if (!value) {
      setRewards(undefined)
    }

    setUsdcInput(value)
  }

  const handleExecute = async () => {
    if (!rewards?.sherAmount) return
  }

  const eventEndsString = useMemo(() => {
    return deadline && formattedTimeDifference(deadline, ["days", "hours", "minutes"])
  }, [deadline])

  const usdcRemaining = sherRemaining && sherRemaining.div(10 ** 11)
  const usdcRemainingRounded = usdcRemaining && usdcRemaining.sub(usdcRemaining.mod(1e6)) //sherRemaining && sherRemaining.div(10 ** 11)

  return (
    <Box>
      <LoadingContainer loading={isLoadingRewards}>
        <Column spacing="m">
          <Row>
            <Title>Participate</Title>
          </Row>
          <Row alignment="space-between">
            <Column>
              <Text>Event Ends</Text>
            </Column>
            <Column>
              <Text strong>{eventEndsString}</Text>
            </Column>
          </Row>
          <Row alignment="space-between">
            <Column>
              <Text>Participation Remaining</Text>
            </Column>
            <Column>
              <Text strong>
                {usdcRemainingRounded && utils.commify(utils.formatUnits(usdcRemainingRounded, 6))} USDC
              </Text>
            </Column>
          </Row>
          <Row className={styles.rewardsContainer}>
            <Column grow={1} spacing="l">
              {/* <TokenInput onChange={handleUsdcChange} token="USDC" placeholder="Choose amount" balance={usdcBalance} /> */}
              {rewards && (
                <Row>
                  <Column grow={1} spacing="m">
                    <Row alignment="space-between">
                      <Column>
                        <Text>Staking (6 months)</Text>
                      </Column>
                      <Column>
                        <Text variant="mono">{utils.commify(utils.formatUnits(rewards.stake, 6))} USDC</Text>
                      </Column>
                    </Row>
                    <Row alignment="space-between">
                      <Column>
                        <Text>Treasury Contribution</Text>
                      </Column>
                      <Column>
                        <Text variant="mono">{utils.commify(utils.formatUnits(rewards.price, 6))} USDC</Text>
                      </Column>
                    </Row>
                    <Row>
                      <hr />
                    </Row>
                    <Row alignment="space-between">
                      <Column>
                        <Text strong>SHER Reward</Text>
                      </Column>
                      <Column className={styles.strong}>
                        <Text strong>{`${utils.commify(utils.formatUnits(rewards.sherAmount, 18))} SHER`}</Text>
                      </Column>
                    </Row>
                  </Column>
                </Row>
              )}
            </Column>
          </Row>
          <Text size="small" className={styles.v1}>
            For the Sherlock V1, please see{" "}
            <a href="https://v1.sherlock.xyz" rel="noreferrer" target="_blank">
              https://v1.sherlock.xyz
            </a>
          </Text>
        </Column>
      </LoadingContainer>
    </Box>
  )
}
