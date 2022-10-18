import * as React from "react"
import { Button } from "../../components/Button/Button"
import { Text } from "../../components/Text"
import { Column } from "../../components/Layout"
import NFTImg from "../../assets/images/nfts/key.gif"

import styles from "./Mint.module.scss"
import { useAccount, useContract, useSigner } from "wagmi"

import NFTABI from "../../abi/NFT.json"
import { IDropClaimCondition, NFT } from "../../contracts/NFT"

export const MintPage: React.FC = () => {
  const { data: signer } = useSigner()
  const { isConnected, address } = useAccount()
  const contract = useContract<NFT>({
    addressOrName: "0x0a1e2B30e23d89EA44669F40C49f2D80E3C9beAA",
    contractInterface: NFTABI.abi,
    signerOrProvider: signer,
  })
  const [claimCondition, setClaimCondition] = React.useState<IDropClaimCondition.ClaimConditionStructOutput>()
  const [balance, setBalance] = React.useState<string>("0")

  React.useEffect(() => {
    if (contract.signer) {
      contract.getActiveClaimConditionId().then((_condId) => {
        contract.getClaimConditionById(_condId.toString()).then((_cond) => {
          setClaimCondition(_cond)
        })
      })
      contract.signer.getAddress().then((addr) => contract.balanceOf(addr).then((_bal) => setBalance(_bal.toString())))
    }
  }, [contract])

  const handleMint = (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault()
    if (address && claimCondition)
      contract.claim(
        address,
        1,
        claimCondition.currency,
        claimCondition.pricePerToken,
        ["0x0000000000000000000000000000000000000000000000000000000000000000"],
        0
      )
  }

  return (
    <Column>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={NFTImg} alt="NFTImg" />
      </div>
      <Button onClick={handleMint} disabled={!isConnected}>
        Mint
      </Button>
      {isConnected && <Text className={styles.balance}>Your Keys: {balance}</Text>}
    </Column>
  )
}
