import React from "react"
import { AvailableERC20Tokens } from "../../hooks/useERC20"

import styles from "./Input.module.scss"

export type InputProps = {
  /**
   * onChange event handler
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>

  /**
   * Token
   */
  token: AvailableERC20Tokens

  /**
   * Placeholder
   */
  placeholder?: string

  /**
   * Input value (if controlled input)
   */
  value?: string

  /**
   * Disable input
   */
  disabled?: boolean
}

export const Input: React.FC<InputProps> = ({ onChange, placeholder, value, disabled = false }) => {
  return (
    <div className={styles.inputContainer}>
      {(value === "" || value === "0") && <span className={styles.placeholder}>{placeholder}</span>}
      <input className={styles.input} value={value} onChange={onChange} disabled={disabled} type="number" />
    </div>
  )
}
