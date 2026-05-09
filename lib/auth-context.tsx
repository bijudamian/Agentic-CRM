'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabase';
import { BusinessProfile } from './types';
import { getBusinessProfile } from './database';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
    user: User | null;
    businessProfile: BusinessProfile | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<any>;
    signup: (email: string, password: string) => Promise<any>;
    logout: () => Promise<void>;
    refreshBusinessProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [businessProfile, setBusinessProfile] = useState<BusinessProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);

            if (session?.user) {
                try {
                    const profile = await getBusinessProfile(session.user.id);
                    setBusinessProfile(profile);
                } catch (error) {
                    console.error('Error fetching business profile:', error);
                }
            }
            setLoading(false);
        };
        fetchSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setUser(session?.user ?? null);

            if (session?.user) {
                try {
                    const profile = await getBusinessProfile(session.user.id);
                    setBusinessProfile(profile);
                } catch (error) {
                    console.error('Error fetching business profile:', error);
                }
            } else {
                setBusinessProfile(null);
            }
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const login = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        return data;
    };

    const signup = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        return data;
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setBusinessProfile(null);
    };

    const refreshBusinessProfile = async () => {
        if (user) {
            const profile = await getBusinessProfile(user.id);
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
