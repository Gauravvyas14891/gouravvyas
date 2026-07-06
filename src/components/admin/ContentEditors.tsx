import { useEffect, useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useContentBlock } from '@/hooks/useSiteData'
import { cloneContent } from '@/content/defaultContent'
import type { AboutContent, EducationItem, GoalsContent, ProjectItem, Skill, SkillCategory } from '@/content/defaultContent'
import { toast } from 'sonner'

function EditorShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section className="border border-gray-800 rounded-2xl p-6 md:p-8 bg-white/[0.015]">
      <div className="mb-6">
        <h2 className="text-xl font-light">{title}</h2>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      </div>
      {children}
    </section>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs tracking-widest uppercase text-gray-500">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  )
}

function SaveButton({ saving, onClick }: { saving: boolean; onClick: () => void }) {
  return <Button onClick={onClick} disabled={saving}>{saving ? 'Saving…' : 'Save changes'}</Button>
}

function updateArray<T>(items: T[], index: number, next: T) {
  return items.map((item, i) => (i === index ? next : item))
}

function removeArray<T>(items: T[], index: number) {
  return items.filter((_, i) => i !== index)
}

function StringListEditor({
  items,
  onChange,
  placeholder,
  multiline = false,
}: {
  items: string[]
  onChange: (items: string[]) => void
  placeholder: string
  multiline?: boolean
}) {
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={`${item}-${index}`} className="flex items-start gap-2">
          {multiline ? (
            <Textarea
              value={item}
              placeholder={placeholder}
              onChange={(e) => onChange(updateArray(items, index, e.target.value))}
              className="bg-white/[0.02] border-gray-800 min-h-24"
            />
          ) : (
            <Input
              value={item}
              placeholder={placeholder}
              onChange={(e) => onChange(updateArray(items, index, e.target.value))}
              className="bg-white/[0.02] border-gray-800"
            />
          )}
          <Button size="icon" variant="ghost" onClick={() => onChange(removeArray(items, index))}>
            <Trash2 className="w-4 h-4 text-red-400" />
          </Button>
        </div>
      ))}
      <Button size="sm" variant="outline" onClick={() => onChange([...items, ''])}>
        <Plus className="w-4 h-4 mr-2" /> Add
      </Button>
    </div>
  )
}

function saveToast(error?: { message: string } | null) {
  if (error) toast.error(error.message)
  else toast.success('Section updated')
}

function AboutEditor() {
  const { data, save, saving } = useContentBlock('about')
  const [form, setForm] = useState<AboutContent>(data)

  useEffect(() => setForm(cloneContent(data)), [data])

  async function submit() {
    const { error } = await save(form)
    saveToast(error)
  }

  return (
    <EditorShell title="About / Building to Learn" subtitle="Edit the main theory paragraphs and career objective block.">
      <div className="space-y-5">
        <Field label="Eyebrow"><Input value={form.eyebrow} onChange={(e) => setForm({ ...form, eyebrow: e.target.value })} className="bg-white/[0.02] border-gray-800" /></Field>
        <Field label="Heading lines"><StringListEditor items={form.headings} onChange={(headings) => setForm({ ...form, headings })} placeholder="Heading line" /></Field>
        <Field label="Theory paragraphs"><StringListEditor items={form.paragraphs} onChange={(paragraphs) => setForm({ ...form, paragraphs })} placeholder="Paragraph" multiline /></Field>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Aside title"><Input value={form.aside.title} onChange={(e) => setForm({ ...form, aside: { ...form.aside, title: e.target.value } })} className="bg-white/[0.02] border-gray-800" /></Field>
          <Field label="Highlighted text"><Input value={form.aside.highlight || ''} onChange={(e) => setForm({ ...form, aside: { ...form.aside, highlight: e.target.value } })} className="bg-white/[0.02] border-gray-800" /></Field>
        </div>
        <Field label="Aside text"><Textarea value={form.aside.text} onChange={(e) => setForm({ ...form, aside: { ...form.aside, text: e.target.value } })} className="bg-white/[0.02] border-gray-800" /></Field>
        <SaveButton saving={saving} onClick={submit} />
      </div>
    </EditorShell>
  )
}

