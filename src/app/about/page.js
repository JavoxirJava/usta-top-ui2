import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata = {
    title: 'About Us',
    description: 'Learn about ServiceHub - connecting homeowners with trusted service professionals.',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-cream-50 to-white">
            {/* Hero */}
            <section className="bg-gradient-to-b from-charcoal-950 to-charcoal-900 text-white py-20">
                <div className="container-wide text-center">
                    <h1 className="font-display text-display-md md:text-display-lg mb-6">
                        About ServiceHub
                    </h1>
                    <p className="text-xl text-charcoal-300 max-w-2xl mx-auto">
                        We're on a mission to connect homeowners with trusted, verified professionals
                        for all their home service needs.
                    </p>
                </div>
            </section>

            {/* Our Story */}
            <section className="section">
                <div className="container-wide">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-primary-600 font-medium mb-4 block">Our Story</span>
                            <h2 className="font-display text-display-sm text-charcoal-950 mb-6">
                                Built for homeowners, by homeowners
                            </h2>
                            <p className="text-charcoal-600 mb-4 leading-relaxed">
                                ServiceHub was founded with a simple idea: finding reliable home service
                                professionals shouldn't be a hassle. We've all experienced the frustration
                                of searching for a trustworthy plumber, electrician, or cleaner.
                            </p>
                            <p className="text-charcoal-600 mb-4 leading-relaxed">
                                That's why we built a platform that verifies every professional, showcases
                                their work through portfolios, and lets you read honest reviews from real customers.
                            </p>
                            <p className="text-charcoal-600 leading-relaxed">
                                Today, we've helped thousands of homeowners connect with skilled professionals
                                in their area, making home improvement and maintenance easier than ever.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-primary-100 to-sage-100 rounded-3xl p-8 aspect-square flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-6xl mb-4">🏠</div>
                                <p className="font-display text-2xl text-charcoal-900">Since 2020</p>
                                <p className="text-charcoal-600">Serving communities nationwide</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 bg-charcoal-950">
                <div className="container-wide">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { value: '50K+', label: 'Jobs Completed' },
                            { value: '10K+', label: 'Verified Pros' },
                            { value: '4.9', label: 'Average Rating' },
                            { value: '98%', label: 'Satisfaction Rate' },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <p className="font-display text-4xl md:text-5xl font-bold text-primary-400 mb-2">
                                    {stat.value}
                                </p>
                                <p className="text-charcoal-400">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section">
                <div className="container-wide">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-sage-600 font-medium mb-4 block">Our Values</span>
                        <h2 className="font-display text-display-sm text-charcoal-950">
                            What drives us every day
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: '🛡️',
                                title: 'Trust & Safety',
                                description: 'Every professional is background-checked and verified. Your safety is our top priority.',
                            },
                            {
                                icon: '⭐',
                                title: 'Quality First',
                                description: 'We maintain high standards for all professionals on our platform through reviews and ratings.',
                            },
                            {
                                icon: '🤝',
                                title: 'Community',
                                description: 'We believe in building lasting relationships between homeowners and local professionals.',
                            },
                        ].map((value) => (
                            <div key={value.title} className="bg-white rounded-3xl p-8 shadow-soft border border-charcoal-100/50 text-center">
                                <div className="text-5xl mb-4">{value.icon}</div>
                                <h3 className="font-display text-xl font-semibold text-charcoal-900 mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-charcoal-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section bg-gradient-to-br from-primary-50 to-sage-50">
                <div className="container-wide text-center">
                    <h2 className="font-display text-display-sm text-charcoal-950 mb-6">
                        Ready to get started?
                    </h2>
                    <p className="text-xl text-charcoal-600 mb-8 max-w-xl mx-auto">
                        Join thousands of satisfied customers who found their perfect service professional.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/categories">
                            <Button size="lg">Find a Professional</Button>
                        </Link>
                        <Link href="/auth/register?role=master">
                            <Button size="lg" variant="outline">Become a Pro</Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}