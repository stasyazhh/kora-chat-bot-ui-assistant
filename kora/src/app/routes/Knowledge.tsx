import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Upload,
  FileText,
  MoreHorizontal,
  CheckCircle2,
  Loader2,
  Plus,
  MessageSquare,
  Globe,
  RotateCcw,
} from 'lucide-react'
import { useAppState, type Source } from '../state'
import { PageHeader } from '../components/PageHeader'
import { Modal } from '../components/Modal'

function statusClasses(status: Source['status']) {
  return status === 'Ready'
    ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
    : 'bg-amber-50 text-amber-700 border-amber-100'
}

function fileType(name: string): string {
  const ext = name.split('.').pop()?.toLowerCase()
  if (ext === 'pdf') return 'PDF'
  if (ext === 'docx' || ext === 'doc') return 'DOCX'
  if (ext === 'txt') return 'TXT'
  if (ext === 'csv') return 'CSV'
  return 'Doc'
}

export function Knowledge() {
  const navigate = useNavigate()
  const { sources, addSource, addSampleSources } = useAppState()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedSource, setSelectedSource] = useState<Source | null>(null)
  const [urlModalOpen, setUrlModalOpen] = useState(false)
  const [urlInput, setUrlInput] = useState('')

  const readyCount = sources.filter((s) => s.status === 'Ready').length
  const sampleLabel = sources.length > 0 ? 'Reset demo content' : 'Add sample content'

  const handleFiles = (files: FileList | null) => {
    if (!files) return
    Array.from(files).forEach((file) => {
      addSource({
        name: file.name,
        meta: `${(file.size / 1024).toFixed(1)} KB`,
        status: 'Processing',
        type: fileType(file.name),
      })
    })
  }

  const handleAddUrl = (e: React.FormEvent) => {
    e.preventDefault()
    if (!urlInput.trim()) return
    addSource({
      name: urlInput.trim(),
      meta: 'Public URL',
      status: 'Processing',
      type: 'URL',
    })
    setUrlInput('')
    setUrlModalOpen(false)
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-8 lg:py-10">
      <PageHeader
        title="Knowledge"
        subtitle="Add the information Kora should use to answer customers."
      />

      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          handleFiles(e.dataTransfer.files)
        }}
        className="cursor-pointer rounded-2xl border-2 border-dashed border-kora-border bg-white p-6 text-center transition-colors hover:border-kora-accent/40 hover:bg-kora-chip/30"
      >
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-kora-chip text-kora-accent">
          <Upload className="h-5 w-5" />
        </div>
        <p className="mt-3 text-sm font-medium text-kora-text">
          Drag and drop files here, or click to browse
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              fileInputRef.current?.click()
            }}
            className="inline-flex items-center gap-2 rounded-full border border-kora-border bg-white px-5 py-2 text-sm font-semibold text-kora-text transition-colors hover:border-kora-accent hover:text-kora-accent"
          >
            Browse files
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setUrlModalOpen(true)
            }}
            className="inline-flex items-center gap-2 rounded-full border border-kora-border bg-white px-5 py-2 text-sm font-semibold text-kora-text transition-colors hover:border-kora-accent hover:text-kora-accent"
          >
            <Globe className="h-4 w-4" />
            Add URL
          </button>
        </div>
        <p className="mt-3 text-xs text-kora-muted">
          PDF, DOCX, TXT, CSV and public URLs
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => {
            handleFiles(e.target.files)
            e.currentTarget.value = ''
          }}
        />
      </div>

      <div className="mt-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-kora-text">Sources</h2>
        <button
          type="button"
          onClick={addSampleSources}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-kora-accent transition-colors hover:bg-kora-chip"
        >
          {sources.length > 0 ? <RotateCcw className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {sampleLabel}
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {sources.length === 0 && (
          <div className="rounded-xl border border-kora-border bg-white p-6 text-center text-sm text-kora-muted">
            No sources yet. Upload files, add a URL, or reset demo content to get started.
          </div>
        )}
        {sources.map((source) => (
          <div
            key={source.id}
            role="button"
            tabIndex={0}
            onClick={() => setSelectedSource(source)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setSelectedSource(source)
            }}
            className="flex w-full cursor-pointer items-center gap-4 rounded-xl border border-kora-border bg-white p-4 text-left transition-colors hover:border-kora-accent/30"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-kora-chip text-kora-accent">
              <FileText className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-semibold text-kora-text">{source.name}</p>
                {source.type && (
                  <span className="hidden rounded-md bg-kora-bg px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-kora-muted sm:inline">
                    {source.type}
                  </span>
                )}
              </div>
              <p className="text-xs text-kora-muted">{source.meta}</p>
            </div>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${statusClasses(
                source.status
              )}`}
            >
              {source.status === 'Ready' ? (
                <CheckCircle2 className="h-3.5 w-3.5" />
              ) : (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              )}
              {source.status}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
              }}
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-kora-muted transition-colors hover:bg-kora-bg hover:text-kora-text"
              aria-label="Source options"
            >
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>

      {sources.length > 0 && (
        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-kora-border bg-white p-6 shadow-sm sm:flex-row sm:items-center">
          <div>
            <p className="text-lg font-semibold text-kora-text">Your assistant is ready</p>
            <p className="text-sm text-kora-muted">
              {readyCount} source{readyCount === 1 ? '' : 's'} are indexed and ready to answer customer questions.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/app/test')}
            className="inline-flex items-center gap-2 rounded-full bg-kora-accent px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-kora-accent-hover"
          >
            <MessageSquare className="h-4 w-4" />
            Test your assistant
          </button>
        </div>
      )}

      <Modal open={!!selectedSource} onClose={() => setSelectedSource(null)} title="Source details">
        {selectedSource && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-kora-chip text-kora-accent">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-kora-text">{selectedSource.name}</p>
                <p className="text-sm text-kora-muted">{selectedSource.meta}</p>
              </div>
            </div>
            <div className="rounded-xl bg-kora-bg p-4 text-sm text-kora-muted">
              This is a prototype source. In the real product, extracted questions and sections would appear here.
            </div>
            <button
              type="button"
              onClick={() => setSelectedSource(null)}
              className="w-full rounded-full bg-kora-accent py-2.5 text-sm font-semibold text-white hover:bg-kora-accent-hover"
            >
              Close
            </button>
          </div>
        )}
      </Modal>

      <Modal open={urlModalOpen} onClose={() => setUrlModalOpen(false)} title="Add URL">
        <form onSubmit={handleAddUrl} className="space-y-4">
          <div>
            <label htmlFor="source-url" className="mb-1.5 block text-sm font-medium text-kora-text">
              Public URL
            </label>
            <input
              id="source-url"
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com/help"
              className="w-full rounded-xl border border-kora-border bg-white px-4 py-2.5 text-sm text-kora-text focus:border-kora-accent focus:outline-none focus:ring-2 focus:ring-kora-accent/10"
              required
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setUrlModalOpen(false)}
              className="flex-1 rounded-full border border-kora-border bg-white py-2.5 text-sm font-semibold text-kora-text transition-colors hover:bg-kora-bg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-full bg-kora-accent py-2.5 text-sm font-semibold text-white transition-colors hover:bg-kora-accent-hover"
            >
              Add
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
