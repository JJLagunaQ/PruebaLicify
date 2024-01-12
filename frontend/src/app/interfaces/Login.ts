export interface Login {
  name?: string;
  username: string;
  password: string;
}

export interface isLoggedIn {
  isUser: boolean;
  user: Login
}
