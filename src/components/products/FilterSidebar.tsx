'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { WELLNESS_GOALS, CATEGORIES } from '@/data/siteConfig';

interface FilterSidebarProps {
    className?: string;
}

export function FilterSidebar({ className }: FilterSidebarProps) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

    const toggleGoal = (goal: string) => {
        setSelectedGoals((prev) =>
            prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
        );
    };

    return (
        <aside className={className}>
            {/* Categories */}
            <div className="mb-8">
                <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Category</h3>
                <div className="space-y-2">
                    {CATEGORIES.map((cat) => (
                        <label
                            key={cat}
                            className="flex items-center gap-3 cursor-pointer group"
                        >
                            <input
                                type="radio"
                                name="category"
                                checked={selectedCategory === cat}
                                onChange={() =>
                                    setSelectedCategory(selectedCategory === cat ? null : cat)
                                }
                                className="appearance-none w-4 h-4 rounded border-2 border-slate-300 checked:bg-primary checked:border-primary transition-all"
                            />
                            <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                                {cat}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Wellness goals */}
            <div className="mb-8">
                <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">
                    Wellness Goal
                </h3>
                <div className="flex flex-wrap gap-2">
                    {WELLNESS_GOALS.map((goal) => (
                        <button
                            key={goal}
                            onClick={() => toggleGoal(goal)}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${selectedGoals.includes(goal)
                                    ? 'bg-primary text-white'
                                    : 'bg-primary/10 text-primary hover:bg-primary/20'
                                }`}
                        >
                            {goal}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price range */}
            <div className="mb-8">
                <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">
                    Price Range
                </h3>
                <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="70"
                    className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-2">
                    <span>€0</span>
                    <span>€100+</span>
                </div>
            </div>

            {/* Rating */}
            <div className="mb-8">
                <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">
                    Minimum Rating
                </h3>
                <div className="flex gap-1 text-amber-400 cursor-pointer">
                    {Array.from({ length: 5 }, (_, i) => (
                        <Icon key={i} name="star" filled className="text-xl" />
                    ))}
                </div>
            </div>
        </aside>
    );
}
