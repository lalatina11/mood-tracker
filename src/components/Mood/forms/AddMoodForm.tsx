import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { moodOption } from "@/lib"
import { emojiOption } from "@/lib/emoji"
import { useMoodStore } from "@/lib/stores/zustands"
import type { Mood as MoodType } from "@/types"
import { ChevronDownIcon, Info } from "lucide-react"
import { useState, type FormEventHandler } from "react"
import { toast } from "sonner"

const AddMoodForm = () => {
    const [formState, setFormState] = useState({ value: { rate: "", date: new Date(), note: "" }, state: { isLoading: false, isDatePickerOpen: false }, error: { rate: "", date: "" } })
    const { addMood } = useMoodStore()
    const handleAddMood: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        setFormState(prev => ({ ...prev, state: { ...prev.state, isLoading: true } }))
        const rate = Number(formState.value.rate)
        if (rate < 1 || rate > 5) {
            setFormState(prev => ({ ...prev, error: { ...prev.error, rate: "Please input the valid mood rate" }, state: { ...prev.state, isLoading: false } }))
            return toast.error("Failed to add mood!")
        }
        if (formState.value.date > new Date()) {
            setFormState(prev => ({ ...prev, error: { ...prev.error, date: "Please input the valid mood date" }, state: { ...prev.state, isLoading: false } }))
            return toast.error("Failed to add mood!")

        }
        const newMood: MoodType = {
            ...formState.value,
            id: Math.random(),
            rate: Number(formState.value.rate),
            timestamp: Date.now()
        }
        addMood(newMood)
        setFormState(prev => ({ error: { ...prev.error, rate: "" }, value: { rate: "", note: "", date: new Date() }, state: { ...prev.state, isLoading: false } }))
        toast.success("Success to add mood!")
    }

    const switchDatePickerOpen = () => {
        return setFormState(prev => ({ ...prev, state: { ...prev.state, isDatePickerOpen: !prev.state.isDatePickerOpen } }))
    }

    const handleSelectrate = (opt: string) => {
        setFormState(prev => ({ ...prev, value: { ...prev.value, rate: opt } }))
    }

    return (
        <div className="flex justify-center p-0 pb-10 md:p-10 md:px-10 lg:px-20">
            <Card className="w-full p-6">
                <CardHeader className="p-0">
                    <CardTitle className="font-bold flex gap-3 items-center">
                        <span>Add Your Mood</span>
                        <Tooltip>
                            <TooltipTrigger>
                                <Info size={20} />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Don't worry, you are anonymous here</p>
                            </TooltipContent>
                        </Tooltip>
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                        Add your mood below, don't be shy to share how you feel
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleAddMood} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2 w-full">
                        <Label className="capitalize" >rate of your mood</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                            {moodOption.map(opt => (
                                <div onClick={() => handleSelectrate(opt.toString())} className={`transition-all ease-in-out duration-300 flex flex-col gap-1 items-center h-max cursor-pointer border border-zinc-500 rounded-md p-3 ${formState.value.rate === opt.toString() ? 'bg-primary text-accent' : ''}`} key={opt}>
                                    <span className="text-5xl">{emojiOption(opt)?.emoji}</span>
                                    <span className="text-lg font-semibold mt-2">{opt} of 5</span>
                                    <span className="text-lg font-semibold capitalize">{emojiOption(opt)?.label}</span>
                                </div>
                            ))}
                        </div>
                        {formState.error.rate && <span className="text-destructive text-sm text-center">{formState.error.rate}</span>}
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="date" className="px-1 capitalize">date of your mood</Label>
                        <Popover open={formState.state.isDatePickerOpen} onOpenChange={switchDatePickerOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    disabled={formState.state.isLoading}
                                    variant="outline"
                                    id="date"
                                    className="w-48 justify-between font-normal"
                                >
                                    {formState.value.date ? formState.value.date.toLocaleDateString() : "Select date"}
                                    <ChevronDownIcon />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={formState.value.date}
                                    captionLayout="dropdown"
                                    onSelect={(date) => {
                                        if (date) {
                                            setFormState(prev => ({ ...prev, value: { ...prev.value, date } }))
                                            switchDatePickerOpen()
                                        }
                                    }}
                                    disabled={(date) => date > new Date()}
                                />
                            </PopoverContent>
                        </Popover>
                        {formState.error.date && <span className="text-destructive text-sm text-center">{formState.error.date}</span>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label className="capitalize" htmlFor="note">write a note here</Label>
                        <Textarea className="ring ring-zinc-500" disabled={formState.state.isLoading} onChange={(e) => setFormState(prev => ({ ...prev, value: { ...prev.value, note: e.target.value } }))} name="note" id="note" value={formState.value.note} />
                    </div>
                    {formState.value.rate &&
                        <Button disabled={formState.state.isLoading}>
                            {formState.state.isLoading ?
                                <div className="flex gap-2 items-center">
                                    <span className="">Loading...</span>
                                    <div role="status">
                                        <svg aria-hidden="true" className="w-8 h-8 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                    </div>
                                </div>
                                : 'Post Your Mod Now!'}
                        </Button>
                    }
                </form>
            </Card>
        </div>
    )
}

export default AddMoodForm