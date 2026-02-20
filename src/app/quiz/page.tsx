'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@/components/ui/Icon';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/utils';

/* ─── Question Data ─── */

interface QuizOption {
    label: string;
    value: string;
    icon?: string;
}

interface QuizQuestion {
    id: string;
    title: string;
    subtitle: string;
    type: 'single' | 'multi' | 'input' | 'range';
    options?: QuizOption[];
    placeholder?: string;
    min?: number;
    max?: number;
    unit?: string;
}

const QUESTIONS: QuizQuestion[] = [
    {
        id: 'age',
        title: 'How old are you?',
        subtitle: 'Your biological age influences which longevity protocols suit you best.',
        type: 'range',
        min: 18,
        max: 90,
        unit: 'years',
    },
    {
        id: 'gender',
        title: 'What is your biological sex?',
        subtitle: 'Hormonal profiles differ and affect supplement efficacy.',
        type: 'single',
        options: [
            { label: 'Male', value: 'male', icon: 'male' },
            { label: 'Female', value: 'female', icon: 'female' },
            { label: 'Prefer not to say', value: 'other', icon: 'person' },
        ],
    },
    {
        id: 'goals',
        title: 'What are your primary wellness goals?',
        subtitle: 'Select all that apply — we\'ll tailor your protocol.',
        type: 'multi',
        options: [
            { label: 'More Energy', value: 'energy', icon: 'bolt' },
            { label: 'Better Sleep', value: 'sleep', icon: 'bedtime' },
            { label: 'Stress Relief', value: 'stress', icon: 'self_improvement' },
            { label: 'Anti-Aging', value: 'aging', icon: 'face_retouching_natural' },
            { label: 'Heart Health', value: 'heart', icon: 'favorite' },
            { label: 'Brain Focus', value: 'focus', icon: 'psychology' },
            { label: 'Immune Defense', value: 'immunity', icon: 'shield' },
            { label: 'Joint & Recovery', value: 'joint', icon: 'directions_run' },
        ],
    },
    {
        id: 'diet',
        title: 'How would you describe your diet?',
        subtitle: 'Nutritional gaps vary based on eating patterns.',
        type: 'single',
        options: [
            { label: 'Balanced / Omnivore', value: 'balanced', icon: 'restaurant' },
            { label: 'Vegetarian', value: 'vegetarian', icon: 'eco' },
            { label: 'Vegan', value: 'vegan', icon: 'psychiatry' },
            { label: 'Keto / Low-Carb', value: 'keto', icon: 'local_fire_department' },
            { label: 'Mediterranean', value: 'mediterranean', icon: 'water_drop' },
        ],
    },
    {
        id: 'activity',
        title: 'How active are you on a typical week?',
        subtitle: 'Exercise frequency impacts nutrient demands and recovery needs.',
        type: 'single',
        options: [
            { label: 'Sedentary (0–1 days)', value: 'sedentary', icon: 'weekend' },
            { label: 'Lightly Active (2–3 days)', value: 'light', icon: 'directions_walk' },
            { label: 'Moderately Active (4–5 days)', value: 'moderate', icon: 'directions_run' },
            { label: 'Very Active (6–7 days)', value: 'very', icon: 'fitness_center' },
        ],
    },
    {
        id: 'sleep_quality',
        title: 'How would you rate your sleep quality?',
        subtitle: 'Sleep is the foundation of cellular repair and longevity.',
        type: 'single',
        options: [
            { label: 'Poor — I struggle most nights', value: 'poor', icon: 'brightness_alert' },
            { label: 'Fair — Inconsistent quality', value: 'fair', icon: 'brightness_medium' },
            { label: 'Good — Usually rested', value: 'good', icon: 'brightness_high' },
            { label: 'Excellent — Deep, consistent sleep', value: 'excellent', icon: 'dark_mode' },
        ],
    },
    {
        id: 'supplements_current',
        title: 'Are you currently taking any supplements?',
        subtitle: 'This helps us avoid redundancy and stack safely.',
        type: 'multi',
        options: [
            { label: 'Vitamin D', value: 'vitamin_d', icon: 'wb_sunny' },
            { label: 'Omega-3 / Fish Oil', value: 'omega3', icon: 'water_drop' },
            { label: 'Magnesium', value: 'magnesium', icon: 'spa' },
            { label: 'B-Vitamins', value: 'b_vitamins', icon: 'bolt' },
            { label: 'Probiotics', value: 'probiotics', icon: 'science' },
            { label: 'None', value: 'none', icon: 'block' },
        ],
    },
    {
        id: 'health_concerns',
        title: 'Do you have any specific health concerns?',
        subtitle: 'Optional — helps us be more precise with recommendations.',
        type: 'input',
        placeholder: 'e.g. high cholesterol, joint pain, fatigue, brain fog...',
    },
];

