import { Image, List, InfiniteScroll } from 'antd-mobile'
import { useEffect, useState } from 'react'

import { fetchArticleAPI, ArticleRes } from "@/apis/list"
import { useNavigate } from 'react-router-dom'


type Props = {
  channelId: string
}

const HomeList = (props: Props) => {

  const { channelId } = props

  const [artRes, setArtRes] = useState<ArticleRes>({
    results: [],
    pre_timestamp: '' + new Date().getTime()
  })

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetchArticleAPI({
          channel_id: channelId,
          timestamp: '' + new Date().getTime()
        })
        setArtRes({
          results: res.data.data.results,
          pre_timestamp: res.data.data.pre_timestamp
        })
      } catch (error) {
        throw new Error('error: fetch articles list')
      }
    }

    fetchArticles()

  }, [channelId])

  const [hasMore, setHasMore] = useState(true)

  const loadMore = async () => {
    try {
      const res = await fetchArticleAPI({
        channel_id: channelId,
        timestamp: artRes.pre_timestamp
      })
      setArtRes({
        results: [...artRes.results, ...res.data.data.results],
        pre_timestamp: res.data.data.pre_timestamp
      })
      if (res.data.data.results.length === 0) setHasMore(false)
    } catch (error) {
      throw new Error('error: fetch articles list')
    }
  }

  const navigate = useNavigate()
  const goToDetail = (id: string) => {
    navigate(`/detail?id=${id}`)
  }

return (
  <>
    <List>
      {artRes.results.map((item) => (
        <List.Item
          onClick={() => goToDetail(item.art_id) }
          key={item.art_id}
          prefix={
            <Image
              src={item.cover.images?.[0]}
              style={{ borderRadius: 20 }}
              fit="cover"
              width={40}
              height={40}
            />
          }
          description={item.pubdate}
        >
          {item.title}
        </List.Item>
      ))}
    </List>
    <InfiniteScroll loadMore={loadMore} hasMore={hasMore} threshold={1} />
  </>
)
}

export default HomeList