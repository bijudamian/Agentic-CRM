'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { LogIn, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { loginSchema, type LoginFormData } from '@/lib/schemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        try {
            await login(data.email, data.password);
            toast.success('Welcome back!');
            router.push('/dashboard');
        } catch (error: any) {
            console.error('Login error:', error);
            toast.error(error.message || 'Failed to sign in. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto backdrop-blur-xl bg-slate-900/80 border-slate-700/50 shadow-2xl">
            <CardHeader className="space-y-2 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-2">
                    <LogIn className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Welcome Back
                </CardTitle>
                <CardDescription className="text-slate-400">
                    Sign in to your business account
                </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-200">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@business.com"
                            className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500"
                            {...register('email')}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-400">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="space-y-2 mb-6">
                        <Label htmlFor="password" className="text-slate-200">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500"
                            {...register('password')}
                        />
                        {errors.password && (
                            <p className="text-sm text-red-400">{errors.password.message}</p>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col space-y-6">
                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-6 transition-all duration-200"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Signing in...
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </Button>

                    <div className="text-center text-sm text-slate-400">
                        Don't have an account?{' '}
                        <Link
                            href="/signup"
                            className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                        >
                            Create one now
                        </Link>
                    </div>
                </CardFooter>
            </form>
        </Card>
    );
}
