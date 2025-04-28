import { Role } from 'src/common/enums/role.enum';

export interface UserPayload {
  id: number;
  email: string;
  role: Role;
  firstname?: string;
  lastname?: string;
}

export type UserGoogle = {
  id: string;
  displayName: string;
  name: {
    familyName: string;
    givenName: string;
  };
  emails: Array<{
    value: string;
    verified: boolean;
  }>;
  photos: Array<{
    value: string;
  }>;
};
