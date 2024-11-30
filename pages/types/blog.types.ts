export interface IBaseField {
  $id: string;
  $createdAt: string;
}

export interface IUser extends IBaseField {
  name: string;
  email: string;
  avatar_url: string;
}

export interface IBlog extends IBaseField {
  title: string;
  description: string;
  image: string;
  status: boolean;
  user: IUser;
}
