// src/components/RegisterPage.js
import { gql, useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type RegisterInputs = {
  name: string;
  email: string;
  password: string;
};

const REGISTER_USER = gql`
  mutation RegisterUser($registerUserInput: RegisterInputs) {
    register(registerUserInput: $registerUserInput) {
      id
      name
      email
    }
  }
`;

const RegisterPage = () => {
  const { register, handleSubmit, reset } = useForm<RegisterInputs>();

  const [registerUser] = useMutation(REGISTER_USER);

  const onSubmit: SubmitHandler<RegisterInputs> = (data) => {
    // reset();

    console.log(data);

    registerUser({
      variables: {
        registerUserInput: {
          name: data.name,
          email: data.email,
          password: data.password,
        },
      },
    });
  };

  return (
    <div>
      <h2>S'inscrire</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          {...register("name", { required: true })}
        />
        <input
          type="email"
          placeholder="Adresse email"
          {...register("email", { required: true })}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          {...register("password", { required: true })}
        />
        <button type="submit">S'inscrire</button>
      </form>
      <p>
        Déjà un compte ? <Link to="/login">Se connecter ici</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
