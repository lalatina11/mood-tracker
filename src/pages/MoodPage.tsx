import Mood from "@/components/Mood"
import MoodForm from "@/components/Mood/forms/AddMoodForm"
import MoodChart from "@/components/Mood/MoodChart"

const MoodPage = () => {

    return (
        <>
            <link rel="shortcut icon" href="logo.svg" type="image/x-icon" />
            <title>Mood Tracker App</title>
            <div className="flex flex-col p-4">
                <MoodForm />
                <MoodChart />
                <Mood />
            </div>
        </>
    )
}

export default MoodPage