interface IError {
  message: string;
}

const Error: React.FC<IError> = ({message}) => <p>{`Error! ${message}`}</p>;

export { Error };
