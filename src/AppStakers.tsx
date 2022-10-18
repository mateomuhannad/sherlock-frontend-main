import React, { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useAccount } from "wagmi"
import { Header, NavigationLink } from "./components/Header"
import { useFundraisePosition } from "./hooks/api/useFundraisePosition"
import { routes } from "./utils/routes"

import styles from "./App.module.scss"

const AppStakers = () => {
  const accountData = useAccount()
  const { getFundraisePosition, data: fundraisePositionData } = useFundraisePosition()

  useEffect(() => {
    if (accountData.address) {
      getFundraisePosition(accountData.address)
    }
  }, [accountData.address, getFundraisePosition])

  const navigationLinks: NavigationLink[] = [
    {
      title: "OVERVIEW",
      route: routes.Overview,
    },
    {
      title: "MINT",
      route: routes.Mint,
    },
    {
      title: "SD",
      route: routes.StakeSD,
    },
    {
      title: "USDC",
      route: routes.StakeUSDC,
    },
    {
      title: "WFTM",
      route: routes.StakeWFTM,
    },
    {
      title: "CALCULATOR",
      route: routes.Calculator,
    },
  ]

  if (fundraisePositionData) {
    navigationLinks.push({
      title: "CLAIM",
      route: routes.FundraiseClaim,
    })
  }

  navigationLinks.push({
    title: "DOCS",
    route: routes.Protocols,
    external: true,
  })

  return (
    <div className={styles.app}>
      <div className={styles.noise} />
      <Header navigationLinks={navigationLinks} />
      <div className={styles.contentContainer}>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AppStakers