function SkillsEditor() {
  const { data, save, saving } = useContentBlock('skills')
  const [form, setForm] = useState(data)

  useEffect(() => setForm(cloneContent(data)), [data])

  function updateCategory(index: number, category: SkillCategory) {
    setForm({ ...form, categories: updateArray(form.categories, index, category) })
  }

  async function submit() {
    const { error } = await save(form)
    saveToast(error)
  }

  return (
    <EditorShell title="Stack & Skills" subtitle="Add, remove, or rename skill categories and individual skills.">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Eyebrow"><Input value={form.eyebrow} onChange={(e) => setForm({ ...form, eyebrow: e.target.value })} className="bg-white/[0.02] border-gray-800" /></Field>
          <Field label="Main title"><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="bg-white/[0.02] border-gray-800" /></Field>
        </div>

        {form.categories.map((category, categoryIndex) => (
          <div key={`${category.title}-${categoryIndex}`} className="border border-gray-900 rounded-xl p-4 space-y-3">
            <div className="flex gap-2">
              <Input
                value={category.title}
                onChange={(e) => updateCategory(categoryIndex, { ...category, title: e.target.value })}
                className="bg-white/[0.02] border-gray-800"
              />
              <Button size="icon" variant="ghost" onClick={() => setForm({ ...form, categories: removeArray(form.categories, categoryIndex) })}>
                <Trash2 className="w-4 h-4 text-red-400" />
              </Button>
            </div>
            <div className="space-y-2">
              {category.items.map((skill: Skill, skillIndex: number) => (
                <div key={`${skill.name}-${skillIndex}`} className="grid grid-cols-1 md:grid-cols-[1fr_160px_40px] gap-2">
                  <Input
                    placeholder="Skill name"
                    value={skill.name}
                    onChange={(e) => updateCategory(categoryIndex, { ...category, items: updateArray(category.items, skillIndex, { ...skill, name: e.target.value }) })}
                    className="bg-white/[0.02] border-gray-800"
                  />
                  <Input
                    placeholder="Note"
                    value={skill.note || ''}
                    onChange={(e) => updateCategory(categoryIndex, { ...category, items: updateArray(category.items, skillIndex, { ...skill, note: e.target.value }) })}
                    className="bg-white/[0.02] border-gray-800"
                  />
                  <Button size="icon" variant="ghost" onClick={() => updateCategory(categoryIndex, { ...category, items: removeArray(category.items, skillIndex) })}>
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </Button>
                </div>
              ))}
              <Button size="sm" variant="outline" onClick={() => updateCategory(categoryIndex, { ...category, items: [...category.items, { name: '' }] })}>
                <Plus className="w-4 h-4 mr-2" /> Add skill
              </Button>
            </div>
          </div>
        ))}

        <Button variant="outline" onClick={() => setForm({ ...form, categories: [...form.categories, { title: 'New Category', items: [] }] })}>
          <Plus className="w-4 h-4 mr-2" /> Add category
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Learning title"><Input value={form.learningTitle} onChange={(e) => setForm({ ...form, learningTitle: e.target.value })} className="bg-white/[0.02] border-gray-800" /></Field>
          <Field label="Currently learning"><StringListEditor items={form.learning} onChange={(learning) => setForm({ ...form, learning })} placeholder="Learning item" /></Field>
        </div>

        <SaveButton saving={saving} onClick={submit} />
      </div>
    </EditorShell>
  )
}

function ProjectsEditor() {
  const { data, save, saving } = useContentBlock('projects')
  const [form, setForm] = useState(data)

  useEffect(() => setForm(cloneContent(data)), [data])

  function updateProject(index: number, project: ProjectItem) {
    setForm({ ...form, projects: updateArray(form.projects, index, project) })
  }

  async function submit() {
    const { error } = await save(form)
    saveToast(error)
  }

  return (
    <EditorShell title="Projects" subtitle="Add/remove projects, update status, features, tech stack, and descriptions.">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Eyebrow"><Input value={form.eyebrow} onChange={(e) => setForm({ ...form, eyebrow: e.target.value })} className="bg-white/[0.02] border-gray-800" /></Field>
          <Field label="Main title"><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="bg-white/[0.02] border-gray-800" /></Field>
        </div>

        {form.projects.map((project, index) => (
          <div key={`${project.name}-${index}`} className="border border-gray-900 rounded-xl p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_220px_40px] gap-2">
              <Input value={project.name} placeholder="Project name" onChange={(e) => updateProject(index, { ...project, name: e.target.value })} className="bg-white/[0.02] border-gray-800" />
              <Input list="project-status-options" value={project.status} placeholder="Status" onChange={(e) => updateProject(index, { ...project, status: e.target.value })} className="bg-white/[0.02] border-gray-800" />
              <Button size="icon" variant="ghost" onClick={() => setForm({ ...form, projects: removeArray(form.projects, index) })}>
                <Trash2 className="w-4 h-4 text-red-400" />
              </Button>
            </div>
            <datalist id="project-status-options">
              <option value="Concept Stage" />
              <option value="In Development" />
              <option value="In Progress" />
              <option value="Completed" />
              <option value="Abandoned" />
            </datalist>
            <Textarea value={project.description} placeholder="Description" onChange={(e) => updateProject(index, { ...project, description: e.target.value })} className="bg-white/[0.02] border-gray-800" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Features"><StringListEditor items={project.features} onChange={(features) => updateProject(index, { ...project, features })} placeholder="Feature" /></Field>
              <Field label="Tech"><StringListEditor items={project.tech} onChange={(tech) => updateProject(index, { ...project, tech })} placeholder="Technology" /></Field>
            </div>
          </div>
        ))}

        <Button variant="outline" onClick={() => setForm({ ...form, projects: [...form.projects, { name: 'New Project', status: 'Concept Stage', description: '', features: [], tech: [] }] })}>
          <Plus className="w-4 h-4 mr-2" /> Add project
        </Button>
        <SaveButton saving={saving} onClick={submit} />
      </div>
    </EditorShell>
  )
}

