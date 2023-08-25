import ReactQuill from 'react-quill';
import { useState, useEffect } from 'react';
import { useFetch } from '../../utils/useFetch';
import Notes from '../../components/Notes/Notes';
import { useNavigate } from 'react-router-dom';
import ButtonInput from '../../components/Inputs/ButtonInput';

export default function ProfileMobile() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState();
  const [value, setValue] = useState(`👋🏻Hi there, my name is ${userInfo?.handler}`);
  const [disable, setDisable] = useState(true);

  let context = [
    'Touch Grass',
    '15.01/important date/',
    `This sidebar is of full height (100%) and always shown.

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
    <div>
      <div className="m-auto">
        <section className="h-56 shadow-md rounded-b-sm bg-gray-700">
          <div>
            <span className="material-symbols-outlined align-bottom mt-3 ml-3 text-3xl" onClick={() => navigate('/chat')}>
              arrow_back_ios
            </span>
          </div>
          <section className="absolute flex flex-row mt-[90px] mx-3 ">
            <div className="flex items-center justify-center w-40">
              <img
                src="../profilePic.jpeg"
                alt="center image"
                className="object-contain border-solid shadow-md border-4 border-white mx-2.5 rounded-full"
              />
            </div>

            <div className="mt-24 mx-2">
              <h3 className="font-semibold text-2xl">John Diller</h3>
              <h3 className="text-lg">@{userInfo?.handler}</h3>
            </div>
          </section>
        </section>
        <section className="flex flex-col">
          <div className="mt-32 col-span-2 mx-9  mb-10">
            <div className="basis-full w-full flex font-semibold gap-2 mb-8 justify-start">
              <button className="border shadow-md bg-slate-50 py-1 px-2 rounded-lg">Message</button>
              <button className="border shadow-md bg-sky-700 text-white py-1 px-2 rounded-lg">Add friend</button>
              <button className="border shadow-md bg-red-700 text-white py-1 px-2 rounded-lg">Block</button>
            </div>
            <div className="flex flex-row gap-4">
              <div className="w-full">
                {disable ? (
                  <div className="quill">
                    <div className="ql-snow">
                      <div className="w-full px-6 ql-editor" dangerouslySetInnerHTML={{ __html: value }} />
                    </div>
                  </div>
                ) : (
                  <ReactQuill
                    theme="snow"
                    value={value}
                    readOnly={disable}
                    onChange={setValue}
                    modules={{
                      toolbar: [
                        [{ header: [1, 2, 3, 4, 5, 6, 7] }],
                        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
                        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }, { align: [] }],
                        [{ script: 'sub' }, { script: 'super' }],
                        ['link', 'image', 'video'],
                        [{ color: [] }, { background: [] }],
                      ],
                    }}
                  />
                )}
                <div className="text-right">
                  <span
                    onClick={() => setDisable(!disable)}
                    className="material-symbols-outlined rounded p-1.5 mt-2 shadow-md bg-orange-300">
                    edit
                  </span>
                </div>
              </div>
            </div>
          </div>
          <section className="overflow-y-auto col-span-1 ">
            <div className="shadow-md pl-10 pr-10 w-auto">
              <h3 className="font-semibold">Biography</h3>
              <p className="text-lg py-4 w-auto">{userInfo?.biography}</p>
              <hr className="m-4" />
              <h2 className=" text-slate-600 font-semibold uppercase ">Member since: {memberDate}</h2>
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

        <div className="my-8 mx-8">
          <h1 className="font-semibold text-2xl">Notes</h1>
          <ButtonInput buttonLabel={'+Add'} />
          <div>
            {context.map((el) => (
              <Notes key={el} el={el} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
