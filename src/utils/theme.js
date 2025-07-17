import { useQuasar } from 'quasar'
import { themes } from 'src/assets/themes'

export function applyTheme(themeName = 'default', isDark = false) {
  const theme = themes[themeName]?.[isDark ? 'dark' : 'light']
  if (!theme) return

  const root = document.documentElement
  Object.entries(theme).forEach(([varName, value]) => {
    root.style.setProperty(varName, value)
  })
}
