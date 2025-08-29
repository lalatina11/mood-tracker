import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { useMoodStore } from "@/lib/stores/zustands"
import type { Mood } from "@/types"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

const chartConfig = {
    rate: {
        label: "Mood Rate",
        color: "--primary",
    },
}

const MoodChart = ({ dummyMoods }: { dummyMoods?: Mood[] }) => {
    const { moods } = useMoodStore()
    const chartData = dummyMoods ? dummyMoods.map((item) => ({
        date: new Date(item.date).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
        }),
        rate: Number(item.rate),
        description: item.note,
    })) : moods.map((item) => ({
        date: new Date(item.date).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
        }),
        rate: Number(item.rate),
        description: item.note,
    }))

    if (!dummyMoods?.length && !moods.length) return null

    return (
        <Card className="w-full mb-10">
            <CardHeader>
                <CardTitle>Mood Rate Over Time</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            className="text-muted-foreground"
                        />
                        <YAxis
                            domain={[0, 5]}
                            ticks={[0, 1, 2, 3, 4, 5]}
                            tickLine={false}
                            axisLine={false}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="rate" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default MoodChart
