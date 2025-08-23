import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

interface SimpleFileUploadProps {
  onFileSelect: (file: File) => void;
  currentUrl?: string;
  onRemove?: () => void;
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
}

export function SimpleFileUpload({
  onFileSelect,
  currentUrl,
  onRemove,
  accept = "image/*",
  maxSize = 10,
  className = ""
}: SimpleFileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File size must be less than ${maxSize}MB`);
        return;
      }
      onFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File size must be less than ${maxSize}MB`);
        return;
      }
      onFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {currentUrl ? (
        <div className="relative inline-block">
          <img 
            src={currentUrl} 
            alt="Uploaded" 
            className="w-32 h-20 object-cover rounded border"
          />
          {onRemove && (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
              onClick={onRemove}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragging 
              ? 'border-primary bg-primary/5' 
              : 'border-gray-300 hover:border-primary'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-400">
            PNG, JPG up to {maxSize}MB
          </p>
        </div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}