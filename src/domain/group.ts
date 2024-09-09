import { User } from "./user";

export interface Group {
    name: string;
    description: string;
    members: User[];
    date: string;
    discipline: string;
    tags: string[];
    owner: string;
    id: string;
  }
  