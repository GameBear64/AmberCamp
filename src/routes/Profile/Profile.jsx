import { useState } from 'react';
import ReactQuill from 'react-quill';

import Notes from '../../components/Notes/Notes';
import Layout from '../../components/Layout/Layout';
import ButtonInput from '../../components/Inputs/ButtonInput';

import { useFetch } from '../../utils/useFetch';
import 'react-quill/dist/quill.snow.css';
import { useEffect } from 'react';

export default function Profile() {
  const [userInfo, setUserInfo] = useState();
  const [value, setValue] = useState(`👋🏻Hi there, my name is ${userInfo?.handler}`);
  const [disable, setDisable] = useState(true);

  let context = [
    'Touch Grass',
    '15.01/important date/',
    `This simport { useNavigate } from 'react-router-dom';
  idebar is of full height (100%) and always shown.
  
    Scroll down the page to see the result.
  
    Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset concludaturque et eum, alt
  `,
    'Touch Grass',
    '15.01/important date/',
    `This simport { useNavigate } from 'react-router-dom';
  idebar is of full height (100%) and always shown
  Scroll down the page to see the result.
  
  Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset concludaturque et eum, alt
  `,
  ];

  let tags = ['programming', 'coffee', 'sleep', 'fancy stuff', 'wotkout'];

  const getUser = () => {
    useFetch({
      url: 'user',
      method: 'GET',
    }).then((res) => {
      if (res.status === 200) {
        setUserInfo({
          handler: res.message.handle,
          biography: res.message.biography,
          created: res.message.createdAt,
          _id: res.message._id,
        });
      } else {
        // For the devs to debug
        console.log(res.message);
      }
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  let memberDate = userInfo?.created;
  memberDate = memberDate?.split('T')[0];

  return (
    <Layout
      left={
        <div className="my-10">
          <div className="mx-8">
            <h1 className="font-semibold text-2xl">Notes</h1>
            <ButtonInput buttonLabel={'+Add'} color="bg-gray-100" />
            <>
              {context.map((el) => (
                <Notes key={Math.round(Math.random() * 10000000)} el={el} />
              ))}
            </>
          </div>
        </div>
      }
      right={
        <>
          <section className="h-60 shadow-md rounded-b bg-gray-700">
            <section
              className="relative flex flex-row pt-36
            mx-4 ">
              <img
                src="../profilePic.jpeg"
                alt="center image"
                className="h-48 border-solid shadow-md border-4 border-white  mx-2.5 rounded-full"
              />
              <div className="mt-24">
                <h3 className="font-semibold text-2xl">John Diller</h3>
                <h3 className="text-lg">@{userInfo?.handler}</h3>
              </div>
            </section>
          </section>
          <section className="grid grid-cols-3 grid-rows-1 gap-0 ml-8">
            <div className="mt-32 col-span-2">
              <div className="flex flex-row gap-4">
                <div className="w-full">
                  {disable ? (
                    <div className="quill">
                      <div className="ql-snow">
                        <div className="w-full px-6 ql-editor" dangerouslySetInnerHTML={{ __html: value }} />
                      </div>
                    </div>
                  ) : (
                    <div className="h-auto">
                      <ReactQuill
                        theme="snow"
                        value={value}
                        readOnly={disable}
                        onChange={setValue}
                        className="h-full"
                        modules={{
                          toolbar: [
                            [{ header: [1, 2, 3, 4, 5, 6, 7] }],
                            ['bold', 'italic', 'underline', 'strike', 'blockquote', { 'code-block': true }],
                            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }, { align: [] }],
                            [{ script: 'sub' }, { script: 'super' }],
                            ['link', 'image', 'video'],
                            // no align image option
                            [{ color: [] }, { background: [] }],
                          ],
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <span
                    onClick={() => setDisable(!disable)}
                    className="material-symbols-outlined cursor-pointer rounded p-1.5 mt-2 shadow-md bg-orange-300">
                    edit
                  </span>
                </div>
              </div>
            </div>
            <section className="overflow-y-auto overflow-x-hidden col-span-1">
              <div className="shadow-md p-10">
                <div className="mb-4 flex flex-wrap font-semibold gap-2 float-left ">
                  <button className="border shadow-md bg-slate-50 py-1 px-2 rounded-lg">Message</button>
                  <button className="border shadow-md bg-sky-700 text-white py-1 px-2 rounded-lg">Add friend</button>
                  <button className="border shadow-md bg-red-700 text-white py-1 px-2 rounded-lg">Block</button>
                </div>

                <h3 className="font-semibold">Biography</h3>
                <p className="text-lg py-4 w-fit">{userInfo?.biography}</p>
                <hr className="m-4" />
                <h2 className="text-slate-600 font-semibold uppercase ">Member since: {memberDate}</h2>
                <p className="uppercase text-slate-600 font-semibold text-xs mb-3">
                  time zone: {new Date().getHours()}:{new Date().getMinutes()}
                </p>
                <hr className="m-4" />
                <h3 className="font-semibold">Interests</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.map((tag, i) => (
                    <div key={i} className="border shadow-md border-slate-300 rounded-xl m-1 ">
                      <p className="p-2.5 font-semibold text-center">{tag}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </section>
        </>
      }
    />
  );
}