/* ─── Recommendation Engine ─── */

function getRecommendations(answers: Record<string, string | string[] | number>) {
    const goals = (answers.goals as string[]) || [];
    const sleepQuality = answers.sleep_quality as string;
    const activity = answers.activity as string;

    const scored = products.map((product) => {
        let score = 0;

        // Goal matching
        if (goals.includes('energy') && product.tags.some((t) => t.match(/energy/i))) score += 3;
        if (goals.includes('sleep') && product.tags.some((t) => t.match(/sleep|recovery/i))) score += 3;
        if (goals.includes('stress') && product.tags.some((t) => t.match(/stress|adaptogen/i))) score += 3;
        if (goals.includes('aging') && product.tags.some((t) => t.match(/anti-aging|antioxidant/i))) score += 3;
        if (goals.includes('heart') && product.tags.some((t) => t.match(/heart|circulation/i))) score += 3;
        if (goals.includes('focus') && product.tags.some((t) => t.match(/focus|brain/i))) score += 3;
        if (goals.includes('immunity') && product.tags.some((t) => t.match(/immun/i))) score += 3;
        if (goals.includes('joint') && product.tags.some((t) => t.match(/joint|anti-inflammatory/i))) score += 3;

        // Sleep quality boost for Magnesium
        if (sleepQuality === 'poor' && product.slug === 'magnesium-bisglycinate') score += 2;
        if (sleepQuality === 'poor' && product.slug === 'ksm-66-ashwagandha-plus') score += 2;

        // Active people benefit from Omega-3, B-Complex
        if ((activity === 'moderate' || activity === 'very') && product.slug === 'omega-3-fish-oil') score += 1;
        if ((activity === 'moderate' || activity === 'very') && product.slug === 'vitamin-b-komplex') score += 1;

        // Baseline for essentials
        if (product.slug === 'vitamin-d3-k2') score += 1;

        return { product, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 4).map((s) => s.product);
}

/* ─── Component ─── */

export default function QuizPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string | string[] | number>>({
        age: 35,
    });
    const [showResults, setShowResults] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const question = QUESTIONS[currentStep];
    const totalSteps = QUESTIONS.length;
    const progress = ((currentStep + 1) / totalSteps) * 100;

    const handleSingle = (value: string) => {
        setAnswers((prev) => ({ ...prev, [question.id]: value }));
    };

    const handleMulti = (value: string) => {
        const current = (answers[question.id] as string[]) || [];
        if (value === 'none') {
            setAnswers((prev) => ({ ...prev, [question.id]: ['none'] }));
            return;
        }
        const filtered = current.filter((v) => v !== 'none');
        const updated = filtered.includes(value)
            ? filtered.filter((v) => v !== value)
            : [...filtered, value];
        setAnswers((prev) => ({ ...prev, [question.id]: updated }));
    };

    const handleNext = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep((prev) => prev + 1);
        } else {
            setIsAnalyzing(true);
            setTimeout(() => {
                setIsAnalyzing(false);
                setShowResults(true);
            }, 2500);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) setCurrentStep((prev) => prev - 1);
    };

    const canProceed = () => {
        const answer = answers[question.id];
        if (question.type === 'range') return true;
        if (question.type === 'input') return true;
        if (question.type === 'single') return !!answer;
        if (question.type === 'multi') return Array.isArray(answer) && answer.length > 0;
        return false;
    };

    /* ─── Analyzing State ─── */
    if (isAnalyzing) {
        return (
            <div className="min-h-screen bg-background-light flex items-center justify-center">
                <div className="text-center space-y-8 max-w-md px-6">
                    <div className="relative w-24 h-24 mx-auto">
                        <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
                        <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Icon name="biotech" className="text-primary text-3xl" />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-extrabold text-slate-900 mb-3">Analyzing Your Profile</h2>
                        <p className="text-slate-500">
                            Our AI is cross-referencing your answers with clinical longevity research to build
                            your personalized protocol...
                        </p>
                    </div>
                    <div className="flex justify-center gap-1">
                        {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                className="w-2 h-2 rounded-full bg-primary animate-pulse"
                                style={{ animationDelay: `${i * 200}ms` }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    /* ─── Results State ─── */
    if (showResults) {
        const recommended = getRecommendations(answers);
        const age = answers.age as number;
        const goals = (answers.goals as string[]) || [];

        return (
            <div className="min-h-screen bg-background-light">
                {/* Header */}
                <div className="bg-white border-b border-primary/10 py-5">
                    <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3 text-primary">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 48 48">
                                <path clipRule="evenodd" d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z" fill="currentColor" fillRule="evenodd" />
                            </svg>
                            <span className="text-lg font-extrabold tracking-tight">Pacific Naturals</span>
                        </Link>
                        <Link href="/products" className="text-sm font-bold text-primary hover:underline">
                            Browse All Products →
                        </Link>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto px-6 py-16">
                    {/* Score Card */}
                    <div className="bg-gradient-to-br from-primary to-primary-light rounded-2xl p-10 lg:p-16 text-white mb-16 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <Icon name="verified" className="text-2xl" />
                                <span className="text-xs font-bold uppercase tracking-widest text-white/70">
                                    Your Longevity Profile
                                </span>
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
                                Your Personalized<br />Wellness Protocol
                            </h1>
                            <p className="text-white/80 text-lg max-w-xl mb-8">
                                Based on your profile (age {age}, {goals.length} wellness goal{goals.length !== 1 ? 's' : ''}),
                                our AI has selected the optimal supplement stack for your longevity journey.
                            </p>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                                <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                                    <span className="text-3xl font-extrabold">{recommended.length}</span>
                                    <p className="text-xs text-white/70 mt-1">Supplements</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                                    <span className="text-3xl font-extrabold">{goals.length}</span>
                                    <p className="text-xs text-white/70 mt-1">Goals Targeted</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                                    <span className="text-3xl font-extrabold">98%</span>
                                    <p className="text-xs text-white/70 mt-1">Bio-Availability</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                                    <span className="text-3xl font-extrabold">
                                        {formatPrice(recommended.reduce((sum, p) => sum + p.price * 0.85, 0))}
                                    </span>
                                    <p className="text-xs text-white/70 mt-1">Monthly (Subscribe)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recommended Products */}
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Your Recommended Stack</h2>
                    <p className="text-slate-500 mb-10">Hand-picked for your biology, goals, and lifestyle.</p>

                    <div className="grid gap-6">
                        {recommended.map((product, idx) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-xl border border-slate-100 p-6 lg:p-8 flex flex-col sm:flex-row gap-6 items-start hover:shadow-xl transition-all"
                            >
                                <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-0">
                                    <div className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold flex-shrink-0">
                                        {idx + 1}
                                    </div>
                                    <div className="w-20 h-20 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 relative">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover"
                                            sizes="80px"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-lg text-slate-900">{product.name}</h3>
                                        <p className="text-sm text-slate-500 line-clamp-2">{product.description}</p>
                                        <div className="flex flex-wrap gap-1.5 mt-2">
                                            {product.tags.slice(0, 3).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-0.5 bg-primary/10 text-primary rounded text-[10px] font-bold"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 sm:flex-col sm:items-end flex-shrink-0">
                                    <span className="text-2xl font-extrabold text-primary">{formatPrice(product.price)}</span>
                                    <Link
                                        href={`/products/${product.slug}`}
                                        className="bg-primary text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 whitespace-nowrap"
                                    >
                                        View Product
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-16 text-center space-y-4">
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 bg-primary text-white px-10 py-4 rounded-lg font-bold text-lg shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all"
                        >
                            <Icon name="shopping_cart" />
                            Shop Your Protocol
                        </Link>
                        <p className="text-sm text-slate-400">
                            Or{' '}
                            <button
                                onClick={() => {
                                    setShowResults(false);
                                    setCurrentStep(0);
                                    setAnswers({ age: 35 });
                                }}
                                className="text-primary font-bold hover:underline"
                            >
                                retake the quiz
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    /* ─── Quiz Steps ─── */
    return (
        <div className="min-h-screen bg-background-light flex flex-col">
            {/* Header */}
            <div className="bg-white border-b border-primary/10 py-5">
                <div className="max-w-3xl mx-auto px-6 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 text-primary">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 48 48">
                            <path clipRule="evenodd" d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z" fill="currentColor" fillRule="evenodd" />
                        </svg>
                        <span className="text-lg font-extrabold tracking-tight">Pacific Naturals</span>
                    </Link>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        Step {currentStep + 1} of {totalSteps}
                    </span>
                </div>
            </div>

            {/* Progress bar */}
            <div className="bg-white">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Question area */}
            <div className="flex-1 flex items-center justify-center py-16">
                <div className="max-w-2xl mx-auto px-6 w-full">
                    <div className="mb-10">
                        <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-3">
                            {question.title}
                        </h1>
                        <p className="text-slate-500 text-lg">{question.subtitle}</p>
                    </div>

                    {/* ── Single select ── */}
                    {question.type === 'single' && question.options && (
                        <div className="grid gap-3">
                            {question.options.map((opt) => {
                                const selected = answers[question.id] === opt.value;
                                return (
                                    <button
                                        key={opt.value}
                                        onClick={() => handleSingle(opt.value)}
                                        className={`flex items-center gap-4 p-5 rounded-xl border-2 text-left transition-all ${selected
                                                ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                                                : 'border-slate-200 bg-white hover:border-primary/30 hover:shadow-md'
                                            }`}
                                    >
                                        {opt.icon && (
                                            <div
                                                className={`w-10 h-10 rounded-lg flex items-center justify-center ${selected ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
                                                    } transition-all`}
                                            >
                                                <Icon name={opt.icon} />
                                            </div>
                                        )}
                                        <span className="font-bold text-slate-800">{opt.label}</span>
                                        {selected && (
                                            <Icon name="check_circle" className="ml-auto text-primary text-xl" filled />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {/* ── Multi select ── */}
                    {question.type === 'multi' && question.options && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {question.options.map((opt) => {
                                const currentValues = (answers[question.id] as string[]) || [];
                                const selected = currentValues.includes(opt.value);
                                return (
                                    <button
                                        key={opt.value}
                                        onClick={() => handleMulti(opt.value)}
                                        className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${selected
                                                ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                                                : 'border-slate-200 bg-white hover:border-primary/30'
                                            }`}
                                    >
                                        {opt.icon && (
                                            <div
                                                className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm ${selected ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
                                                    } transition-all`}
                                            >
                                                <Icon name={opt.icon} />
                                            </div>
                                        )}
                                        <span className="font-semibold text-sm text-slate-800">{opt.label}</span>
                                        {selected && (
                                            <Icon name="check_circle" className="ml-auto text-primary text-lg" filled />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {/* ── Range slider ── */}
                    {question.type === 'range' && (
                        <div className="space-y-6">
                            <div className="text-center">
                                <span className="text-7xl font-extrabold text-primary">
                                    {(answers[question.id] as number) || question.min}
                                </span>
                                <span className="text-2xl text-slate-400 ml-2">{question.unit}</span>
                            </div>
                            <input
                                type="range"
                                min={question.min}
                                max={question.max}
                                value={(answers[question.id] as number) || question.min}
                                onChange={(e) =>
                                    setAnswers((prev) => ({ ...prev, [question.id]: parseInt(e.target.value) }))
                                }
                                className="w-full accent-primary h-2 cursor-pointer"
                            />
                            <div className="flex justify-between text-sm text-slate-400">
                                <span>{question.min} {question.unit}</span>
                                <span>{question.max} {question.unit}</span>
                            </div>
                        </div>
                    )}

                    {/* ── Text input ── */}
                    {question.type === 'input' && (
                        <textarea
                            value={(answers[question.id] as string) || ''}
                            onChange={(e) =>
                                setAnswers((prev) => ({ ...prev, [question.id]: e.target.value }))
                            }
                            placeholder={question.placeholder}
                            rows={4}
                            className="w-full px-6 py-4 rounded-xl border-2 border-slate-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none text-slate-800 placeholder:text-slate-400"
                        />
                    )}

                    {/* Navigation buttons */}
                    <div className="flex items-center justify-between mt-12">
                        <button
                            onClick={handleBack}
                            disabled={currentStep === 0}
                            className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-slate-600 hover:bg-white hover:shadow transition-all disabled:opacity-30 disabled:pointer-events-none"
                        >
                            <Icon name="arrow_back" />
                            Back
                        </button>

                        <button
                            onClick={handleNext}
                            disabled={!canProceed()}
                            className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-bold shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-40 disabled:pointer-events-none"
                        >
                            {currentStep === totalSteps - 1 ? 'Get My Protocol' : 'Continue'}
                            <Icon name={currentStep === totalSteps - 1 ? 'biotech' : 'arrow_forward'} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
