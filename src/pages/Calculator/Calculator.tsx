import React from "react"

import { Box } from "../../components/Box"
import { Row, Column } from "../../components/Layout"
import Options from "../../components/Options/Options"
import TokenInput from "../../components/TokenInput/TokenInput"
import { Text } from "../../components/Text"
import useERC20 from "../../hooks/useERC20"
import useSherlock, { StakingTypeEnum } from "../../hooks/useSherlock"

import { formatAmount } from "../../utils/format"
import { BigNumber } from "ethers"

export const CalculatorPage: React.FC = () => {
  const { decimals: sdDecimals } = useERC20("SD")
  const { decimals: usdcDecimals } = useERC20("USDC")
  const { decimals: wftmDecimals } = useERC20("WFTM")

  const [sdAmount, setSDAmount] = React.useState<string>()
  const [usdcAmount, setUSDCAmount] = React.useState<string>()
  const [wftmAmount, setWFTMAmount] = React.useState<string>()

  const [stakingTypeOne, setStakingTypeOne] = React.useState<StakingTypeEnum>(StakingTypeEnum.One)
  const [stakingTypeTwo, setStakingTypeTwo] = React.useState<StakingTypeEnum>(StakingTypeEnum.One)
  const [stakingTypeThree, setStakingTypeThree] = React.useState<StakingTypeEnum>(StakingTypeEnum.One)

  const { rewardFactor: SDRewardFactor } = useSherlock("SD")
  const { rewardFactor: USDCRewardFactor } = useSherlock("USDC")
  const { rewardFactor: WFTMRewardFactor } = useSherlock("WFTM")

  const [sdRewardFactorOne, setSDRewardFactorOne] = React.useState<number>(0)
  const [sdRewardFactorTwo, setSDRewardFactorTwo] = React.useState<number>(0)
  const [usdcRewardFactorOne, setUSDCRewardFactorOne] = React.useState<number>(0)
  const [usdcRewardFactorTwo, setUSDCRewardFactorTwo] = React.useState<number>(0)
  const [wftmRewardFactorOne, setWFTMRewardFactorOne] = React.useState<number>(0)
  const [wftmRewardFactorTwo, setWFTMRewardFactorTwo] = React.useState<number>(0)

  React.useEffect(() => {
    SDRewardFactor(StakingTypeEnum.One).then((value) => {
      if (value) setSDRewardFactorOne(value.div(BigNumber.from(10).pow(sdDecimals - 3)).toNumber() / 1000)
    })
    SDRewardFactor(StakingTypeEnum.Two).then((value) => {
      if (value) setSDRewardFactorTwo(value.div(BigNumber.from(10).pow(sdDecimals - 3)).toNumber() / 1000)
    })
  }, [SDRewardFactor, sdDecimals])

  React.useEffect(() => {
    USDCRewardFactor(StakingTypeEnum.One).then((value) => {
      if (value) setUSDCRewardFactorOne(value.div(BigNumber.from(10).pow(usdcDecimals - 3)).toNumber() / 1000)
    })
    USDCRewardFactor(StakingTypeEnum.Two).then((value) => {
      if (value) setUSDCRewardFactorTwo(value.div(BigNumber.from(10).pow(usdcDecimals - 3)).toNumber() / 1000)
    })
  }, [USDCRewardFactor, usdcDecimals])

  React.useEffect(() => {
    WFTMRewardFactor(StakingTypeEnum.One).then((value) => {
      if (value) setWFTMRewardFactorOne(value.div(BigNumber.from(10).pow(wftmDecimals - 3)).toNumber() / 1000)
    })
    WFTMRewardFactor(StakingTypeEnum.Two).then((value) => {
      if (value) setWFTMRewardFactorTwo(value.div(BigNumber.from(10).pow(wftmDecimals - 3)).toNumber() / 1000)
    })
  }, [WFTMRewardFactor, wftmDecimals])

  return (
    <Column spacing="m">
      <Row>
        <Box fullWidth>
          <Column spacing="m">
            <Row spacing="m">
              <Column grow={1} spacing="m">
                <TokenInput
                  decimals={sdDecimals}
                  value={sdAmount}
                  setValue={setSDAmount}
                  token="SD"
                  placeholder="Choose amount"
                ></TokenInput>
              </Column>
            </Row>
            <Row spacing="m">
              <Options
                value={stakingTypeOne}
                options={[
                  { label: "15 days", value: StakingTypeEnum.One },
                  { label: "30 days", value: StakingTypeEnum.Two },
                ]}
                onChange={(value: StakingTypeEnum) => setStakingTypeOne(value)}
              />
            </Row>
            <Row alignment="space-between">
              <Column>
                <Text>Estimated Rewards</Text>
              </Column>
              <Column>
                <Text strong variant="mono">
                  {sdAmount &&
                    formatAmount(
                      Number(sdAmount) *
                        (stakingTypeOne === StakingTypeEnum.One ? sdRewardFactorOne : sdRewardFactorTwo)
                    )}{" "}
                  SD
                </Text>
              </Column>
            </Row>
          </Column>
        </Box>
      </Row>
      <Row>
        <Box fullWidth>
          <Column spacing="m">
            <Row spacing="m">
              <Column grow={1} spacing="m">
                <TokenInput
                  decimals={usdcDecimals}
                  value={usdcAmount}
                  setValue={setUSDCAmount}
                  token="USDC"
                  placeholder="Choose amount"
                ></TokenInput>
              </Column>
            </Row>
            <Row spacing="m">
              <Options
                value={stakingTypeTwo}
                options={[
                  { label: "15 days", value: StakingTypeEnum.One },
                  { label: "30 days", value: StakingTypeEnum.Two },
                ]}
                onChange={(value: StakingTypeEnum) => setStakingTypeTwo(value)}
              />
            </Row>
            <Row alignment="space-between">
              <Column>
                <Text>Estimated Rewards</Text>
              </Column>
              <Column>
                <Text strong variant="mono">
                  {usdcAmount &&
                    formatAmount(
                      Number(usdcAmount) *
                        (stakingTypeTwo === StakingTypeEnum.One ? usdcRewardFactorOne : usdcRewardFactorTwo)
                    )}{" "}
                  USDC
                </Text>
              </Column>
            </Row>
          </Column>
        </Box>
      </Row>
      <Row>
        <Box fullWidth>
          <Column spacing="m">
            <Row spacing="m">
              <Column grow={1} spacing="m">
                <TokenInput
                  decimals={wftmDecimals}
                  value={wftmAmount}
                  setValue={setWFTMAmount}
                  token="WFTM"
                  placeholder="Choose amount"
                ></TokenInput>
              </Column>
            </Row>
            <Row spacing="m">
              <Options
                value={stakingTypeThree}
                options={[
                  { label: "15 days", value: StakingTypeEnum.One },
                  { label: "30 days", value: StakingTypeEnum.Two },
                ]}
                onChange={(value: StakingTypeEnum) => setStakingTypeThree(value)}
              />
            </Row>
            <Row alignment="space-between">
              <Column>
                <Text>Estimated Rewards</Text>
              </Column>
              <Column>
                <Text strong variant="mono">
                  {wftmAmount &&
                    formatAmount(
                      Number(wftmAmount) *
                        (stakingTypeThree === StakingTypeEnum.One ? wftmRewardFactorOne : wftmRewardFactorTwo)
                    )}{" "}
                  WFTM
                </Text>
              </Column>
            </Row>
          </Column>
        </Box>
      </Row>
    </Column>
  )
}
