const { DateTime } = require("luxon");

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

export const mockedUser: User = {
  id: "1",
  roles: [{ id: "1", name: RolesEnum.ADMIN }],
  name: "Harysson Soares",
  phone: "+55084981758502",
  address: {
    house: 39,
    square: 5,
  },
  members: [{ name: "Fernanda Oliveira", birthday: "1992-08-27" }],
  birthday: "1991-05-17",
  password: "123123123",
  wallet: 0.0,
  created_at: DateTime.fromSQL(),
};
