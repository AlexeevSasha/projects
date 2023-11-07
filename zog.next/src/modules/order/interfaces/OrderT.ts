export type OrderT = {
  email: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  birthdate: string;
  location: string;
  illnesses: string;
  med_files: string[];
  health_state: string;
  aims: string;
  hebits: string;
  about_photos: string;
  photos: string[];
  phone: string;
  partnerId?: string;
  stage: string;
  supportDate: string | null;
  formid: string;
  formname: string;
  consultant?: string;
  radio?: string;
  type: string;
  audio_comment: string;
};

export type ShortOrderT = {
  id: string;
  createdAt: string;
  name: string;
  location: string;
  stage: string;
};
