export interface IGetUserResponse {
  name: string;
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  twitter_username: string;
  location: string;
  message: string;
  bio: string;
}

export interface IRepository {
  id: number;
  name: string;
  html_url: string;
  language: string;
  description: string;
}
