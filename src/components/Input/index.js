import Select from "react-select";
import styles from './index.module.scss';
import cn from 'classnames';

const customStyles = {
  control: (base, state) => ({
    ...base,
    border: `2px solid #dfdede`,
    transition: "all 0.2s ease",
    boxShadow:
      "0px 10px 20px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04)",
    "&:focus": {
      outline: "none"
    }
  })
};


export default function Input({
  className,
  type,
  ...props
}) {
  if (type === "dropdown")
    return (
      <Select
        className={className}
        styles={customStyles}
        options={props.options}
        placeholder={props.placeholder || "Pilih ....."}
        theme={theme => ({
          ...theme,
          borderRadius: 10,
          colors: {
            ...theme.colors,
            primary25: "#5ce0b6",
            primary: "#4bc6a0"
          }
        })}
        value={props.value}
        onChange={props.onChange}
      />
    );
  return <input {...props} className={cn(styles.input, className)} />;
}