import { useMoodStore } from "@/lib/stores/zustands"
import SingleMood from "./SingleMood"

const Mood = () => {
    const { moods } = useMoodStore()
    const sortedMood = moods.sort((a, b) => {
        if (a.timestamp && b.timestamp) {
            return b.timestamp - a.timestamp
        } else {
            return a.id - b.id
        }
    })


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {sortedMood.length ?
                <>
                    {sortedMood.map(mood => (
                        <SingleMood key={mood.id} mood={mood} />
                    ))}
                    <span className="text-center col-span-1 md:col-span-2 lg:col-span-3 text-zinc-500 underline underline-offset-2">All the moods are loaded!</span>
                </>
                : <div className="col-span-3 text-center">There is No Mood add new one</div>}
        </div>
    )
}

export default Mood