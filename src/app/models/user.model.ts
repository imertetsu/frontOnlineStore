import { Customer } from "./customer.model";

export interface User{
  id: number;
  email: string;
  recoveryToken?: string;
  role: string;
  createdAt: string;
  customer?: Customer;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CreateUserDTO extends
  Omit<User, 'id' | 'recoveryToken' | 'createdAt'>{
}
//esto hace que los campos sean opcionales
// eslint-disable-next-line @typescript-eslint/no-empty-interface

