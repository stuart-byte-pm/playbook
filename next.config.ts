import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  /* Set turbopack root to this directory to suppress workspace root detection
     warning caused by lockfiles in parent directories. */
  turbopack: {
    root: path.resolve(__dirname),
  },
}

export default nextConfig
