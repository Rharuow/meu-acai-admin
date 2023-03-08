export enum RolesEnum {
  ADMIN = "admin",
  USER = "user",
}

export type Role = {
  id: string;
  name: RolesEnum.ADMIN | RolesEnum.USER;
};

export type User = {
  id: string;
  name: string;
  birthday?: string;
  phone: string;
  hashCode: string;
  isActive: boolean;
  isBloqued: boolean;
  address: {
    house: number;
    square: number;
  };
  roles: Array<Role>;
  password: string;
  wallet: number;
  members?: Array<{ name: string; birthday?: string }>;
  created_at: Date;
};
