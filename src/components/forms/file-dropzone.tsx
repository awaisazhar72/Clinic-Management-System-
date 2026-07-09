"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { File as FileIcon, UploadCloud, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileDropzoneProps {
  onFilesChange: (files: File[]) => void;
  accept?: Record<string, string[]>;
  maxFiles?: number;
  className?: string;
}

export function FileDropzone({
  onFilesChange,
  accept,
  maxFiles = 5,
  className,
}: FileDropzoneProps) {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (accepted: File[]) => {
      const next = [...files, ...accepted].slice(0, maxFiles);
      setFiles(next);
      onFilesChange(next);
    },
    [files, maxFiles, onFilesChange]
  );

  const removeFile = (index: number) => {
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    onFilesChange(next);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles,
  });

  return (
    <div className={cn("space-y-3", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border px-6 py-8 text-center transition-colors cursor-pointer",
          isDragActive && "border-primary bg-accent/50"
        )}
      >
        <input {...getInputProps()} />
        <UploadCloud className="size-6 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-primary">Click to upload</span> or drag and drop
        </p>
      </div>

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((file, i) => (
            <li
              key={i}
              className="flex items-center justify-between gap-2 rounded-md border border-border px-3 py-2 text-sm"
            >
              <span className="flex items-center gap-2 truncate">
                <FileIcon className="size-4 shrink-0 text-muted-foreground" />
                <span className="truncate">{file.name}</span>
              </span>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="text-muted-foreground hover:text-destructive shrink-0"
              >
                <X className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
