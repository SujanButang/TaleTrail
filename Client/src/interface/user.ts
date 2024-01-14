export interface IUser {
  username: string;
  profile_image: string;
}

export interface IUsers {
  id: string;
  username: string;
  profile_image: string;
  bio: string;
}

export interface IFollowings{
  id: string;
  following: {
    id: string;
    username: string;
    profile_image: string;
    bio: string;}
}
