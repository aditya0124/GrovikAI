/** @type {import('next').NextConfig} */
const nextConfig = {
 eslint:{
  ignoreDuringBuilds:true,
 },//updatte this
  images: {
    domains: ["avatars.githubusercontent.com", "randomuser.me", "lh3.googleusercontent.com"],
  },
};

export default nextConfig;
