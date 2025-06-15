import React from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight 
} from 'lucide-react';

export const CustomToolbar: React.FC = () => {
  return (
    <div id="toolbar" className="border-b bg-gray-50 p-3">
      <div className="flex flex-wrap items-center gap-2">
        {/* Font Style */}
        <select className="ql-font border rounded px-2 py-1 text-sm">
          <option value="">Font</option>
          <option value="serif">Serif</option>
          <option value="monospace">Monospace</option>
        </select>

        {/* Font Size */}
        <select className="ql-size border rounded px-2 py-1 text-sm">
          <option value="small">Small</option>
          <option value="">Normal</option>
          <option value="large">Large</option>
          <option value="huge">Huge</option>
        </select>

        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        {/* Text Formatting */}
        <button className="ql-bold p-1 hover:bg-gray-200 rounded" title="Bold">
          <Bold size={16} />
        </button>
        <button className="ql-italic p-1 hover:bg-gray-200 rounded" title="Italic">
          <Italic size={16} />
        </button>
        <button className="ql-underline p-1 hover:bg-gray-200 rounded" title="Underline">
          <Underline size={16} />
        </button>
        <button className="ql-strike p-1 hover:bg-gray-200 rounded" title="Strike">
          S
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        {/* Headings */}
        <select className="ql-header border rounded px-2 py-1 text-sm">
          <option value="">Normal</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
        </select>

        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        {/* Colors */}
        <select className="ql-color border rounded px-2 py-1 text-sm">
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="#000000">Black</option>
        </select>

        <select className="ql-background border rounded px-2 py-1 text-sm">
          <option value="yellow">Yellow</option>
          <option value="lightgray">Light Gray</option>
          <option value="lightblue">Light Blue</option>
        </select>

        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        {/* Alignment */}
        <button className="ql-align p-1 hover:bg-gray-200 rounded" value="" title="Align Left">
          <AlignLeft size={16} />
        </button>
        <button className="ql-align p-1 hover:bg-gray-200 rounded" value="center" title="Align Center">
          <AlignCenter size={16} />
        </button>
        <button className="ql-align p-1 hover:bg-gray-200 rounded" value="right" title="Align Right">
          <AlignRight size={16} />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        {/* Lists */}
        <button className="ql-list p-1 hover:bg-gray-200 rounded" value="ordered" title="Numbered List">
          1.
        </button>
        <button className="ql-list p-1 hover:bg-gray-200 rounded" value="bullet" title="Bullet List">
          •
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        {/* Script */}
        <button className="ql-script p-1 hover:bg-gray-200 rounded" value="sub" title="Subscript">
          X₂
        </button>
        <button className="ql-script p-1 hover:bg-gray-200 rounded" value="super" title="Superscript">
          X²
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        {/* Other */}
        <button className="ql-blockquote p-1 hover:bg-gray-200 rounded" title="Quote">
          "
        </button>
        <button className="ql-code-block p-1 hover:bg-gray-200 rounded" title="Code Block">
          {'</>'}
        </button>
        <button className="ql-link p-1 hover:bg-gray-200 rounded" title="Link">
          🔗
        </button>
      </div>
    </div>
  );
};
