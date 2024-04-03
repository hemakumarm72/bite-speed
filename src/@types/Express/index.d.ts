declare namespace Express {
  interface Request {
    member: {
      id?: string;
      email?: string;
      role?: 'SuperAdmin' | 'General';
    };
  }
}
