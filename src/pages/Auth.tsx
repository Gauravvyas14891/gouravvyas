import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

type Mode = 'signin' | 'forgot'

export default function AuthPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<Mode>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate('/admin', { replace: true })
    })
  }, [navigate])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      if (mode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        })
        if (error) throw error
        toast.success('Password reset link sent. Check your inbox.')
        setMode('signin')
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        toast.success('Signed in')
        navigate('/admin', { replace: true })
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const title = mode === 'signin' ? 'Sign In' : 'Reset Password'

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="mb-10">
          <span className="text-xs tracking-widest uppercase text-gray-500">Admin</span>
          <h1 className="font-display text-5xl mt-2">{title}</h1>
          <p className="text-sm text-gray-500 mt-3">
            {mode === 'forgot'
              ? 'Enter your admin email and we\'ll send you a secure link to set a new password.'
              : 'Only the site owner (whitelisted email) receives admin privileges.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs tracking-widest uppercase text-gray-500">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 bg-white/[0.02] border-gray-800"
            />
          </div>
          {mode !== 'forgot' && (
            <div>
              <label className="text-xs tracking-widest uppercase text-gray-500">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="mt-2 bg-white/[0.02] border-gray-800"
              />
            </div>
          )}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? '...' : mode === 'signin' ? 'Sign In' : 'Send Reset Link'}
          </Button>
        </form>

        <div className="mt-6 space-y-2">
          {mode === 'signin' && (
            <button
              type="button"
              onClick={() => setMode('forgot')}
              className="block text-sm text-gray-400 hover:text-white transition"
            >
              Forgot password? →
            </button>
          )}
          {mode !== 'signin' && (
            <button
              type="button"
              onClick={() => setMode('signin')}
              className="block text-sm text-gray-400 hover:text-white transition"
            >
              ← Back to sign in
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="mt-4 block text-xs text-gray-600 hover:text-gray-400"
        >
          Back to site
        </button>
      </div>
    </div>
  )
}
