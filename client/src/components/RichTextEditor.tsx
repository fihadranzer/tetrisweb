import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Link, 
  Eye,
  Edit3
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertText = (before: string, after: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    onChange(newText);
    
    // Reset cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const formatButtons = [
    { icon: Bold, action: () => insertText("**", "**"), label: "Bold" },
    { icon: Italic, action: () => insertText("*", "*"), label: "Italic" },
    { icon: List, action: () => insertText("\n- ", ""), label: "Bullet List" },
    { icon: ListOrdered, action: () => insertText("\n1. ", ""), label: "Numbered List" },
    { icon: Link, action: () => insertText("[", "](url)"), label: "Link" },
  ];

  // Simple markdown to HTML converter for preview
  const markdownToHtml = (markdown: string) => {
    let html = markdown
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mb-3">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4">$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>')
      // Line breaks
      .replace(/\n/g, '<br>');

    // Lists
    html = html.replace(/^- (.+)$/gm, '<li class="ml-4">• $1</li>');
    html = html.replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4">$1. $2</li>');
    
    return html;
  };

  return (
    <Card>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "edit" | "preview")}>
          <div className="border-b px-4 py-2">
            <div className="flex items-center justify-between">
              <div className="flex space-x-1">
                {formatButtons.map((button, index) => (
                  <Button
                    key={index}
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={button.action}
                    title={button.label}
                    className="h-8 w-8 p-0"
                  >
                    <button.icon className="h-4 w-4" />
                  </Button>
                ))}
              </div>
              <TabsList className="grid w-fit grid-cols-2">
                <TabsTrigger value="edit" className="text-xs">
                  <Edit3 className="h-3 w-3 mr-1" />
                  Edit
                </TabsTrigger>
                <TabsTrigger value="preview" className="text-xs">
                  <Eye className="h-3 w-3 mr-1" />
                  Preview
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="edit" className="m-0">
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder || "Enter your content here... You can use markdown formatting."}
              className="min-h-[200px] border-0 focus-visible:ring-0 resize-none rounded-none"
              style={{ fieldSizing: "content" }}
            />
          </TabsContent>

          <TabsContent value="preview" className="m-0">
            <div className="p-4 min-h-[200px] prose prose-sm max-w-none">
              {value ? (
                <div dangerouslySetInnerHTML={{ __html: markdownToHtml(value) }} />
              ) : (
                <p className="text-gray-500 italic">Nothing to preview yet...</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="px-4 py-2 bg-gray-50 border-t text-xs text-gray-600">
          <p>Tip: Use **bold**, *italic*, # headers, - lists, and [links](url) for formatting</p>
        </div>
      </CardContent>
    </Card>
  );
}
