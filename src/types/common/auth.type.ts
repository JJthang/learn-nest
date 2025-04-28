import { Role } from 'src/common/enums/role.enum';

export interface UserPayload {
  id: number;
  email: string;
  role: Role;
  firstname?: string;
  lastname?: string;
}
