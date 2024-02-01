import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useMemo,
  ReactNode,
} from "react";

interface Props {
  children?: ReactNode;
}

interface UserProps {
  profilePicUrl: String;
  userName: String;
  email: String;
  phoneNumber: String;
}

interface AuthContextProps {
  user: UserProps;
}

const defaultAuthContext: AuthContextProps = {
  user: {
    profilePicUrl: "",
    userName: "",
    email: "",
    phoneNumber: "",
  },
};
const AuthContext = createContext<AuthContextProps>(defaultAuthContext);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState({
    profilePicUrl: "https://avatars.githubusercontent.com/u/43625453?v=4",
    userName: "name",
    email: "email@gmail.com",
    phoneNumber: "number",
  }); // TODO: dynamically get this info

  const memoedValue = useMemo(
    () => ({
      user,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
