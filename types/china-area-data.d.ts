declare module 'china-area-data' {
  const data: {
    [key: string]: {
      [key: string]: string
    }
  }
  export default data
}

declare module 'world-countries' {
  interface Country {
    cca3: string
    name: {
      common: string
    }
    capital?: string[]
  }
  
  const countries: Country[]
  export default countries
} 