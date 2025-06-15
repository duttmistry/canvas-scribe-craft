
import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Plus } from 'lucide-react';

interface VariableInserterProps {
  variables: string[];
  onInsert: (variable: string) => void;
  onClose: () => void;
}

export const VariableInserter: React.FC<VariableInserterProps> = ({
  variables,
  onInsert,
  onClose,
}) => {
  const commonVariables = [
    'userName',
    'userEmail',
    'date',
    'time',
    'companyName',
    'firstName',
    'lastName',
    'phone',
    'address',
    'city',
  ];

  const allVariables = [...new Set([...variables, ...commonVariables])];

  return (
    <div className="border-b bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium text-gray-700">Insert Variables</h4>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X size={16} />
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {allVariables.map((variable) => (
          <Button
            key={variable}
            variant="outline"
            size="sm"
            onClick={() => onInsert(variable)}
            className="flex items-center gap-1 text-sm"
          >
            <Plus size={12} />
            {`{{${variable}}}`}
          </Button>
        ))}
      </div>
      
      <div className="mt-3 text-xs text-gray-500">
        Click on any variable to insert it at the cursor position.
      </div>
    </div>
  );
};
