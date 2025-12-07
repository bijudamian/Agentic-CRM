'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    User,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    UserCredential,
} from 'firebase/auth';
import { auth } from './firebase';
import { BusinessProfile } from './types';
import { getBusinessProfile } from './firestore';

interface AuthContextType {
    user: User | null;
    businessProfile: BusinessProfile | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<UserCredential>;
    signup: (email: string, password: string) => Promise<UserCredential>;
    logout: () => Promise<void>;
    refreshBusinessProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [businessProfile, setBusinessProfile] = useState<BusinessProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);

            if (user) {
                // Fetch business profile when user logs in
                try {
                    const profile = await getBusinessProfile(user.uid);
                    setBusinessProfile(profile);
                } catch (error) {
                    console.error('Error fetching business profile:', error);
                }
            } else {
                setBusinessProfile(null);
            }

            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const login = async (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signup = async (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const logout = async () => {
        await signOut(auth);
        setBusinessProfile(null);
    };

    const refreshBusinessProfile = async () => {
        if (user) {
            const profile = await getBusinessProfile(user.uid);
            setBusinessProfile(profile);
        }
    };

    const value = {
        user,
        businessProfile,
        loading,
        login,
        signup,
        logout,
        refreshBusinessProfile,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
