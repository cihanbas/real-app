export interface LoginSuccessResponse {
  token: string;
  user: User;
}
export interface User {
  email: string;
  type: "teacher" | "student";
  gender: "other" | "male" | "female";
  createdAt: Date;
  updatedAt: Date;
  _id: string;
  avatar?: string;
}
