export interface IInterview {
  id: number;
  company: string;
  vacancyLink: string;
  hrName: string;
  contactTelegram?: string;
  contactEmail?: string;
  contactPhone?: string;
  dateCreation: Date;
}
