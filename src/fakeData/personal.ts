export interface ResumeType {
  name: {
    first: string;
    middle: string;
    last: string;
  };
  contact: {
    email: string;
    phone: string;
    personal_website: string;
    linkedIn: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  experience: {
    title: string;
    company: string;
    location: string;
    start: Date | null;
    end: Date | null;
    bullets: string[];
    summary: string;
    current: boolean;
  }[];
  education: {
    school: string;
    degree: string;
    major: string;
    location: {
      city: string;
      state: string;
    };
    start: Date | null;
    end: Date | null;
    gpa: number | null;
    current: boolean;
  }[];
  skills: string[];
  certificates: {
    name: string;
    issuer: string;
    issue_date: Date | null;
    expiration_date: Date | null;
  }[];
  projects: {
    name: string;
    description: string;
    start: Date | null;
    end: Date | null;
    bullets: string[];
    current: boolean;
  }[];
}

export interface ResumeLink {
  jobTitle: string;
  id: string;
  date: Date;
  jobSiteLink: string;
  jobSiteChoice: string;
  scrapedData: {
    jobTitle: string;
    companyName: string;
    locationAndTime: string;
    salary: string;
    jobDescription: string;
  };
  resume: ResumeType;
  matchScore: string;
  overallThoughts: string;
  strengths: string;
  weaknesses: string;
}

export interface WritingType {
  writingStyle: string;
  grammar: string;
}

export interface PersonalType {
  resume: ResumeType;
  writing: WritingType;
}
