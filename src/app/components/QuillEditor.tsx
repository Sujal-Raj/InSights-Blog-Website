// components/QuillEditor.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import type Quill from 'quill';

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange, placeholder = 'Start writing...' }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initQuill = async () => {
      const Quill = (await import('quill')).default;
      
      if (!editorRef.current || quillRef.current) return;

      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder,
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline'],
            ['link', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ header: [1, 2, 3, false] }],
            ['clean']
          ],
        },
      });

      // Set initial content
      quillRef.current.root.innerHTML = value;

      // Handle content changes
      quillRef.current.on('text-change', () => {
        if (quillRef.current) {
          const content = quillRef.current.root.innerHTML;
          onChange(content);
        }
      });
    };

    initQuill();

    // Cleanup
    return () => {
      if (quillRef.current) {
        quillRef.current.off('text-change');
      }
    };
  }, []);

  return (
    <div className="quill-editor">
      <div ref={editorRef} />
      <style jsx global>{`
        .quill-editor {
          margin-bottom: 1rem;
          color:black;
          background-color: white;
        }
        .ql-container {
          min-height: 300px;
          color:black;
          background-color: white;
        }
      `}</style>
    </div>
  );
};

export default QuillEditor;