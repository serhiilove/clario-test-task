import { FormFieldProps } from "../types";

const FormField: React.FC<FormFieldProps> = ({
  className,
  type,
  placeholder,
  name,
  register,
  error,
  errorMessage,
  onChange,
}) => (
  <>
    <input
      className={`${className} 
        w-[315px] h-[48px] p-[10px] rounded-xl outline-none border 
        ${error ? 'border-red-500' : 'border-green-500'}`
      }
      type={type}
      placeholder={placeholder}
      {...register(name)}
      onChange={onChange}
    />
    {error && errorMessage && <span className="text-xs self-start py-[4px] px-[6px] text-red-500">{error.message}</span>}
  </>
);

export default FormField;