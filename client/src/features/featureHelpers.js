export const cancelOnLoading = key => (  {
    condition: (_, { getState }) => {
      // @ts-ignore
      const { status } = getState()[key];
      if (status === 'fulfilled' || status === 'loading') {
        // Already fetched or in progress, don't need to re-fetch
        return false
      }
    },
  })