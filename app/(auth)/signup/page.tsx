'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { UserPlus, Loader2, Building2, MapPin, Package, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import {
    accountDetailsSchema,
    businessDetailsSchema,
    bestSellersSchema,
    type AccountDetailsFormData,
    type BusinessDetailsFormData,
    type BestSellersFormData,
} from '@/lib/schemas';
import { createBusinessProfile } from '@/lib/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import type { BusinessCategory } from '@/lib/types';

const BUSINESS_CATEGORIES: { value: BusinessCategory; label: string }[] = [
    { value: 'retail', label: 'Retail' },
    { value: 'restaurant', label: 'Restaurant/Food Service' },
    { value: 'e-commerce', label: 'E-Commerce' },
    { value: 'services', label: 'Professional Services' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'technology', label: 'Technology' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'real_estate', label: 'Real Estate' },
    { value: 'other', label: 'Other' },
];

type Step = 1 | 2 | 3;

export default function SignupPage() {
    const router = useRouter();
    const { signup, refreshBusinessProfile } = useAuth();
    const [currentStep, setCurrentStep] = useState<Step>(1);
    const [isLoading, setIsLoading] = useState(false);

    // Form data storage across steps
    const [accountData, setAccountData] = useState<AccountDetailsFormData | null>(null);
    const [businessData, setBusinessData] = useState<BusinessDetailsFormData | null>(null);

    // Step 1: Account Details Form
    const accountForm = useForm<AccountDetailsFormData>({
        resolver: zodResolver(accountDetailsSchema),
        defaultValues: accountData || {},
    });

    // Step 2: Business Details Form
    const businessForm = useForm<BusinessDetailsFormData>({
        resolver: zodResolver(businessDetailsSchema),
        defaultValues: businessData || {},
    });

    // Step 3: Best Sellers Form
    const [bestSellers, setBestSellers] = useState([
        { productName: '', description: '', averagePrice: 0 },
    ]);

    const addBestSeller = () => {
        setBestSellers([...bestSellers, { productName: '', description: '', averagePrice: 0 }]);
    };

    const removeBestSeller = (index: number) => {
        if (bestSellers.length > 1) {
            setBestSellers(bestSellers.filter((_, i) => i !== index));
        }
    };

    const handleAccountNext = (data: AccountDetailsFormData) => {
        setAccountData(data);
        setCurrentStep(2);
    };

    const handleBusinessNext = (data: BusinessDetailsFormData) => {
        setBusinessData(data);
        setCurrentStep(3);
    };

    const handleFinalSubmit = async () => {
        if (!accountData || !businessData) return;

        // Validate best sellers
        const validBestSellers = bestSellers.filter(
            (seller) => seller.productName.trim() !== '' && seller.averagePrice > 0
        );

        if (validBestSellers.length === 0) {
            toast.error('Please add at least one best seller with a valid price');
            return;
        }

        setIsLoading(true);
        try {
            // Create Firebase auth account
            const userCredential = await signup(accountData.email, accountData.password);
            const userId = userCredential.user.uid;

            // Create business profile in Firestore
            await createBusinessProfile(userId, {
                ownerName: accountData.ownerName,
                email: accountData.email,
                businessName: businessData.businessName,
                address: {
                    street: businessData.street,
                    city: businessData.city,
                    state: businessData.state,
                    zipCode: businessData.zipCode,
                    country: businessData.country,
                },
                category: businessData.category,
                niche: businessData.niche,
                bestSellers: validBestSellers,
            });

            // Refresh business profile in auth context
            await refreshBusinessProfile();

            toast.success('Account created successfully! Welcome aboard! 🎉');
            router.push('/dashboard');
        } catch (error: any) {
            console.error('Signup error:', error);
            toast.error(error.message || 'Failed to create account. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const renderStepIndicator = () => (
        <div className="flex items-center justify-center space-x-4 mb-8">
            {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                    <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${currentStep === step
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white scale-110'
                            : currentStep > step
                                ? 'bg-green-500 text-white'
                                : 'bg-slate-700 text-slate-400'
                            }`}
                    >
                        {currentStep > step ? <Check className="w-5 h-5" /> : step}
                    </div>
                    {step < 3 && (
                        <div
                            className={`w-16 h-1 mx-2 transition-all duration-300 ${currentStep > step ? 'bg-green-500' : 'bg-slate-700'
                                }`}
                        />
                    )}
                </div>
            ))}
        </div>
    );

    return (
        <Card className="w-full max-w-2xl mx-auto backdrop-blur-xl bg-slate-900/80 border-slate-700/50 shadow-2xl">
            <CardHeader className="space-y-2 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-2">
                    <UserPlus className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Create Your Business Account
                </CardTitle>
                <CardDescription className="text-slate-400">
                    {currentStep === 1 && 'Let\'s start with your account details'}
                    {currentStep === 2 && 'Tell us about your business'}
                    {currentStep === 3 && 'What are your best-selling products?'}
                </CardDescription>
            </CardHeader>

            {renderStepIndicator()}

            {/* Step 1: Account Details */}
            {currentStep === 1 && (
                <form onSubmit={accountForm.handleSubmit(handleAccountNext)}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="ownerName" className="text-slate-200">Your Name</Label>
                            <Input
                                id="ownerName"
                                placeholder="John Doe"
                                className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500"
                                {...accountForm.register('ownerName')}
                            />
                            {accountForm.formState.errors.ownerName && (
                                <p className="text-sm text-red-400">{accountForm.formState.errors.ownerName.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-slate-200">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@business.com"
                                className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500"
                                {...accountForm.register('email')}
                            />
                            {accountForm.formState.errors.email && (
                                <p className="text-sm text-red-400">{accountForm.formState.errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-slate-200">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500"
                                {...accountForm.register('password')}
                            />
                            {accountForm.formState.errors.password && (
                                <p className="text-sm text-red-400">{accountForm.formState.errors.password.message}</p>
                            )}
                        </div>

                        <div className="space-y-2 mb-6">
                            <Label htmlFor="confirmPassword" className="text-slate-200">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500"
                                {...accountForm.register('confirmPassword')}
                            />
                            {accountForm.formState.errors.confirmPassword && (
                                <p className="text-sm text-red-400">{accountForm.formState.errors.confirmPassword.message}</p>
                            )}
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4">
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-6"
                        >
                            Continue <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>

                        <div className="text-center text-sm text-slate-400">
                            Already have an account?{' '}
                            <Link href="/login" className="text-blue-400 hover:text-blue-300 font-semibold">
                                Sign in
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            )}

            {/* Step 2: Business Details */}
            {currentStep === 2 && (
                <form onSubmit={businessForm.handleSubmit(handleBusinessNext)}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="businessName" className="text-slate-200 flex items-center gap-2">
                                <Building2 className="w-4 h-4" /> Business Name
                            </Label>
                            <Input
                                id="businessName"
                                placeholder="Acme Corp"
                                className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500"
                                {...businessForm.register('businessName')}
                            />
                            {businessForm.formState.errors.businessName && (
                                <p className="text-sm text-red-400">{businessForm.formState.errors.businessName.message}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 space-y-2">
                                <Label htmlFor="street" className="text-slate-200 flex items-center gap-2">
                                    <MapPin className="w-4 h-4" /> Street Address
                                </Label>
                                <Input
                                    id="street"
                                    placeholder="123 Main St"
                                    className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500"
                                    {...businessForm.register('street')}
                                />
                                {businessForm.formState.errors.street && (
                                    <p className="text-sm text-red-400">{businessForm.formState.errors.street.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="city" className="text-slate-200">City</Label>
                                <Input
                                    id="city"
                                    placeholder="New York"
                                    className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500"
                                    {...businessForm.register('city')}
                                />
                                {businessForm.formState.errors.city && (
                                    <p className="text-sm text-red-400">{businessForm.formState.errors.city.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="state" className="text-slate-200">State</Label>
                                <Input
                                    id="state"
                                    placeholder="NY"
                                    className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500"
                                    {...businessForm.register('state')}
                                />
                                {businessForm.formState.errors.state && (
                                    <p className="text-sm text-red-400">{businessForm.formState.errors.state.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="zipCode" className="text-slate-200">ZIP Code</Label>
                                <Input
                                    id="zipCode"
                                    placeholder="10001"
                                    className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500"
                                    {...businessForm.register('zipCode')}
                                />
                                {businessForm.formState.errors.zipCode && (
                                    <p className="text-sm text-red-400">{businessForm.formState.errors.zipCode.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="country" className="text-slate-200">Country</Label>
                                <Input
                                    id="country"
                                    placeholder="USA"
                                    className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500"
                                    {...businessForm.register('country')}
                                />
                                {businessForm.formState.errors.country && (
                                    <p className="text-sm text-red-400">{businessForm.formState.errors.country.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category" className="text-slate-200">Business Category</Label>
                            <Select
                                onValueChange={(value) => businessForm.setValue('category', value as BusinessCategory)}
                                defaultValue={businessData?.category}
                            >
                                <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-800 border-slate-600">
                                    {BUSINESS_CATEGORIES.map((cat) => (
                                        <SelectItem key={cat.value} value={cat.value} className="text-white">
                                            {cat.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {businessForm.formState.errors.category && (
                                <p className="text-sm text-red-400">{businessForm.formState.errors.category.message}</p>
                            )}
                        </div>

                        <div className="space-y-2 mb-6">
                            <Label htmlFor="niche" className="text-slate-200">Business Niche</Label>
                            <Input
                                id="niche"
                                placeholder="e.g., Organic skincare products"
                                className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500"
                                {...businessForm.register('niche')}
                            />
                            <p className="text-xs text-slate-500">Describe what makes your business unique</p>
                            {businessForm.formState.errors.niche && (
                                <p className="text-sm text-red-400">{businessForm.formState.errors.niche.message}</p>
                            )}
                        </div>
                    </CardContent>

                    <CardFooter className="flex gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-800"
                            onClick={() => setCurrentStep(1)}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
                        >
                            Continue <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </CardFooter>
                </form>
            )}

            {/* Step 3: Best Sellers */}
            {currentStep === 3 && (
                <>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-2 text-slate-200 mb-4">
                            <Package className="w-5 h-5" />
                            <span className="font-semibold">Best Selling Products</span>
                        </div>

                        {bestSellers.map((seller, index) => (
                            <div key={index} className="p-4 rounded-lg bg-slate-800/30 border border-slate-700 space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label className="text-slate-300">Product #{index + 1}</Label>
                                    {bestSellers.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="text-red-400 hover:text-red-300"
                                            onClick={() => removeBestSeller(index)}
                                        >
                                            Remove
                                        </Button>
                                    )}
                                </div>

                                <Input
                                    placeholder="Product name"
                                    value={seller.productName}
                                    onChange={(e) => {
                                        const updated = [...bestSellers];
                                        updated[index].productName = e.target.value;
                                        setBestSellers(updated);
                                    }}
                                    className="bg-slate-800/50 border-slate-600 text-white"
                                />

                                <Input
                                    placeholder="Description (optional)"
                                    value={seller.description}
                                    onChange={(e) => {
                                        const updated = [...bestSellers];
                                        updated[index].description = e.target.value;
                                        setBestSellers(updated);
                                    }}
                                    className="bg-slate-800/50 border-slate-600 text-white"
                                />

                                <Input
                                    type="number"
                                    placeholder="Average price"
                                    value={seller.averagePrice || ''}
                                    onChange={(e) => {
                                        const updated = [...bestSellers];
                                        updated[index].averagePrice = parseFloat(e.target.value) || 0;
                                        setBestSellers(updated);
                                    }}
                                    className="bg-slate-800/50 border-slate-600 text-white"
                                />
                            </div>
                        ))}

                        <Button
                            type="button"
                            variant="outline"
                            className="w-full border-slate-600 text-slate-300 hover:bg-slate-800 mb-6"
                            onClick={addBestSeller}
                        >
                            + Add Another Product
                        </Button>
                    </CardContent>

                    <CardFooter className="flex gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-800"
                            onClick={() => setCurrentStep(2)}
                            disabled={isLoading}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back
                        </Button>
                        <Button
                            type="button"
                            className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold"
                            onClick={handleFinalSubmit}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    <Check className="mr-2 h-4 w-4" />
                                    Create Account
                                </>
                            )}
                        </Button>
                    </CardFooter>
                </>
            )}
        </Card>
    );
}
