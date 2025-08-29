import { formatDate, moodOption } from "@/lib";
import { emojiOption as emoji, emojiOption } from "@/lib/emoji";
import { useMoodStore } from "@/lib/stores/zustands";
import { Avatar } from "@radix-ui/react-avatar";
import { ChevronDownIcon } from "lucide-react";
import { useState, type FormEventHandler } from "react";
import { FaStar } from "react-icons/fa";
import { IoTrashBinSharp } from "react-icons/io5";
import { MdCancel, MdEdit } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { SlOptions } from "react-icons/sl";
import { toast } from "sonner";
import { format } from "timeago.js";
import { AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Textarea } from "../ui/textarea";
import type { Mood } from "@/types";

interface Props {
    mood: Mood
}
const SingleMood = (props: Props) => {
    const { mood } = props
    const { deleteMood, editMood } = useMoodStore()
    const [isOptionOpen, setIsOptionOpen] = useState(false)
    const [isEditFormOpen, setIsEditFormOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpenOpen] = useState(false)

    const handleDeleteMood = (id: number) => {
        deleteMood(id)
        toast.success("Success deleting mood!")
    }

    const [formState, setFormState] = useState({ value: { rate: mood.rate.toString(), date: mood.date, note: mood.note || "" }, state: { isLoading: false, isDatePickerOpen: false }, error: { rate: "", date: "" } })
    const handleEditMood: FormEventHandler<HTMLFormElement> = (e) => {
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
        const newMood: Mood = {
            ...formState.value,
            id: mood.id,
            rate: Number(formState.value.rate),
            timestamp: Date.now()
        }
        editMood(newMood)
        setFormState(prev => ({ ...prev, error: { ...prev.error, rate: "" }, value: { rate: mood.rate.toString(), note: mood.note || "", date: mood.date }, state: { ...prev.state, isLoading: false } }))
        toast.success("Success to edit this mood!")
        setIsEditFormOpen(false)
    }

    const switchDatePickerOpen = () => {
        return setFormState(prev => ({ ...prev, state: { ...prev.state, isDatePickerOpen: !prev.state.isDatePickerOpen } }))
    }

    const handleSelectrate = (opt: string) => {
        setFormState(prev => ({ ...prev, value: { ...prev.value, rate: opt } }))
    }

    return (
        <>
            <Card className="flex flex-col gap-3 justify-between p-2 md:p-4 md:py-6">
                <CardHeader className="p-0">
                    <CardTitle className="flex justify-between items-center gap-3">
                        <div className="flex gap-2 items-center">
                            <Avatar>
                                <AvatarFallback >
                                    <RxAvatar className="w-10 h-10" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-0.5">
                                <span className="flex gap-1"><span className="hidden md:block">From</span> Anonymous</span>
                                <span className="text-xs text-zinc-500 font-medium">{format(mood.timestamp || 0)}</span>
                            </div>
                        </div>
                        <DropdownMenu open={isOptionOpen} onOpenChange={setIsOptionOpen}>
                            <DropdownMenuTrigger><SlOptions onClick={() => setIsOptionOpen(true)} /></DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Mood Option</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => setIsEditFormOpen(true)} className="flex gap-3 items-center">
                                    <MdEdit />
                                    <span>Edit</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setIsDeleteDialogOpenOpen(true)} className="flex gap-3 items-center" variant="destructive">
                                    <IoTrashBinSharp />
                                    <span>Delete</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setIsOptionOpen(false)} className="flex gap-3 items-center">
                                    <MdCancel />
                                    <span>Cancel</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </CardTitle>
                </CardHeader>
                <div className="flex flex-col gap-3">
                    <span className="text-7xl text-center">
                        {emoji(mood.rate)?.emoji}
                    </span>
                    <div className="flex gap-2 items-center">
                        <CardTitle>Rate:</CardTitle>
                        <span>{mood.rate} of 5</span>
                    </div>
                </div>
                {mood.note &&
                    <div className="flex flex-col">
                        <Label>Note:</Label>
                        <Label className="text-sm flex gap-2 items-center">
                            <FaStar />
                            <span>{mood.note}</span>
                        </Label>
                    </div>
                }
                <span className="text-xs md:text-sm">Presenting on {formatDate(mood.date)}</span>
            </Card>
            <Dialog open={isEditFormOpen} onOpenChange={setIsEditFormOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Mood</DialogTitle>
                        <DialogDescription asChild>
                            <form onSubmit={handleEditMood} className="flex flex-col gap-5">
                                <div className="flex flex-col gap-2 w-full">
                                    <Label className="capitalize" >rate of your mood</Label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                                        {moodOption.map(opt => (
                                            <div onClick={() => handleSelectrate(opt.toString())} className={`transition-all ease-in-out duration-300 flex flex-col gap-1 items-center h-max cursor-pointer border border-zinc-500 rounded-md p-3 ${formState.value.rate === opt.toString() ? 'bg-primary text-accent' : ''}`} key={opt}>
                                                <span className="text-2xl md:text-5xl">{emojiOption(opt)?.emoji}</span>
                                                <span className="hidden md:block text-lg font-semibold mt-2">{opt} of 5</span>
                                                <span className="font-semibold capitalize">{emojiOption(opt)?.label}</span>
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
                                                className="w-full justify-between font-normal"
                                            >
                                                {formState.value.date ? formatDate(formState.value.date) : "Select date"}
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
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpenOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure want to delete this Mood?</DialogTitle>
                        <DialogDescription>
                            This Action is cannot be undone. This will permanently delete this Mood that post from anonymous
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant={"destructive"} onClick={() => handleDeleteMood(mood.id)}>Delete anyway</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default SingleMood