import ConnectForm from '../ConnectForm';

export default function InputField({ name, rules = {}, styles, width = 'w-1/2', btnText, btnColor = '', ...rest }) {
  return (
    <ConnectForm>
      {({ register, formState: { errors } }) => {
        return (
          <div className={styles}>
            <div className={`flex flex-row ${width}`}>
              <input
                {...rest}
                {...register(name, rules)}
                className={`${errors[name] ? 'input-error' : 'input'} rounded rounded-r-none`}
              />
              <button type="submit" className={`btn min-w-max ${btnColor} rounded-l-none`}>
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
