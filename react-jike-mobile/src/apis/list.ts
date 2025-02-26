import { http } from "@/utils";

export type ResType<T> = {
    message: string,
    data: T
}

// ---------------------
// channels
// ---------------------

export type ChannelItem = {
    id: string,
    name: string
}

type ChannelList = {
    channels: ChannelItem[]
}

export function fetchChannelAPI() {
    return http.request < ResType < ChannelList >> ({
      url:'/channels'  
    })
}

// ---------------------
// articles
// ---------------------

type ArticleItem = {
    art_id: string,
    title: string,
    aut_id: string,
    comm_count: number,
    pubdate: string,
    aut_name: string,
    is_top: number,
    cover: {
        type: number,
        images: string[]
    }
}

export type ArticleRes = {
    results: ArticleItem[],
    pre_timestamp: string
}

type artParam = {
    channel_id: string,
    timestamp: string
}

export function fetchArticleAPI(params: artParam) {
    return http.request < ResType < ArticleRes >> ({
        url: '/articles',
        params
    })
}



