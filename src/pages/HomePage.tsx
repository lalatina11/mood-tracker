import MoodChart from "@/components/Mood/MoodChart";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import type { Mood } from "@/types";
import { NavLink } from "react-router";

const HomePage = () => {
    const dummyMoods: Mood[] = Array.from({ length: 10 }).map((_, i) => ({
        id: i + 1,
        rate: Math.floor(Math.random() * 5) + 1,
        note: "",
        date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)),
    }))
    return (
        <div className="min-h-screen font-sans">
            <section className="py-20 md:py-32">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-center">
                        Discover Your Emotional Landscape
                    </h1>
                    <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto text-center">
                        Log your mood anonymously, see how others are feeling, and find comfort in shared experiences.
                    </p>
                    <div className="flex justify-center">
                        <NavLink to={"/mood"} className={"" + buttonVariants({ variant: "default" })}>
                            Start Tracking Your Mood
                        </NavLink>
                    </div>
                </div>
            </section>
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
                        Why Mood Tracker?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="flex flex-col items-center p-6">
                            <div className="text-5xl mb-4">🤫</div>
                            <CardTitle className="mb-2">Anonymous & Private</CardTitle>
                            <CardDescription>
                                Share your feelings without revealing your identity. Your privacy is our priority.
                            </CardDescription>
                        </Card>
                        <Card className="flex flex-col items-center p-6">
                            <div className="text-5xl mb-4">🌍</div>
                            <CardTitle className="mb-2">See Global Trends</CardTitle>
                            <CardDescription>
                                View a live bar chart of the community's moods to feel more connected.
                            </CardDescription>
                        </Card>
                        <Card className="flex flex-col items-center p-6">
                            <div className="text-5xl mb-4">📝</div>
                            <CardTitle className="mb-2">Simple & Quick</CardTitle>
                            <CardDescription>
                                Log your mood in seconds with a simple tap and an optional note.
                            </CardDescription>
                        </Card>
                    </div>
                </div>
            </section>
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
                        What Our Users Say
                    </h2>
                    <div className="space-y-8">
                        <Card className="relative p-8">
                            <p className="text-lg italic">
                                "I love this app! It's so comforting to see that others are going through similar things. The anonymity feature is a game-changer."
                            </p>
                            <div className="mt-4 text-right">
                                <p className="font-semibold">- A happy user</p>
                            </div>
                        </Card>
                        <Card className="relative p-8">
                            <p className="text-lg italic">
                                "The bar chart is a fantastic feature. It gives me a quick snapshot of the community's mood and makes me feel less alone."
                            </p>
                            <div className="mt-4 text-right">
                                <p className="font-semibold">- A thoughtful user</p>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>
            <section className="py-16 md:py-24 container mx-auto text-center">
                <MoodChart dummyMoods={dummyMoods} />
            </section>
            <section className="py-16 md:py-24 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Start?</h2>
                    <p className="text-lg mb-8">
                        Join the community and begin your journey to emotional awareness.
                    </p>
                    <NavLink to={"/mood"} className={"" + buttonVariants({ variant: "default" })}>
                        Get Started Now
                    </NavLink>
                </div>
            </section>
        </div>
    );
}

export default HomePage
