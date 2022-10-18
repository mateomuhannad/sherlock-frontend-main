import { BigNumber, utils } from "ethers"
import React from "react"
import cx from "classnames"
import { formatAmount } from "../../utils/format"
import { Button } from "../Button/Button"
import { Input } from "../Input"
import { InputProps } from "../Input/Input"
import { Column, Row } from "../Layout"
import { Text } from "../Text"
import styles from "./TokenInput.module.scss"

type Props = Omit<InputProps, "onChange"> & {
  decimals: number
  balance?: BigNumber
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>
}

const TokenInput: React.FC<Props> = ({ value, balance, decimals, setValue, ...props }) => {
  const { disabled } = props

  const handleSetMax = React.useCallback(() => {
    if (balance) setValue(balance.div(BigNumber.from(10).pow(decimals)).toString())
  }, [balance, setValue, decimals])

  return (
    <>
      <Row alignment={["space-between", "center"]} spacing="xl" className={cx({ [styles.disabled]: disabled })}>
        <Column grow={1}>
          <Input
            value={value || ""}
            onChange={(event) => {
              event.preventDefault()
              const numberVal = Math.floor(Number(event.target.value) * 100) / 100
              if (!balance)
                setValue((prev) =>
                  isNaN(numberVal) ? prev : 9999999999 < numberVal ? "9999999999" : numberVal.toString()
                )
              else {
                const maxVal = (balance.div(BigNumber.from(10).pow(decimals - 2)).toNumber() || 0) / 100
                setValue((prev) =>
                  isNaN(numberVal) ? prev : maxVal < numberVal ? maxVal.toString() : numberVal.toString()
                )
              }
            }}
            {...props}
          />
        </Column>
        <Column grow={0}>
          <Text size="extra-large" strong>
            {props.token}
          </Text>
        </Column>
      </Row>
      {balance && !disabled && (
        <Row alignment={["end", "center"]} spacing="m">
          <Text className={styles.balance}>Balance: {formatAmount(utils.formatUnits(balance, decimals))}</Text>
          <Button variant="primary" size="small" onClick={handleSetMax}>
            MAX
          </Button>
        </Row>
      )}
    </>
  )
}

export default TokenInput
