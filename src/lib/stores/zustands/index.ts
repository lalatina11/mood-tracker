import type { Mood } from "@/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export type UserMoodStore = {
    moods: Mood[]
    // getMoods: () => void
    // getMoodById: (id: number) => void
    addMood: (mood: Mood) => void
    editMood: (mood: Mood) => void
    deleteMood: (id: number) => void
}

export const useMoodStore = create(persist<UserMoodStore>((set) => ({
    moods: [],
    addMood: (newMood: Mood) => set((prev) => ({ moods: [...prev.moods, newMood] })),
    editMood: (updatedMood: Mood) => set((prev) => ({ moods: prev.moods.map(md => md.id === updatedMood.id ? updatedMood : md) })),
    deleteMood: (id: number) => set((prev) => ({ moods: prev.moods.filter(past => past.id !== id) })),
}), { name: "moods" }))