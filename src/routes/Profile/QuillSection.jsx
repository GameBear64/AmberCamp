import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';

import { getCurrentUserId, htmlDecode } from '@utils/utils';

export default function QuillSection({ userId, value, setValue }) {
  const [text, setText] = useState('');
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    setText(htmlDecode(value)?.replace(/<\/? ?script ?\/?>/g, ''));
  }, [value]);

  return (
    <div className="relative mt-5">
      <div className="w-full">
        {disable ? (
          <div className="quill">
            <div className="ql-snow">
              <div className="ql-editor w-full px-6" dangerouslySetInnerHTML={{ __html: text }} />
            </div>
          </div>
        ) : (
          <div className="h-auto">
            <ReactQuill
              theme="snow"
              value={text}
              readOnly={disable}
              onChange={setText}
              className="h-full"
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, 4, 5, 6, 7] }],
                  ['bold', 'italic', 'underline', 'strike', 'blockquote', { 'code-block': true }],
                  [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }, { align: [] }],
                  [{ script: 'sub' }, { script: 'super' }],
                  [{ color: [] }, { background: [] }],
                ],
              }}
            />
          </div>
        )}
      </div>
      {userId === getCurrentUserId() && (
        <div className="absolute -top-3 right-2 text-right">
          <span
            onClick={() => {
              if (!disable) {
                setValue(text);
              }
              setDisable(!disable);
            }}
            className="material-symbols-outlined cursor-pointer rounded bg-orange-300 p-1.5 shadow-md">
            {disable ? 'edit' : 'save'}
          </span>
        </div>
      )}
    </div>
  );
}
