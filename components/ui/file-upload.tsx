"use client"

import { useState, useCallback } from "react"
import { Upload, X, FileText, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

interface FileUploadProps {
  accept?: string
  multiple?: boolean
  maxSize?: number
  onFilesChange?: (files: File[]) => void
  className?: string
}

export function FileUpload({
  accept = "*",
  multiple = false,
  maxSize = 10 * 1024 * 1024,
  onFilesChange,
  className,
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const handleFiles = useCallback(
    (newFiles: FileList | null) => {
      if (!newFiles) return

      const validFiles = Array.from(newFiles).filter((file) => file.size <= maxSize)
      const updatedFiles = multiple ? [...files, ...validFiles] : validFiles.slice(0, 1)

      setFiles(updatedFiles)
      onFilesChange?.(updatedFiles)
    },
    [files, maxSize, multiple, onFilesChange],
  )

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index)
    setFiles(updatedFiles)
    onFilesChange?.(updatedFiles)
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
        )}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
          handleFiles(e.dataTransfer.files)
        }}
      >
        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm text-muted-foreground mb-2">Drag and drop files here, or click to browse</p>
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
          id="file-upload"
        />
        <Button variant="outline" size="sm" asChild>
          <label htmlFor="file-upload" className="cursor-pointer">
            Browse Files
          </label>
        </Button>
        <p className="text-xs text-muted-foreground mt-2">Max file size: {(maxSize / 1024 / 1024).toFixed(0)}MB</p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2">
                {file.type.startsWith("image/") ? (
                  <ImageIcon className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <FileText className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                <span className="text-xs text-muted-foreground">({(file.size / 1024).toFixed(1)}KB)</span>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeFile(index)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
