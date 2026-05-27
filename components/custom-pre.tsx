"use client"

import React, { useState, useEffect, useMemo } from "react"
import { Check, Copy, ChevronDown } from "lucide-react"

// Helper to recursively extract raw text content from React children
const getRawText = (node: any): string => {
  if (!node) return ""
  if (typeof node === "string") return node
  if (typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(getRawText).join("")
  if (node.props) {
    if (node.props.children) {
      return getRawText(node.props.children)
    }
  }
  return ""
}

// Normalize language identifier to standard name used in options and Prism
const normalizeLang = (lang: string) => {
  if (!lang) return "plaintext"
  const l = lang.toLowerCase()
  if (l === "text" || l === "plaintext" || l === "txt") return "plaintext"
  if (l === "js" || l === "javascript") return "javascript"
  if (l === "ts" || l === "typescript") return "typescript"
  if (l === "py" || l === "python") return "python"
  if (l === "bash" || l === "sh" || l === "shell") return "bash"
  if (l === "java") return "java"
  if (l === "html") return "html"
  if (l === "css") return "css"
  if (l === "cpp" || l === "c++") return "cpp"
  if (l === "go") return "go"
  if (l === "rust") return "rust"
  if (l === "sql") return "sql"
  return l
}

const LANGUAGES = [
  { value: "plaintext", label: "text" },
  { value: "javascript", label: "javascript" },
  { value: "typescript", label: "typescript" },
  { value: "java", label: "java" },
  { value: "python", label: "python" },
  { value: "html", label: "html" },
  { value: "css", label: "css" },
  { value: "cpp", label: "c++" },
  { value: "go", label: "go" },
  { value: "rust", label: "rust" },
  { value: "sql", label: "sql" },
  { value: "bash", label: "bash" },
]

export function CustomPre(props: any) {
  const { children } = props

  // Get the first child to check if it's a code block
  const firstChild = React.Children.toArray(children)[0]
  const isCodeElement = React.isValidElement(firstChild) && (firstChild.type === "code")

  // Fallback to normal pre rendering if this is not a markdown code block
  if (!isCodeElement) {
    return <pre {...props}>{children}</pre>
  }

  const codeEl = firstChild as React.ReactElement<any>
  const className = codeEl?.props?.className || ""
  
  // Resolve original language from code element or pre element
  const originalLang = useMemo(() => {
    const rawLang = props["data-language"] || 
      codeEl?.props?.["data-language"] || 
      (className.match(/language-(\w+)/)?.[1]) || 
      "plaintext"
    return normalizeLang(rawLang)
  }, [props, codeEl, className])

  const [selectedLang, setSelectedLang] = useState<string>(originalLang)
  const [copied, setCopied] = useState<boolean>(false)
  const [prismInstance, setPrismInstance] = useState<any>(null)
  const [highlightedHtml, setHighlightedHtml] = useState<string>("")

  // Extract raw code string
  const rawCode = useMemo(() => {
    return getRawText(codeEl.props.children).trim()
  }, [codeEl.props.children])

  // Reset selected language if original changes
  useEffect(() => {
    setSelectedLang(originalLang)
  }, [originalLang])

  // Lazy-load Prism and its components on client-side to prevent SSR window issues
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loadPrism = async () => {
        try {
          const Prism = (await import("prismjs")).default
          
          // Load specific language components
          // @ts-ignore
          await import("prismjs/components/prism-markup") // html/xml
          // @ts-ignore
          await import("prismjs/components/prism-css")
          // @ts-ignore
          await import("prismjs/components/prism-javascript")
          // @ts-ignore
          await import("prismjs/components/prism-typescript")
          // @ts-ignore
          await import("prismjs/components/prism-java")
          // @ts-ignore
          await import("prismjs/components/prism-python")
          // @ts-ignore
          await import("prismjs/components/prism-c")
          // @ts-ignore
          await import("prismjs/components/prism-cpp")
          // @ts-ignore
          await import("prismjs/components/prism-go")
          // @ts-ignore
          await import("prismjs/components/prism-rust")
          // @ts-ignore
          await import("prismjs/components/prism-sql")
          // @ts-ignore
          await import("prismjs/components/prism-bash")

          setPrismInstance(Prism)
        } catch (err) {
          console.error("Failed to load Prism.js dynamically:", err)
        }
      }
      loadPrism()
    }
  }, [])

  // Safely escape HTML characters for plaintext or unsupported languages
  const escapeHtml = (text: string) => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
  }

  // Highlight raw text when selected language changes
  useEffect(() => {
    const isOriginal = selectedLang === originalLang
    if (isOriginal) return // Keep the beautiful pre-compiled Shiki highlighting

    if (prismInstance) {
      const norm = normalizeLang(selectedLang)
      const grammar = prismInstance.languages[norm]
      if (grammar) {
        try {
          const html = prismInstance.highlight(rawCode, grammar, norm)
          setHighlightedHtml(html)
        } catch (err) {
          console.error("Prism client-side highlighting error:", err)
          setHighlightedHtml(escapeHtml(rawCode))
        }
      } else {
        setHighlightedHtml(escapeHtml(rawCode))
      }
    } else {
      setHighlightedHtml(escapeHtml(rawCode))
    }
  }, [selectedLang, rawCode, prismInstance, originalLang])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Copy failed:", err)
    }
  }

  const isOriginal = selectedLang === originalLang

  return (
    <div className="relative group my-8 rounded-xl overflow-hidden border border-[#e5e5e0] shadow-sm">
      {/* Floating Action Controls (Fade in on hover or when dropdown/button focused) */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
        <div className="relative flex items-center">
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            className="bg-[#282c34]/95 text-gray-300 text-xs px-2.5 py-1.5 pr-8 rounded-lg border border-gray-700/80 outline-none cursor-pointer hover:bg-gray-800 transition-colors focus:ring-1 focus:ring-[#7c9070] font-sans appearance-none select-none"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.value} value={lang.value} className="bg-[#282c34] text-gray-200">
                {lang.label}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 pointer-events-none" />
        </div>

        <button
          onClick={handleCopy}
          className="bg-[#282c34]/95 text-gray-300 hover:bg-gray-800 border border-gray-700/80 p-1.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center"
          title="코드 복사"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Code Area */}
      <pre
        {...props}
        className={`${props.className || ""} !my-0 !rounded-none !border-none`}
      >
        {isOriginal ? (
          children
        ) : (
          <code
            className={`language-${selectedLang}`}
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        )}
      </pre>
    </div>
  )
}
