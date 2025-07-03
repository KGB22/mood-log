import "./Button.css";
type ButtonProps = { text: string; type?: string; onClick?: () => void };

const Button = ({ text, type, onClick }: ButtonProps) => {
  return (
    <button className={`Button Button_${type}`} onClick={onClick}>
      {text}
    </button>
  );
};
export default Button;
