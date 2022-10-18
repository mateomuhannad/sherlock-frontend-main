import { ethers } from "ethers"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useAccount } from "wagmi"

import { useFundraisePosition } from "../../hooks/api/useFundraisePosition"

import { Box } from "../../components/Box"
import { Column, Row } from "../../components/Layout"
import { Title } from "../../components/Title"
import { Button } from "../../components/Button/Button"
import { Text } from "../../components/Text"

import styles from "./FundraisingClaim.module.scss"

import { formattedTimeDifference } from "../../utils/dates"
import { formatAmount } from "../../utils/format"

export const FundraisingClaimPage = () => {
  const accountData = useAccount()
  /**
   * Custom hook for fetching fundraise position from Indexer API
   */

  const { getFundraisePosition, data: fundraisePositionData } = useFundraisePosition()

  /**
   * Wheter the claim is active or not.
   */
  const [claimIsActive, setClaimIsActive] = useState(false)

  /**
   * Execute GraphQL query to fetch fundraise position once the user's account is available
   */
  useEffect(() => {
    if (accountData?.address) {
      getFundraisePosition(accountData.address)
    }
  }, [accountData?.address, getFundraisePosition])

  const claimStartString = useMemo(() => {
    return (
      fundraisePositionData?.claimableAt &&
      formattedTimeDifference(fundraisePositionData.claimableAt, ["days", "hours", "minutes"])
    )
  }, [fundraisePositionData?.claimableAt])

  if (!fundraisePositionData) return null

  const formattedSherAmount = formatAmount(ethers.utils.formatUnits(fundraisePositionData.reward))

  const participation = fundraisePositionData.stake.add(fundraisePositionData.contribution)

  return (
    <Box>
      <Column spacing="m">
        <Row>
          <Title>Position</Title>
        </Row>
        <Row alignment="space-between">
          <Column>
            <Text strong>Participation</Text>
          </Column>
          <Column>
            <Text strong variant="mono">
              {formatAmount(ethers.utils.formatUnits(participation, 6))} USDC
            </Text>
          </Column>
        </Row>
        <Row alignment="space-between">
          <Column>
            <Text>Staked</Text>
          </Column>
          <Column>
            <Text variant="mono">{formatAmount(ethers.utils.formatUnits(fundraisePositionData.stake, 6))} USDC</Text>
          </Column>
        </Row>
        <Row alignment="space-between">
          <Column>
            <Text>Contributed</Text>
          </Column>
          <Column>
            <Text variant="mono">
              {formatAmount(ethers.utils.formatUnits(fundraisePositionData.contribution, 6))} USDC
            </Text>
          </Column>
        </Row>
        <Row className={styles.separator}>
          <hr />
        </Row>
        <Row alignment="space-between">
          <Column>
            <Text strong>SHER Reward</Text>
          </Column>
          <Column>
            <Text strong variant="mono">
              {formattedSherAmount} SHER
            </Text>
          </Column>
        </Row>
        <Row className={styles.claimContainer}>
          <Column grow={1} spacing="m">
            <Row alignment="space-between">
              <Column>
                <Text strong>Claimable Starts</Text>
              </Column>
              <Column>
                <Text strong variant="mono">
                  {claimStartString}
                </Text>
              </Column>
            </Row>
            <Row alignment="center">
              <Button disabled={!claimIsActive}>Claim</Button>
            </Row>
          </Column>
        </Row>
      </Column>
    </Box>
  )
}
