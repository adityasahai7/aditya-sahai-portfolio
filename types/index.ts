export type AccentColor = "tomato" | "cobalt" | "butter" | "lilac" | "acid";
export type CursorState = "default" | "link" | "drag" | "view" | "text";

export interface Project {
  number: string;
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
  outcome?: string;
  tags?: string[];
}

export interface Service {
  num: string;
  title: string;
  description: string;
  delivery: string;
  iconName: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}

// Legacy aliases — unused component files still compile
export type ServiceItem = Service;
export type WorkProject = Project;
