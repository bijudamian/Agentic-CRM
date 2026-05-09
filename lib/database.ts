import { supabase } from './supabase';
import { BusinessProfile, BusinessAddress, BestSeller } from './types';

const COLLECTIONS = {
    BUSINESS_PROFILES: 'businessProfiles',
};

/**
 * Create a new business profile in Supabase.
 * @param userId - The unique identifier of the user.
 * @param data - The business profile data to store.
 */
export async function createBusinessProfile(
    userId: string,
    data: {
        ownerName: string;
        email: string;
        businessName: string;
        address: BusinessAddress;
        category: string;
        niche: string;
        bestSellers: BestSeller[];
    }
): Promise<void> {
    const profileData = {
        userId, // we map userId to id or user_id depending on how it's structured, assuming userId is the PK
        ownerName: data.ownerName,
        email: data.email,
        businessName: data.businessName,
        address: data.address,
        category: data.category,
        niche: data.niche,
        bestSellers: data.bestSellers,
        role: 'business_owner',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    const { error } = await supabase
        .from(COLLECTIONS.BUSINESS_PROFILES)
        .upsert(profileData, { onConflict: 'userId' });

    if (error) {
        console.error("Error creating profile", error);
        throw error;
    }
}

/**
 * Get a business profile from Supabase by user ID.
 * @param userId - The unique identifier of the user.
 */
export async function getBusinessProfile(userId: string): Promise<BusinessProfile | null> {
    const { data, error } = await supabase
        .from(COLLECTIONS.BUSINESS_PROFILES)
        .select('*')
        .eq('userId', userId)
        .single();

    if (error || !data) {
        return null;
    }

    return {
        ...data,
        createdAt: data.createdAt ? new Date(data.createdAt) : undefined,
        updatedAt: data.updatedAt ? new Date(data.updatedAt) : undefined,
    } as BusinessProfile;
}

/**
 * Update a business profile in Supabase.
 * @param userId - The unique identifier of the user.
 * @param data - The partial business profile data to update.
 */
export async function updateBusinessProfile(
    userId: string,
    data: Partial<Omit<BusinessProfile, 'userId' | 'email' | 'role' | 'createdAt' | 'updatedAt'>>
): Promise<void> {
    const { error } = await supabase
        .from(COLLECTIONS.BUSINESS_PROFILES)
        .update({
            ...data,
            updatedAt: new Date().toISOString(),
        })
        .eq('userId', userId);

    if (error) {
        console.error("Error updating profile", error);
        throw error;
    }
}
