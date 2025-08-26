// 'use client';

// import { useSearchParams } from 'next/navigation';

// export default function AuthErrorPage() {
//   const searchParams = useSearchParams();
//   const error = searchParams.get('error');

//   const errorMessage = {
//     OAuthAccountNotLinked:
//       'This email is already associated with a different sign-in method. Please use the method you originally used.',
//     AccessDenied: 'Access Denied.',
//     Configuration: 'There was a server configuration issue.',
//     default: 'An unknown error occurred. Please try again later.',
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4">
//       <div className="bg-white shadow p-6 rounded-md text-center max-w-md w-full">
//         <h1 className="text-xl font-bold mb-4 text-red-600">Sign In Error</h1>
//         <p className="text-gray-700">
//           {errorMessage[error] || errorMessage.default}
//         </p>

//         <a
//           href="/signin"
//           className="mt-6 inline-block text-blue-600 underline"
//         >
//           Go back to sign in
//         </a>
//       </div>
//     </div>
//   );
// }
import React from 'react'

const Eror = () => {
  return (
    <div>Eror</div>
  )
}

export default Eror