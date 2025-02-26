import { fetchChannelAPI, ChannelItem } from "@/apis/list" 
import { useEffect, useState } from "react"

const useTabs = () => {
    const [channelList, setChannelList] = useState<ChannelItem[]>([])

    useEffect(() => {
        async function fetchChnls() {
            try {
                const res = await fetchChannelAPI()
                setChannelList(res.data.data.channels)
            } catch {
                throw new Error('error: fetch channel list')
            }    
        }
        fetchChnls()
    }, [])

    return {channelList}
}

export { useTabs, }