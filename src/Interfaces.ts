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
  stages: Array<IInterviewStage>;
  result?: 'eboy' | 'fuckshit';
}

export interface IInterviewStage {
  name: string;
  date: string;
  descr?: string;
}
