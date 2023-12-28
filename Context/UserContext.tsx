import { createContext } from "react";
export interface User {
  id: string;
  name: string;
  email: string;
  rule: string;
}
export const UserContext = createContext<User>();
