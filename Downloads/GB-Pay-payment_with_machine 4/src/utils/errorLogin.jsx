const errors = {
    default: "O login falhou. Verifique se os dados fornecidos estão corretos.",
  };
 export const SignInError = ({ error }) => {
    const errorMessage = error && (errors[error] ?? errors.default);
    return <div> <span className="text-xs text-red-600">{errorMessage}</span></div>;
  };