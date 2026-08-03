export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "sales_associate" | "branch_head";
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
  };
}