import React from 'react'
import AppLogo from '@/components/ui/AppLogo'
import { Button } from '@/components/ui/button'
import { Sun, Moon } from 'lucide-react'
import { useAppStore } from '@/stores/useAppStore'
import LoginForm from '@/components/auth/LoginForm'

const LoginPage: React.FC = () => {
  const { theme, toggleTheme } = useAppStore()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-background">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="absolute top-4 right-4"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      </Button>
      <AppLogo className="h-12 mb-6" />
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage
