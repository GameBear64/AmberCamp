import Menu from '../Menu';
export default function Notes({ text }) {
  return (
    <div className="flex rounded shadow-md flex-row justify-between border-l-8 bg-gray-50 border-orange-300 mb-3 p-1">
      <p className="text-lg ml-1">{text}</p>
      <div className="mr-2">
        <Menu
          values={[
            { option: 'Delete', action: () => {} },
            { option: 'Edit', action: () => {} },
          ]}></Menu>
      </div>
    </div>
  );
}
