import ConnectForm from '../ConnectForm';
import ButtonInput from '../Inputs/ButtonInput';

// export default function InputField({ name, rules = {}, styles, ...rest }) {
//   return (
//     <ConnectForm>
//       {({ register, formState: { errors } }) => {
//         const { ref, ...registerRest } = register(name, rules);
//         return (
//           <div className={styles}>
//             <ButtonInput innerRef={ref} invalid={errors[name]} {...registerRest} {...rest} />
//             {errors[name] && <p className="text-red-600 font-semibold">{errors[name].message}</p>}
//           </div>
//         );
//       }}
//     </ConnectForm>
//   );
// }

export default function InputField({
  name,
  rules = {},
  styles,
  width = 'w-60',
  btnText,
  btnBG = 'bg-gray-100',
  btnColor,
  ...rest
}) {
  return (
    <ConnectForm>
      {({ register, formState: { errors } }) => {
        return (
          <div className={styles}>
            <div className="flex flex-row text-center mb-6 mt-2">
              <input
                {...rest}
                {...register(name, rules)}
                className={`shadow-slate-200 rounded-l pl-1 shadow-inner border h-10 ${width} ${
                  errors[name] ? 'border-2 border-red-600' : 'border-slate-200'
                }`}
              />
              <button
                type="submit"
                className={`font-semibold ${btnColor} rounded-r shadow-inner ${btnBG} p-1 text-md hover:shadow-inner`}>
                {btnText}
              </button>
            </div>
            {errors[name] && <p className="text-red-600 font-semibold">{errors[name].message}</p>}
          </div>
        );
      }}
    </ConnectForm>
  );
}
