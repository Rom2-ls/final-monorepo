import { gql, useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./NewGroup.css";

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
    }
  }
`;

const CREATE_GROUP = gql`
  mutation CreateGroup($createGroupInput: CreateGroupInput!) {
    createGroup(createGroupInput: $createGroupInput) {
      id
      name
    }
  }
`;

type User = {
  id: string;
  name: string;
};

type GroupInputs = {
  name: string;
  users: User[];
};

const NewGroup = () => {
  const [currentUser] = useState(
    JSON.parse(localStorage.getItem("user") || "{}")
  );
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm<GroupInputs>({
    defaultValues: {
      name: "",
      users: [currentUser],
    },
  });

  const { data, loading, error: usersError } = useQuery(GET_USERS);
  const [createGroup, { client }] = useMutation(CREATE_GROUP);

  const onSubmit: SubmitHandler<GroupInputs> = async (formData) => {
    try {
      if (formData.users.length < 2) {
        setError("users", {
          type: "minLength",
          message: "Veuillez ajouter au moins un utilisateur",
        });
        return;
      }

      if (!formData.name && formData.users.length > 2) {
        setError("name", {
          type: "required",
          message: "Veuillez saisir un nom pour le groupe",
        });
        return;
      }

      if (!formData.name && formData.users.length === 2) {
        formData.name = formData.users[1].name;
      }

      const { data } = await createGroup({
        variables: {
          createGroupInput: {
            name: formData.name,
            users: formData.users.map((user) => user.id),
          },
        },
      });

      if (data.createGroup) {
        await client.refetchQueries({
          include: ["Get_Groups_By_User"],
        });

        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  const handleUserClick = (user: User) => {
    const users = watch("users");
    if (!users.some((u) => u.id === user.id)) {
      setValue("users", [...users, user]);
    }
  };

  const handleUserDelete = (userId: string) => {
    const users = watch("users");
    setValue(
      "users",
      users.filter((user) => user.id !== userId)
    );
  };

  return (
    <div className="new-group-container">
      <div className="new-group-header">
        <button onClick={() => navigate("/dashboard", { replace: true })}>
          retour
        </button>
        <p>Nouvelle conversation</p>
      </div>
      <form className="new-group-form" onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} placeholder="Nom du groupe" />
        {loading && <p>Loading...</p>}
        {usersError && <p>Error: {usersError.message}</p>}
        <div className="new-group-users-list">
          {errors.name && (
            <div className="new-group-error-message-wrapper">
              <p className="new-group-error-message">{errors.name.message}</p>
            </div>
          )}
          {errors.users && (
            <div className="new-group-error-message-wrapper">
              <p className="new-group-error-message">{errors.users.message}</p>
            </div>
          )}
          {data &&
            data.users
              .filter((user: User) => user.id !== currentUser.id)
              .map((user: User) => (
                <div
                  className="new-group-user-item"
                  key={user.id}
                  onClick={() => handleUserClick(user)}
                >
                  <p>{user.name}</p>
                  <p>{user.id}</p>
                </div>
              ))}
        </div>
        <div className="new-group-selected-users">
          {watch("users").map((user) => (
            <div key={user.id}>
              <p>{user.name}</p>
              {user.id === currentUser.id && <p>(vous)</p>}
              {user.id !== currentUser.id && (
                <button type="button" onClick={() => handleUserDelete(user.id)}>
                  supprimer
                </button>
              )}
            </div>
          ))}
        </div>
        <button type="submit">Valider</button>
      </form>
    </div>
  );
};

export default NewGroup;
