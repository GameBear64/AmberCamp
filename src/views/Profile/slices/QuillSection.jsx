import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';

import { getCurrentUserId, htmlDecode } from '@utils/utils';

import Icon from '../../../components/Icon';

import { updateDescription } from './endpoints';

export default function QuillSection({ userId, value }) {
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
        <Icon
          icon={disable ? 'edit' : 'save'}
          styles="rounded absolute -top-3 right-2 text-right bg-slate-200 text-black p-1.5 shadow-primary"
          onClick={() => {
            if (!disable) {
              updateDescription(text);
            }
            setDisable(!disable);
          }}
        />
      )}
    </div>
  );
}
