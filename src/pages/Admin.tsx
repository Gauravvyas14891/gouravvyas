import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'
import { useAdmin } from '@/hooks/useAdmin'
import { useSiteSettings, useCustomSections, type SectionItem } from '@/hooks/useSiteData'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Trash2, Plus, LogOut, Eye, EyeOff, Upload } from 'lucide-react'

export default function AdminPage() {
  const navigate = useNavigate()
  const { session, isAdmin, loading } = useAdmin()

  useEffect(() => {
    if (!loading && !session) navigate('/auth', { replace: true })
  }, [session, loading, navigate])

  async function handleSignOut() {
    await supabase.auth.signOut()
    navigate('/', { replace: true })
  }

  if (loading) return <div className="min-h-screen bg-background text-white p-10">Loading…</div>

  if (session && !isAdmin) {
    return (
      <div className="min-h-screen bg-background text-white p-10 max-w-2xl mx-auto">
        <h1 className="font-display text-4xl mb-4">Not authorized</h1>
        <p className="text-gray-400 mb-6">
          Your account ({session.user.email}) does not have admin access.
        </p>
        <Button onClick={handleSignOut} variant="outline">Sign out</Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-white">
      <header className="border-b border-gray-900 px-6 md:px-10 py-6 flex items-center justify-between">
        <div>
          <span className="text-xs tracking-widest uppercase text-gray-500">Admin Console</span>
          <h1 className="font-display text-3xl">Site Editor</h1>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={() => navigate('/')}>View site</Button>
          <Button variant="outline" size="sm" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" /> Sign out
          </Button>
        </div>
      </header>

      <main className="px-6 md:px-10 py-10 max-w-5xl mx-auto space-y-16">
        <ContactEditor />
        <SectionsEditor />
      </main>
    </div>
  )
}

function Card({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="border border-gray-800 rounded-2xl p-6 md:p-8 bg-white/[0.015]">
      <div className="mb-6">
        <h2 className="text-xl font-light">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      {children}
    </section>
  )
}

function ContactEditor() {
  const { settings, reload } = useSiteSettings()
  const [form, setForm] = useState({ email: '', linkedin_url: '', github_url: '', location: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (settings) setForm({
      email: settings.email || '',
      linkedin_url: settings.linkedin_url || '',
      github_url: settings.github_url || '',
      location: settings.location || '',
    })
  }, [settings])

  async function save() {
    setSaving(true)
    const { error } = await supabase.from('site_settings').update(form).eq('id', 1)
    setSaving(false)
    if (error) toast.error(error.message)
    else {
      toast.success('Contact info updated')
      reload()
    }
  }

  return (
    <Card title="Contact Info" subtitle="Shown in the site footer / Contact section.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(['email', 'linkedin_url', 'github_url', 'location'] as const).map((key) => (
          <div key={key}>
            <label className="text-xs tracking-widest uppercase text-gray-500">{key.replace('_', ' ')}</label>
            <Input
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className="mt-2 bg-white/[0.02] border-gray-800"
            />
          </div>
        ))}
      </div>
      <Button onClick={save} disabled={saving} className="mt-6">
        {saving ? 'Saving…' : 'Save'}
      </Button>
    </Card>
  )
}

function SectionsEditor() {
  const { sections, items, reload } = useCustomSections(true)
  const [newTitle, setNewTitle] = useState('')
  const [newType, setNewType] = useState<'timeline' | 'cards' | 'documents'>('timeline')

  async function addSection() {
    if (!newTitle.trim()) return
    const slug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + Date.now().toString(36)
    const maxPos = sections.reduce((m, s) => Math.max(m, s.position), 0)
    const { error } = await supabase.from('custom_sections').insert({
      title: newTitle.trim(),
      slug,
      type: newType,
      position: maxPos + 10,
    })
    if (error) toast.error(error.message)
    else {
      toast.success('Section added')
      setNewTitle('')
      reload()
    }
  }

  return (
    <Card
      title="Custom Sections"
      subtitle="Add new sections like Experience, Certifications, or Publications. Choose a layout template — the site renders them in your theme automatically."
    >
      <div className="border border-dashed border-gray-800 rounded-xl p-5 mb-8">
        <p className="text-xs tracking-widest uppercase text-gray-500 mb-3">Add New Section</p>
        <div className="flex flex-col md:flex-row gap-3">
          <Input
            placeholder="e.g. Experience, Certifications"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="bg-white/[0.02] border-gray-800"
          />
          <select
            value={newType}
            onChange={(e) => setNewType(e.target.value as typeof newType)}
            className="bg-white/[0.02] border border-gray-800 rounded-md px-3 text-sm"
          >
            <option value="timeline">Timeline (Experience / Education)</option>
            <option value="cards">Cards (Grid layout)</option>
            <option value="documents">Documents (Certificates / PDFs)</option>
          </select>
          <Button onClick={addSection}>
            <Plus className="w-4 h-4 mr-2" /> Add
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {sections.length === 0 && <p className="text-sm text-gray-500">No custom sections yet.</p>}
        {sections.map((sec) => (
          <SectionCard
            key={sec.id}
            section={sec}
            items={items.filter((i) => i.section_id === sec.id)}
            onChange={reload}
          />
        ))}
      </div>
    </Card>
  )
}

