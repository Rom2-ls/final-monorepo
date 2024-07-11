// src/components/LoginPage.js
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";

const USER_LOGIN = gql`
  mutation UserLogin($username: String!, $password: String!) {
    userLogin(username: $username, password: $password) {
      access_token
      user {
        id
        name
        email
      }
    }
  }
`;

type LoginInputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const [login, { data, loading, error }] = useMutation(USER_LOGIN, {
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    login({
      variables: {
        username: data.email,
        password: data.password,
      },
    });
  };

  if (data) {
    localStorage.setItem("access_token", data.userLogin.access_token);
    localStorage.setItem("user", JSON.stringify(data.userLogin.user));
    navigate("/dashboard");
  }

  return (
    <div>
      <h2>Se connecter</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Adresse email"
          {...register("email", { required: true })}
        />
        {errors.email && <span>This field is required</span>}
        <input type="password" {...register("password", { required: true })} />
        {errors.password && <span>This field is required</span>}
        <button type="submit">Se connecter</button>
        {loading && <p>Connexion...</p>}
        {error && <p>Identifiant incorrect</p>}
      </form>
      <p>
        Vous n'avez pas de compte ? <Link to="/register">S'inscrire ici</Link>
      </p>
    </div>
  );
};

export default LoginPage;
