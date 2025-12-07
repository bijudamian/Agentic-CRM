import {
    doc,
    setDoc,
    getDoc,
    updateDoc,
    serverTimestamp,
    DocumentData
} from 'firebase/firestore';
import { db } from './firebase';
import { BusinessProfile, BusinessAddress, BestSeller } from './types';

const COLLECTIONS = {
    BUSINESS_PROFILES: 'businessProfiles',
};

/**
 * Create a new business profile in Firestore.
 * @param userId - The unique identifier of the user (from Auth).
 * @param data - The business profile data to store.
 * @returns Promise that resolves when the profile is created.
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
    const businessProfileRef = doc(db, COLLECTIONS.BUSINESS_PROFILES, userId);

    const profileData = {
        userId,
        ownerName: data.ownerName,
        email: data.email,
        businessName: data.businessName,
        address: data.address,
        category: data.category,
        niche: data.niche,
        bestSellers: data.bestSellers,
        role: 'business_owner',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    };

    await setDoc(businessProfileRef, profileData);
}

/**
 * Get a business profile from Firestore by user ID.
 * @param userId - The unique identifier of the user.
 * @returns Promise resolving to the BusinessProfile object or null if not found.
 */
export async function getBusinessProfile(userId: string): Promise<BusinessProfile | null> {
    const businessProfileRef = doc(db, COLLECTIONS.BUSINESS_PROFILES, userId);
    const docSnap = await getDoc(businessProfileRef);

    if (docSnap.exists()) {
        const data = docSnap.data();
        return {
            ...data,
            createdAt: data.createdAt?.toDate(),
            updatedAt: data.updatedAt?.toDate(),
        } as BusinessProfile;
    }

    return null;
}

/**
 * Update a business profile in Firestore.
 * Only updates the fields provided in the data object.
 * @param userId - The unique identifier of the user.
 * @param data - The partial business profile data to update.
 * @returns Promise that resolves when the update is complete.
 */
export async function updateBusinessProfile(
    userId: string,
    data: Partial<Omit<BusinessProfile, 'userId' | 'email' | 'role' | 'createdAt' | 'updatedAt'>>
): Promise<void> {
    const businessProfileRef = doc(db, COLLECTIONS.BUSINESS_PROFILES, userId);

    await updateDoc(businessProfileRef, {
        ...data,
        updatedAt: serverTimestamp(),
    });
}
