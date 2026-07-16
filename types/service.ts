export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  freelancer: {
    name: string;
    avatar: string;
    rating: number;
  };
  image: string;
  deliveryDays: number;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  budget: number;
  currency: string;
  category: string;
  postedBy: string;
  postedAt: string;
  applicants: number;
  image: string;
  tags: string[];
  url?: string;
}

export interface CampaignSlide {
  id: string;
  title: string;
  subtitle: string;
  accent: string;
  icon: string;
}
