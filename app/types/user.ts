export interface User {
    _id: string;
    image: string;
    name: string;
    email: string;
    role: "Home Manager" | "dweller";
    energySaved: string;
  }