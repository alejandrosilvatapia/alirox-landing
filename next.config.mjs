/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    // Windows-only: fix cache/output paths when username contains special characters (e.g. "Alejandro!")
    if (process.platform === 'win32') {
      config.cache = {
        type: 'filesystem',
        cacheDirectory: 'C:\\ProgramData\\alirox-landing-cache\\webpack',
      }

      if (config.output && config.output.path) {
        config.output.path = config.output.path
          .replace(/C:\\Users\\[^\\]+\\/, 'C:\\ProgramData\\alirox-landing-build\\')
      }

      const fixStr = (val) => {
        if (typeof val === 'string' && val.includes('Alejandro!')) {
          return val.replace(
            /C:\\Users\\[^\\]+\\/g,
            'C:\\ProgramData\\alirox-landing-build\\'
          )
        }
        return val
      }

      const fixRules = (rules) => {
        if (!Array.isArray(rules)) return rules
        return rules.map((rule) => {
          if (!rule || typeof rule !== 'object') return rule
          const fixed = { ...rule }

          if (typeof fixed.test === 'string') fixed.test = fixStr(fixed.test)

          if (fixed.issuer) {
            if (typeof fixed.issuer === 'string') {
              fixed.issuer = fixStr(fixed.issuer)
            } else if (fixed.issuer instanceof RegExp) {
              // leave untouched
            } else if (typeof fixed.issuer === 'object') {
              const issuer = { ...fixed.issuer }
              if (Array.isArray(issuer.and)) issuer.and = issuer.and.map((i) => typeof i === 'string' ? fixStr(i) : i)
              if (Array.isArray(issuer.or)) issuer.or = issuer.or.map((i) => typeof i === 'string' ? fixStr(i) : i)
              if (typeof issuer.not === 'string') issuer.not = fixStr(issuer.not)
              fixed.issuer = issuer
            }
          }

          if (typeof fixed.include === 'string') fixed.include = fixStr(fixed.include)
          if (Array.isArray(fixed.include)) fixed.include = fixed.include.map(i => typeof i === 'string' ? fixStr(i) : i)
          if (typeof fixed.exclude === 'string') fixed.exclude = fixStr(fixed.exclude)

          if (fixed.oneOf) fixed.oneOf = fixRules(fixed.oneOf)
          if (fixed.rules) fixed.rules = fixRules(fixed.rules)

          return fixed
        })
      }

      if (config.module && config.module.rules) {
        config.module.rules = fixRules(config.module.rules)
      }
    }

    return config
  },
}

export default nextConfig
