export interface IInterview {
  id: string;
  company: string;
  vacancyLink: string;
  hrName: string;
  contactTelegram?: string;
  contactEmail?: string;
  contactPhone?: string;
  dateCreation: Date;
  salaryMin?: number;
  salaryMax?: number;
  stages?: Array<IInterviewStage>;
}

export interface IInterviewStage {
  name: string;
  date: Date;
  descr: string;
}
