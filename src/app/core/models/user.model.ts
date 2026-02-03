export type User = {
  username: string;
  role: 'Admin' | 'Viewer';
  loginTime: number;
};
