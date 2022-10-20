import { AnalyticsBrowser } from '@segment/analytics-next'
import React from 'react'

const AnalyticsContext = React.createContext(undefined);


export const AnalyticsProvider = ({ children, writeKey }) => {
  const analytics = React.useMemo(
    () => AnalyticsBrowser.load({ writeKey }),
    [writeKey]
  );
  return (
    <AnalyticsContext.Provider value={analytics}>
      {children}
    </AnalyticsContext.Provider>
  );
};

// Create an analytics hook that we can use with other components.
export const useAnalytics = () => {
  const result = React.useContext(AnalyticsContext);
  if (!result) {
    throw new Error("Context used outside of its Provider!");
  }
  return result;
};

// use the context we just created...
const TrackButton = () => {
  const analytics = useAnalytics()
  return (
    <button onClick={() => analytics.track('hello world')}>
      Track!
    </button>
  )
}