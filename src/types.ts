export interface Actor {
  id: string;
  name: string;
  avatar: string;
  coverPhoto: string;
  gender: 'male' | 'female';
  region: 'mainland' | 'hongkong_taiwan' | 'overseas';
  tags: string[];
  height: number; // cm
  weight: number; // kg
  measurements?: string; // e.g., "86-60-88"
  location: string;
  licensingPrice: number; // RMB per year or project
  isExclusive: boolean;
  genres: string[]; // e.g., ["短剧", "广告", "二次元", "现代剧", "古装"]
  videoSampleUrl: string; // fallback mockup
  media: string[];
  bio: string;
  rating: number;
  cooperationIntent: string[]; // ["可接短剧", "商业代言", "AI训练", "平面拍摄", "游戏脸型建模"]
  earnings: {
    total: number;
    monthly: number;
    yearly: number;
    trend: 'up' | 'down' | 'stable';
    rank: number;
  };
}

export interface ContestItem {
  id: string;
  title: string;
  actorName: string;
  actorAvatar: string;
  role: string;
  votes: number;
  image: string;
  videoUrl?: string;
  category: 'cos' | 'short_drama' | 'modern';
}

export interface Booking {
  id: string;
  bookingId: string;
  actorId: string;
  actorName: string;
  actorAvatar: string;
  licenseType: 'single' | 'annual' | 'buyout';
  price: number;
  status: 'pending_payment' | 'active' | 'completed';
  date: string;
  duration: string;
  licenseNo: string;
}

export interface Application {
  id: string;
  name: string;
  gender: 'male' | 'female';
  region: string;
  height: number;
  weight: number;
  location: string;
  tags: string[];
  cooperationIntent: string[];
  avatar: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

export interface ContestSignup {
  id: string;
  contestId: string;
  contestTitle: string;
  actorName: string;
  contact: string;
  videoUrl: string;
  roleType: string;
  experience: string;
  status: 'pending' | 'accepted';
  date: string;
}
