import React from "react"
import { Route, Routes, Navigate } from "react-router-dom"

import { FundraisingClaimPage } from "./pages/FundraisingClaim"
import { StakingPage } from "./pages/Staking"
import { CalculatorPage } from "./pages/Calculator"
import { USForbiddenPage } from "./pages/USForbidden"
import { OverviewPage } from "./pages/Overview"
import { ProtocolPage } from "./pages/Protocol"
import { MintPage } from "./pages/Mint"
import AppStakers from "./AppStakers"
import AppProtocols from "./AppProtocols"
import AppInternal from "./AppInternal"

import { routes, protocolsRoutes, internalRoutes } from "./utils/routes"
import MobileBlock from "./components/MobileBlock/MobileBlock"
import { InternalOverviewPage } from "./pages/InternalOverview/InternalOverview"

function App() {
  return (
    <>
      <Routes>
        {/** Stakers section routes */}
        <Route path="/*" element={<AppStakers />}>
          0
          <Route path={routes.StakeSD} element={<div style={{ fontWeight: 700, fontSize: 40 }}>Coming Soon...</div>} />
          <Route path={routes.StakeUSDC} element={<StakingPage token="USDC" />} />
          <Route path={routes.StakeWFTM} element={<StakingPage token="WFTM" />} />
          <Route path={routes.Overview} element={<OverviewPage />} />
          <Route path={routes.Mint} element={<MintPage />} />
          <Route path={routes.Calculator} element={<CalculatorPage />} />
          <Route path={routes.FundraiseClaim} element={<FundraisingClaimPage />} />
          <Route path={routes.USForbidden} element={<USForbiddenPage />} />
          <Route path="*" element={<Navigate replace to={`/${routes.StakeSD}`} />} />
        </Route>

        {/** Protocols section routes */}
        <Route path={`${routes.Protocols}/*`} element={<AppProtocols />}>
          <Route path={protocolsRoutes.Balance} element={<ProtocolPage />} />

          <Route path="*" element={<Navigate replace to={protocolsRoutes.Balance} />} />
        </Route>

        {/** Internal section routes */}
        <Route path={`${routes.Internal}/*`} element={<AppInternal />}>
          <Route path={internalRoutes.InternalOverview} element={<InternalOverviewPage />} />

          <Route path="*" element={<Navigate replace to={internalRoutes.InternalOverview} />} />
        </Route>

        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>

      <MobileBlock />
    </>
  )
}

export default App
