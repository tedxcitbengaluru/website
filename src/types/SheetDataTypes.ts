// types/SheetDataTypes.ts
export interface AboutData {
    title: string;
    heroText: string;
    minutes: string;
    speakers: string;
    circles: string;
    followers: string;
  }
  
  export interface EventData {
    index: string;
    title: string;
    date: string;
    about: string;
    hide: string;
  }
  
  export interface CategoryData {
    title: string;
    order: string;
  }
  
  export interface SponsorData {
    name: string;
    category: string;
  }
  
  export interface CircleData {
    title: string;
    about: string;
    date: string;
    hide: string;
  }
  
  export interface TeamData {
    events: string;
    name: string;
    category: string;
    title: string;
    about: string;
  }
  
  export interface SpeakerData {
    event: string;
    name: string;
    about: string;
    instagram: string;
    linkedin: string;
    title: string;
  }
  
  export interface SheetData {
    about: AboutData[];
    events: EventData[];
    categories: CategoryData[];
    sponsors: SponsorData[];
    circles: CircleData[];
    team: TeamData[];
    speakersAndPerformers: SpeakerData[];
    home?: string[]; 
  }
  