import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

export default function AuthPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin')
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
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        })
        if (error) throw error
        toast.success('Account created. You can now sign in.')
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

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="mb-10">
          <span className="text-xs tracking-widest uppercase text-gray-500">Admin</span>
          <h1 className="font-display text-5xl mt-2">{mode === 'signin' ? 'Sign In' : 'Create Account'}</h1>
          <p className="text-sm text-gray-500 mt-3">
            Only the site owner (whitelisted email) receives admin privileges.
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
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? '...' : mode === 'signin' ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
          className="mt-6 text-sm text-gray-400 hover:text-white transition"
        >
          {mode === 'signin' ? 'First time? Create your account →' : '← Back to sign in'}
        </button>

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
