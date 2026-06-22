export interface ContactSubmission {
  id: string;
  reference_id: string;
  company: string;
  country_port: string;
  quantity: string;
  email: string;
  phone: string;
  notes: string | null;
  lang: 'ar' | 'en' | null;
  created_at: string;
}

export interface ContactSubmissionInsert {
  reference_id: string;
  company: string;
  country_port: string;
  quantity: string;
  email: string;
  phone: string;
  notes?: string | null;
  lang?: 'ar' | 'en' | null;
}

export type Database = {
  public: {
    Tables: {
      contact_submissions: {
        Row: ContactSubmission;
        Insert: ContactSubmissionInsert;
        Update: Partial<ContactSubmissionInsert>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
