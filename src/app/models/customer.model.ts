import { User } from "./user.model";
export interface Customer{
  id: number;
  name: string;
  lastName: string;
  phoneNumber: string;
  createdAt: string;
  userId: number;
  user: User;
}
