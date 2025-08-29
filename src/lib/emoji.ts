export const emojiOption = (option: number) => {
    if (option === 1) return { emoji: '😡', label: 'very bad' }
    if (option === 2) return { emoji: '😞', label: 'bad' }
    if (option === 3) return { emoji: '😐', label: 'okay' }
    if (option === 4) return { emoji: '🙂', label: 'good' }
    if (option === 5) return { emoji: '🥰', label: 'very good' }
}