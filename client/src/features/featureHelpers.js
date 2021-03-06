export const cancelOnLoading = key => (  {
    condition: (_, { getState }) => {
      // @ts-ignore
      const { status } = getState()[key];
      if (status === 'fulfilled' || status === 'loading' || status === "unititialised") {
        // Already fetched or in progress, don't need to re-fetch
        return false
      }
    },
  })

export const getExpiry = expiry => new Date().getTime() + (expiry * 1000)