function EducationEditor() {
  const { data, save, saving } = useContentBlock('education')
  const [form, setForm] = useState(data)

  useEffect(() => setForm(cloneContent(data)), [data])

  function updateItem(index: number, item: EducationItem) {
    setForm({ ...form, items: updateArray(form.items, index, item) })
  }

  async function submit() {
    const { error } = await save(form)
    saveToast(error)
  }

  return (
    <EditorShell title="Education" subtitle="Edit degrees, institutions, periods, field names, and current status labels.">
      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Eyebrow"><Input value={form.eyebrow} onChange={(e) => setForm({ ...form, eyebrow: e.target.value })} className="bg-white/[0.02] border-gray-800" /></Field>
          <Field label="Main title"><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="bg-white/[0.02] border-gray-800" /></Field>
        </div>

        {form.items.map((item, index) => (
          <div key={`${item.degree}-${index}`} className="border border-gray-900 rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input value={item.degree} placeholder="Degree" onChange={(e) => updateItem(index, { ...item, degree: e.target.value })} className="bg-white/[0.02] border-gray-800" />
            <Input value={item.status || ''} placeholder="Status" onChange={(e) => updateItem(index, { ...item, status: e.target.value })} className="bg-white/[0.02] border-gray-800" />
            <Input value={item.field || ''} placeholder="Field / specialization" onChange={(e) => updateItem(index, { ...item, field: e.target.value })} className="bg-white/[0.02] border-gray-800" />
            <Input value={item.period} placeholder="Period" onChange={(e) => updateItem(index, { ...item, period: e.target.value })} className="bg-white/[0.02] border-gray-800" />
            <div className="md:col-span-2 flex gap-2">
              <Input value={item.institution} placeholder="Institution" onChange={(e) => updateItem(index, { ...item, institution: e.target.value })} className="bg-white/[0.02] border-gray-800" />
              <Button size="icon" variant="ghost" onClick={() => setForm({ ...form, items: removeArray(form.items, index) })}>
                <Trash2 className="w-4 h-4 text-red-400" />
              </Button>
            </div>
          </div>
        ))}

        <Button variant="outline" onClick={() => setForm({ ...form, items: [...form.items, { degree: 'New Education', institution: '', period: '' }] })}>
          <Plus className="w-4 h-4 mr-2" /> Add education
        </Button>
        <SaveButton saving={saving} onClick={submit} />
      </div>
    </EditorShell>
  )
}

function GoalsEditor() {
  const { data, save, saving } = useContentBlock('goals')
  const [form, setForm] = useState<GoalsContent>(data)

  useEffect(() => setForm(cloneContent(data)), [data])

  async function submit() {
    const { error } = await save(form)
    saveToast(error)
  }

  return (
    <EditorShell title="Focus & Goals" subtitle="Edit currently-working-on items, long-term goals, and the final note.">
      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="Eyebrow"><Input value={form.eyebrow} onChange={(e) => setForm({ ...form, eyebrow: e.target.value })} className="bg-white/[0.02] border-gray-800" /></Field>
          <Field label="Title"><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="bg-white/[0.02] border-gray-800" /></Field>
          <Field label="Muted title"><Input value={form.mutedTitle} onChange={(e) => setForm({ ...form, mutedTitle: e.target.value })} className="bg-white/[0.02] border-gray-800" /></Field>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Field label="Current list title"><Input value={form.currentTitle} onChange={(e) => setForm({ ...form, currentTitle: e.target.value })} className="bg-white/[0.02] border-gray-800" /></Field>
            <StringListEditor items={form.current} onChange={(current) => setForm({ ...form, current })} placeholder="Current focus" />
          </div>
          <div className="space-y-3">
            <Field label="Goals list title"><Input value={form.goalsTitle} onChange={(e) => setForm({ ...form, goalsTitle: e.target.value })} className="bg-white/[0.02] border-gray-800" /></Field>
            <StringListEditor items={form.goals} onChange={(goals) => setForm({ ...form, goals })} placeholder="Goal" />
          </div>
        </div>
        <Field label="Note title"><Input value={form.noteTitle} onChange={(e) => setForm({ ...form, noteTitle: e.target.value })} className="bg-white/[0.02] border-gray-800" /></Field>
        <Field label="Note"><Textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} className="bg-white/[0.02] border-gray-800" /></Field>
        <SaveButton saving={saving} onClick={submit} />
      </div>
    </EditorShell>
  )
}

export function ContentEditors() {
  return (
    <div className="space-y-8">
      <AboutEditor />
      <SkillsEditor />
      <ProjectsEditor />
      <EducationEditor />
      <GoalsEditor />
    </div>
  )
}