import type React from "react"
/**
 * Represents the current mode of the application (business or personal dashboard).
 */
export type AccountMode = "business" | "personal"

/**
 * Represents a user in the system.
 */
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  businessId?: string
  role?: "admin" | "employee" | "customer"
}

export interface NavigationItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: number
}

export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  status: "new" | "contacted" | "qualified" | "proposal" | "closed"
  value: number
  createdAt: string
}

export interface Employee {
  id: string
  name: string
  email: string
  role: string
  department: string
  status: "active" | "inactive"
  avatar?: string
}

export interface Service {
  id: string
  name: string
  description: string
  price: number
  category: string
  status: "active" | "inactive"
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  category: string
  image?: string
}

export interface Invoice {
  id: string
  customerId: string
  customerName: string
  amount: number
  status: "draft" | "sent" | "paid" | "overdue"
  dueDate: string
  createdAt: string
}

export interface Feedback {
  id: string
  serviceId: string
  serviceName: string
  customerId: string
  customerName: string
  rating: number
  comment: string
  createdAt: string
}

export interface SupportTicket {
  id: string
  subject: string
  description: string
  status: "open" | "in-progress" | "resolved" | "closed"
  priority: "low" | "medium" | "high"
  createdAt: string
}

export interface MarketingContent {
  id: string
  title: string
  content: string
  channel: "whatsapp" | "instagram" | "facebook" | "twitter"
  status: "draft" | "pending" | "approved" | "scheduled" | "published"
  scheduledAt?: string
  createdAt: string
}

export interface Activity {
  id: string
  type: "purchase" | "booking" | "event"
  title: string
  description: string
  date: string
  status: "upcoming" | "completed" | "cancelled"
}

export interface Offer {
  id: string
  title: string
  description: string
  discount: number
  validUntil: string
  businessName: string
}

// Firebase Auth Types
export type UserRole = 'business_owner' | 'consumer';

export type BusinessCategory =
  | 'retail'
  | 'restaurant'
  | 'e-commerce'
  | 'services'
  | 'healthcare'
  | 'education'
  | 'technology'
  | 'manufacturing'
  | 'real_estate'
  | 'other';

export interface BusinessAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface BestSeller {
  productName: string;
  description?: string;
  averagePrice: number;
}

export interface MarketingConfig {
  goal: string;
  budget: string;
  channels: string[];
  tools: string[];
}

export interface BusinessProfile {
  userId: string;
  ownerName: string;
  email: string;
  businessName: string;
  address: BusinessAddress;
  category: BusinessCategory;
  niche: string;
  bestSellers: BestSeller[];
  marketing?: MarketingConfig;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  uid: string;
  email: string;
  role: UserRole;
  displayName?: string;
}
