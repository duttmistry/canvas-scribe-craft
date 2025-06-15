
import React, { useState } from 'react';
import { WYSIWYGEditor } from '@/components/WYSIWYGEditor';
import { Button } from '@/components/ui/button';
import { Copy, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [editorContent, setEditorContent] = useState('');
  const { toast } = useToast();

  const sampleVariables = {
    userName: 'John Doe',
    userEmail: 'john.doe@example.com',
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    companyName: 'Acme Corp',
    firstName: 'John',
    lastName: 'Doe',
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText(editorContent);
    toast({
      title: "Copied to clipboard",
      description: "The editor content has been copied to your clipboard.",
    });
  };

  const handleDownloadContent = () => {
    const blob = new Blob([editorContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'editor-content.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download started",
      description: "Your content is being downloaded as an HTML file.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            WYSIWYG Editor
          </h1>
          <p className="text-lg text-gray-600">
            A powerful rich text editor with image cropping, variables, and HTML preview
          </p>
        </div>

        {/* Main Editor */}
        <div className="mb-6">
          <WYSIWYGEditor
            value={editorContent}
            onChange={setEditorContent}
            placeholder="Start creating your content..."
            variables={sampleVariables}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            onClick={handleCopyContent}
            className="flex items-center gap-2"
            variant="outline"
          >
            <Copy size={16} />
            Copy Content
          </Button>
          <Button
            onClick={handleDownloadContent}
            className="flex items-center gap-2"
          >
            <Download size={16} />
            Download HTML
          </Button>
        </div>

        {/* Features Overview */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Rich Text Editing</h3>
              <p className="text-sm text-blue-700">
                Bold, italic, underline, headings, colors, alignment, and more formatting options.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Image Upload & Crop</h3>
              <p className="text-sm text-green-700">
                Upload images with built-in cropping tool for perfect sizing and positioning.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">Dynamic Variables</h3>
              <p className="text-sm text-purple-700">
                Insert placeholder variables like {"{{"} userName {"}"} that can be replaced dynamically.
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <h3 className="font-semibold text-orange-900 mb-2">HTML Preview</h3>
              <p className="text-sm text-orange-700">
                Toggle between editor and raw HTML view with live preview functionality.
              </p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-semibold text-red-900 mb-2">Custom Toolbar</h3>
              <p className="text-sm text-red-700">
                Modular toolbar design that can be easily customized and extended.
              </p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <h3 className="font-semibold text-indigo-900 mb-2">Export Options</h3>
              <p className="text-sm text-indigo-700">
                Copy to clipboard or download content as HTML file for easy sharing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
