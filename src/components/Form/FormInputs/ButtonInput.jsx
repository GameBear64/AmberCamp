import ConnectForm from '../ConnectForm';
export default function ButtonField({
  name,
  rules = {},
  styles,
  width = 'w-60',
  btnText,
  btnBG = 'bg-base-s',
  btnColor,
  ...rest
}) {
  return (
    <ConnectForm>
      {({ register, formState: { errors } }) => {
        return (
          <div className={styles}>
            <div className={`mb-6 mt-2 flex flex-row text-center ${width}`}>
              <input
                {...rest}
                {...register(name, rules)}
                className={`h-10 w-full rounded-l bg-base-m pl-1 focus:outline-none ${errors[name] && 'border-2 border-red-600'}`}
              />
              <button
                type="submit"
                className={`font-semibold ${btnColor} rounded-r shadow-inner ${btnBG} text-md p-1 hover:shadow-inner`}>
                {btnText}
              </button>
            </div>
            {errors[name] && <p className="font-semibold text-red-600">{errors[name].message}</p>}
          </div>
        );
      }}
    </ConnectForm>
  );
}
