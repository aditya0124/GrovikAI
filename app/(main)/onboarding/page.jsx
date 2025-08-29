import React from 'react'
import OnboardingForm from './_components/onboarding-form'
import { industries } from '@/data/industries'
import { getUserOnboardingStatus } from '@/actions/user'
import { redirect } from 'next/navigation'

// if user is already onboarde, i.e filled all details redirect  to home page

// if not then redirect to onboarding page
// It is client side check, so we can use useEffect to check if user is onboarded or not

const OnboardingPage = async() => {
  // check if user is onboarded or not
  const isOnboarded = await getUserOnboardingStatus()
  if (isOnboarded) {
    // redirect to home page
    redirect('/dashboard')
  }
  
  return (
    <main>
        <OnboardingForm industries={industries}/>

        {/* <h1 className='text-5xl'>Not Onboarded</h1> */}
    </main>
  )
}

export default OnboardingPage