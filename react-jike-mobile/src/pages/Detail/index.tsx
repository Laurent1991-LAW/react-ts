import { fetchDetailAPI, DetailRes } from '@/apis/detail'
import { NavBar } from 'antd-mobile'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Detail = () => {

    const [detail, setDetail] = useState<DetailRes | null>(null)

    const [searchParams] = useSearchParams()
    const id = searchParams.get('id')

    useEffect(() => {
        async function fetchDetail() {
            const res = await fetchDetailAPI(id!)
            setDetail(res.data.data)
        }
        fetchDetail()
    }, [])

    const navigate = useNavigate()
    const onBack = () => {
        navigate(-1)
    }

    // 数据未加载到:
    if (!detail) {
        return <div>loading...</div>
    }
    // 数据加载成功后:
    return (<div>
        <NavBar onBack={onBack}>
            {detail?.title}
        </NavBar>
        <div dangerouslySetInnerHTML={{__html: detail?.content, }}></div>
    </div>)
}

export default Detail