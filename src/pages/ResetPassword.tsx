import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

export default function ResetPasswordPage() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Supabase auto-parses the recovery hash and creates a temporary session.
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') setReady(true)
    })
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password.length < 8) return toast.error('Password must be at least 8 characters')
    if (password !== confirm) return toast.error('Passwords do not match')
    setLoading(true)
    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      toast.success('Password updated. Please sign in.')
      await supabase.auth.signOut()
      navigate('/auth', { replace: true })
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
          <h1 className="font-display text-5xl mt-2">Reset Password</h1>
          <p className="text-sm text-gray-500 mt-3">
            {ready ? 'Set a new password for your account.' : 'Waiting for recovery link verification…'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs tracking-widest uppercase text-gray-500">New Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="mt-2 bg-white/[0.02] border-gray-800"
            />
          </div>
          <div>
            <label className="text-xs tracking-widest uppercase text-gray-500">Confirm Password</label>
            <Input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              minLength={8}
              className="mt-2 bg-white/[0.02] border-gray-800"
            />
          </div>
          <Button type="submit" disabled={loading || !ready} className="w-full">
            {loading ? '...' : 'Update Password'}
          </Button>
        </form>

        <button
          type="button"
          onClick={() => navigate('/auth')}
          className="mt-6 text-sm text-gray-400 hover:text-white transition"
        >
          ← Back to sign in
        </button>
      </div>
    </div>
  )
}
