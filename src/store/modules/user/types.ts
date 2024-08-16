export interface UserState {
  id: string;
  is_super: number;
  name: string;
  role_id: string;
  role_name: string;
  role: string;
  auth_user_code?: string[];
}
