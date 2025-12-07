import { z } from 'zod';

// Login Schema
export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Signup Schema - Step 1: Account Details
export const accountDetailsSchema = z.object({
    ownerName: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

export type AccountDetailsFormData = z.infer<typeof accountDetailsSchema>;

// Signup Schema - Step 2: Business Details
export const businessDetailsSchema = z.object({
    businessName: z.string().min(2, 'Business name is required'),
    street: z.string().min(5, 'Street address is required'),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    zipCode: z.string().min(3, 'ZIP code is required'),
    country: z.string().min(2, 'Country is required'),
    category: z.enum([
        'retail',
        'restaurant',
        'e-commerce',
        'services',
        'healthcare',
        'education',
        'technology',
        'manufacturing',
        'real_estate',
        'other',
    ], { errorMap: () => ({ message: 'Please select a business category' }) }),
    niche: z.string().min(3, 'Please describe your business niche'),
});

export type BusinessDetailsFormData = z.infer<typeof businessDetailsSchema>;

// Signup Schema - Step 3: Best Sellers
export const bestSellersSchema = z.object({
    bestSellers: z.array(z.object({
        productName: z.string().min(1, 'Product name is required'),
        description: z.string().optional(),
        averagePrice: z.number().min(0, 'Price must be a positive number'),
    })).min(1, 'Add at least one best seller'),
});

export type BestSellersFormData = z.infer<typeof bestSellersSchema>;


// Complete Signup Form Data
export type CompleteSignupData = AccountDetailsFormData & BusinessDetailsFormData & BestSellersFormData;

// Support Ticket Schema
export const supportTicketSchema = z.object({
    subject: z.string().min(5, 'Subject must be at least 5 characters'),
    priority: z.enum(['low', 'medium', 'high'], {
        errorMap: () => ({ message: 'Please select a priority' }),
    }),
    description: z.string().min(10, 'Description must be at least 10 characters'),
});

export type SupportTicketFormData = z.infer<typeof supportTicketSchema>;
