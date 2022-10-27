// Basic example in a NextJs app. This page will be fully rendered during SSR:
 
  import { useAuth } from '@clerk/nextjs'
  import { withServerSideAuth } from '@clerk/nextjs/api'
 
//   const getServerSideProps = withServerSideAuth();
 
  export default function HelloPage(){
    const { isSignedIn, sessionId, userId } = useAuth();
    console.log(isSignedIn, sessionId, userId)
    return <div>...</div>
  }