function SectionCard({
  section,
  items,
  onChange,
}: {
  section: ReturnType<typeof useCustomSections>['sections'][number]
  items: SectionItem[]
  onChange: () => void
}) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(section.title)
  const [intro, setIntro] = useState(section.intro || '')

  async function saveMeta() {
    const { error } = await supabase
      .from('custom_sections')
      .update({ title, intro })
      .eq('id', section.id)
    if (error) toast.error(error.message)
    else {
      toast.success('Updated')
      setEditing(false)
      onChange()
    }
  }

  async function toggleVisible() {
    await supabase.from('custom_sections').update({ visible: !section.visible }).eq('id', section.id)
    onChange()
  }

  async function deleteSection() {
    if (!confirm(`Delete section "${section.title}" and all its items?`)) return
    await supabase.from('custom_sections').delete().eq('id', section.id)
    toast.success('Deleted')
    onChange()
  }

  return (
    <div className="border border-gray-800 rounded-xl p-5 bg-black/40">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-1">
          {editing ? (
            <div className="space-y-2">
              <Input value={title} onChange={(e) => setTitle(e.target.value)} className="bg-white/[0.02] border-gray-800" />
              <Textarea
                placeholder="Optional intro paragraph"
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
                className="bg-white/[0.02] border-gray-800"
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={saveMeta}>Save</Button>
                <Button size="sm" variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
              </div>
            </div>
          ) : (
            <>
              <h3 className="text-lg font-light">{section.title}</h3>
              <p className="text-xs text-gray-500 mt-1 tracking-widest uppercase">
                {section.type} · {items.length} items {!section.visible && '· hidden'}
              </p>
              {section.intro && <p className="text-sm text-gray-400 mt-2">{section.intro}</p>}
            </>
          )}
        </div>
        {!editing && (
          <div className="flex gap-1">
            <Button size="icon" variant="ghost" onClick={() => setEditing(true)}>✎</Button>
            <Button size="icon" variant="ghost" onClick={toggleVisible}>
              {section.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </Button>
            <Button size="icon" variant="ghost" onClick={deleteSection}>
              <Trash2 className="w-4 h-4 text-red-400" />
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-2 mb-4">
        {items.map((item) => (
          <ItemRow key={item.id} item={item} onChange={onChange} />
        ))}
      </div>

      <NewItemForm sectionId={section.id} sectionType={section.type} onCreated={onChange} />
    </div>
  )
}

function ItemRow({ item, onChange }: { item: SectionItem; onChange: () => void }) {
  async function del() {
    if (!confirm(`Delete "${item.title}"?`)) return
    await supabase.from('section_items').delete().eq('id', item.id)
    onChange()
  }
  return (
    <div className="flex items-start justify-between gap-3 border border-gray-900 rounded-lg p-3">
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white truncate">{item.title}</p>
        {item.subtitle && <p className="text-xs text-gray-500 truncate">{item.subtitle}</p>}
        {item.period && <p className="text-[10px] text-gray-600 tracking-widest uppercase">{item.period}</p>}
        {item.file_url && (
          <a href={item.file_url} target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:underline">
            {item.file_name || 'attachment'}
          </a>
        )}
      </div>
      <Button size="icon" variant="ghost" onClick={del}>
        <Trash2 className="w-3.5 h-3.5 text-red-400" />
      </Button>
    </div>
  )
}

function NewItemForm({
  sectionId,
  sectionType,
  onCreated,
}: {
  sectionId: string
  sectionType: string
  onCreated: () => void
}) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ title: '', subtitle: '', description: '', period: '' })
  const [file, setFile] = useState<File | null>(null)
  const [busy, setBusy] = useState(false)

  async function submit() {
    if (!form.title.trim()) return
    setBusy(true)
    try {
      let file_url: string | null = null
      let file_name: string | null = null
      if (file) {
        const path = `${sectionId}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
        const { error: upErr } = await supabase.storage.from('section-files').upload(path, file)
        if (upErr) throw upErr
        const { data } = supabase.storage.from('section-files').getPublicUrl(path)
        file_url = data.publicUrl
        file_name = file.name
      }
      const { error } = await supabase.from('section_items').insert({
        section_id: sectionId,
        title: form.title.trim(),
        subtitle: form.subtitle.trim() || null,
        description: form.description.trim() || null,
        period: form.period.trim() || null,
        file_url,
        file_name,
      })
      if (error) throw error
      toast.success('Item added')
      setForm({ title: '', subtitle: '', description: '', period: '' })
      setFile(null)
      setOpen(false)
      onCreated()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed')
    } finally {
      setBusy(false)
    }
  }

  if (!open) {
    return (
      <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
        <Plus className="w-4 h-4 mr-2" /> Add item
      </Button>
    )
  }

  return (
    <div className="space-y-3 border border-gray-800 rounded-lg p-4 bg-white/[0.01]">
      <Input
        placeholder="Title (e.g. Frontend Developer at Acme)"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="bg-white/[0.02] border-gray-800"
      />
      <Input
        placeholder="Subtitle / organization"
        value={form.subtitle}
        onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
        className="bg-white/[0.02] border-gray-800"
      />
      <Input
        placeholder="Period (e.g. 2024 — Present)"
        value={form.period}
        onChange={(e) => setForm({ ...form, period: e.target.value })}
        className="bg-white/[0.02] border-gray-800"
      />
      <Textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="bg-white/[0.02] border-gray-800"
      />
      <div>
        <label className="text-xs tracking-widest uppercase text-gray-500 flex items-center gap-2">
          <Upload className="w-3 h-3" /> Attach file {sectionType === 'documents' && '(required for documents)'}
        </label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mt-2 text-sm text-gray-400"
        />
      </div>
      <div className="flex gap-2">
        <Button size="sm" onClick={submit} disabled={busy}>
          {busy ? 'Saving…' : 'Save item'}
        </Button>
        <Button size="sm" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
      </div>
    </div>
  )
}
