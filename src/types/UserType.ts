type RolesAux = {
  id: number;
  authority: string;
};

export type UserType = {
  id: number;
  name: string;
  email: string;
  roles: RolesAux[];
};
