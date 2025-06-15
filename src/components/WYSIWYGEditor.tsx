
import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CustomToolbar } from './CustomToolbar';
import { ImageUploader } from './ImageUploader';
import { VariableInserter } from './VariableInserter';
import { Eye, Code, Image, Type } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WYSIWYGEditorProps {
  value?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  variables?: { [key: string]: string };
}

export const WYSIWYGEditor: React.FC<WYSIWYGEditorProps> = ({
  value = '',
  onChange,
  placeholder = 'Start writing...',
  variables = {}
}) => {
  const [editorContent, setEditorContent] = useState(value);
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [showVariables, setShowVariables] = useState(false);
  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    setEditorContent(value);
  }, [value]);

  const handleContentChange = (content: string) => {
    setEditorContent(content);
    onChange?.(content);
  };

  const handleImageInsert = (imageUrl: string) => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      const range = quill.getSelection();
      const index = range ? range.index : quill.getLength();
      quill.insertEmbed(index, 'image', imageUrl);
      quill.setSelection(index + 1);
    }
    setShowImageUploader(false);
  };

  const handleVariableInsert = (variable: string) => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      const range = quill.getSelection();
      const index = range ? range.index : quill.getLength();
      quill.insertText(index, `{{${variable}}}`);
      quill.setSelection(index + variable.length + 4);
    }
    setShowVariables(false);
  };

  const renderPreview = () => {
    let previewContent = editorContent;
    
    // Replace variables with their values
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      previewContent = previewContent.replace(regex, value);
    });

    return (
      <div 
        className="prose max-w-none p-4 min-h-[300px] border rounded-lg bg-white"
        dangerouslySetInnerHTML={{ __html: previewContent }}
      />
    );
  };

  // Simplified modules configuration to fix text input issues
  const modules = {
    toolbar: false, // We'll use our custom toolbar
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
    'align', 'color', 'background',
    'script', 'code-block'
  ];

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-800">WYSIWYG Editor</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowVariables(!showVariables)}
            className="flex items-center gap-2"
          >
            <Type size={16} />
            Variables
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowImageUploader(!showImageUploader)}
            className="flex items-center gap-2"
          >
            <Image size={16} />
            Image
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsHtmlMode(!isHtmlMode)}
            className="flex items-center gap-2"
          >
            {isHtmlMode ? <Eye size={16} /> : <Code size={16} />}
            {isHtmlMode ? 'Preview' : 'HTML'}
          </Button>
        </div>
      </div>

      {/* Variable Inserter */}
      {showVariables && (
        <VariableInserter
          variables={Object.keys(variables)}
          onInsert={handleVariableInsert}
          onClose={() => setShowVariables(false)}
        />
      )}

      {/* Image Uploader */}
      {showImageUploader && (
        <ImageUploader
          onImageInsert={handleImageInsert}
          onClose={() => setShowImageUploader(false)}
        />
      )}

      {/* Editor Content */}
      <div className="p-4">
        {isHtmlMode ? (
          <div className="space-y-4">
            <textarea
              value={editorContent}
              onChange={(e) => handleContentChange(e.target.value)}
              className="w-full h-64 p-3 border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter HTML content..."
            />
            <div className="border-t pt-4">
              <h3 className="text-lg font-medium mb-2">Preview:</h3>
              {renderPreview()}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="border rounded-lg">
              <CustomToolbar quillRef={quillRef} />
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={editorContent}
                onChange={handleContentChange}
                modules={modules}
                formats={formats}
                placeholder={placeholder}
                className="border-0"
                style={{ minHeight: '300px' }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
