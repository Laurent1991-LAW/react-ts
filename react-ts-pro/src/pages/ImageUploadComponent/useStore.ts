import { create } from 'zustand';

type ReportStore = {
    idOnEdit: string
    setIdOnEdit: (id: string) => void
    noteLst: Array<Types.Note>
    setNoteLst: (noteLst: Array<Types.Note>) => void
}

export const useStore = create<ReportStore>((set) => ({
    idOnEdit: '',
    setIdOnEdit: (id) => set({ idOnEdit: id }),
    noteLst: [],
    setNoteLst: (noteLst) => set({ noteLst: noteLst })
}));