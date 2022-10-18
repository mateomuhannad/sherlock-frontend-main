export const routes = {
  StakeSD: "stakesd",
  StakeUSDC: "stakeusdc",
  StakeWFTM: "stakewftm",
  Calculator: "calculator",
  Fundraise: "fundraise",
  FundraiseClaim: "fundraiseclaim",
  Protocols: "protocols",
  Internal: "internal",
  Overview: "overview",
  Mint: "mint",
  USForbidden: "us",
} as const

export const protocolsRoutes = {
  Balance: "balance",
} as const

export const internalRoutes = {
  InternalOverview: "overview",
} as const

type R = typeof routes & typeof protocolsRoutes & typeof internalRoutes

type ValueOf<T> = T[keyof T]

export type Route = ValueOf<R>
