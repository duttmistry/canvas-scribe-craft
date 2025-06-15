import React from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  List,
  ListOrdered
} from 'lucide-react';

interface CustomToolbarProps {
  quillRef?: React.RefObject<any>;
}

export const CustomToolbar: React.FC<CustomToolbarProps> = ({ quillRef }) => {
  const handleFormat = (format: string, value?: any) => {
    if (quillRef?.current) {
      const quill = quillRef.current.getEditor();
      quill.format(format, value);
      quill.focus();
    }
  };

  return (
    <div className="border-b bg-gray-50 p-3">
      <div className="flex flex-wrap items-center gap-2">
        {/* Font Style */}
        <select 
          className="border rounded px-2 py-1 text-sm bg-white"
          onChange={(e) => handleFormat('font', e.target.value || false)}
        >
          <option value="">Font</option>
          <option value="serif">Serif</option>
          <option value="monospace">Monospace</option>
        </select>

        {/* Font Size */}
        <select 
          className="border rounded px-2 py-1 text-sm bg-white"
          onChange={(e) => handleFormat('size', e.target.value || false)}
        >
          <option value="">Normal</option>
          <option value="small">Small</option>
          <option value="large">Large</option>
          <option value="huge">Huge</option>
        </select>

        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        {/* Text Formatting */}
        <button 
          className="p-1 hover:bg-gray-200 rounded" 
          title="Bold"
          onClick={() => handleFormat('bold')}
        >
          <Bold size={16} />
        </button>
        <button 
          className="p-1 hover:bg-gray-200 rounded" 
          title="Italic"
          onClick={() => handleFormat('italic')}
        >
          <Italic size={16} />
        </button>
        <button 
          className="p-1 hover:bg-gray-200 rounded" 
          title="Underline"
          onClick={() => handleFormat('underline')}
        >
          <Underline size={16} />
        </button>
        <button 
          className="p-1 hover:bg-gray-200 rounded text-sm font-bold" 
          title="Strike"
          onClick={() => handleFormat('strike')}
        >
          S
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        {/* Headings */}
        <select 
          className="border rounded px-2 py-1 text-sm bg-white"
          onChange={(e) => handleFormat('header', e.target.value || false)}
        >
          <option value="">Normal</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
        </select>

        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        {/* Colors */}
        <input
          type="color"
          className="w-8 h-8 border rounded cursor-pointer"
          title="Text Color"
          onChange={(e) => handleFormat('color', e.target.value)}
        />

        <input
          type="color"
          className="w-8 h-8 border rounded cursor-pointer"
          title="Background Color"
          onChange={(e) => handleFormat('background', e.target.value)}
        />

        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        {/* Alignment */}
        <button 
          className="p-1 hover:bg-gray-200 rounded" 
          title="Align Left"
          onClick={() => handleFormat('align', false)}
        >
          <AlignLeft size={16} />
        </button>
        <button 
          className="p-1 hover:bg-gray-200 rounded" 
          title="Align Center"
          onClick={() => handleFormat('align', 'center')}
        >
          <AlignCenter size={16} />
        </button>
        <button 
          className="p-1 hover:bg-gray-200 rounded" 
          title="Align Right"
          onClick={() => handleFormat('align', 'right')}
        >
          <AlignRight size={16} />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        {/* Lists */}
        <button 
          className="p-1 hover:bg-gray-200 rounded" 
          title="Bullet List"
          onClick={() => handleFormat('list', 'bullet')}
        >
          <List size={16} />
        </button>
        <button 
          className="p-1 hover:bg-gray-200 rounded" 
          title="Numbered List"
          onClick={() => handleFormat('list', 'ordered')}
        >
          <ListOrdered size={16} />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        {/* Other */}
        <button 
          className="p-1 hover:bg-gray-200 rounded text-sm" 
          title="Quote"
          onClick={() => handleFormat('blockquote')}
        >
          "
        </button>
        <button 
          className="p-1 hover:bg-gray-200 rounded text-xs" 
          title="Code Block"
          onClick={() => handleFormat('code-block')}
        >
          {'</>'}
        </button>
        <button 
          className="p-1 hover:bg-gray-200 rounded text-sm" 
          title="Link"
          onClick={() => {
            const url = prompt('Enter URL:');
            if (url) handleFormat('link', url);
          }}
        >
          🔗
        </button>
      </div>
    </div>
  );
};
