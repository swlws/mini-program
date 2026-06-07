import { useEffect, useState } from 'react'
import { Image, Text, Textarea, View } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'

import { getTicketDetail, submitEvaluation } from '@/services/repair'
import type { TicketDetail, TicketStatus } from '@/types/repair'

import './index.scss'

const STATUS_COLOR_MAP: Record<TicketStatus, string> = {
  repairing: '#ff934d',
  in_progress: '#e9534d',
  completed: '#2b6cff'
}

export default function TicketDetailPage() {
  const router = useRouter()
  const ticketId = Number(router.params.id) || 0
  const pageMode = router.params.mode

  const [ticketData, setTicketData] = useState<TicketDetail | null>(null)
  const [rating, setRating] = useState({
    overall: 0,
    efficiency: 0,
    attitude: 0
  })
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [evaluationSubmitted, setEvaluationSubmitted] = useState(false)

  useEffect(() => {
    if (!ticketId) return

    getTicketDetail(ticketId).then((detail) => {
      setTicketData(detail)

      if (pageMode === 'evaluate' && detail.canEvaluate) {
        setTimeout(() => {
          Taro.pageScrollTo({
            selector: '#ticket-detail-evaluation',
            duration: 280
          })
        }, 120)
      }
    }).catch(() => {
      Taro.showToast({ title: '工单详情加载失败', icon: 'none' })
    })
  }, [pageMode, ticketId])

  const handleStarClick = (type: 'overall' | 'efficiency' | 'attitude', value: number) => {
    if (evaluationSubmitted) return

    setRating((prev) => ({ ...prev, [type]: value }))
  }

  const handlePreviewImage = (current: string) => {
    if (!ticketData?.images.length) return

    Taro.previewImage({
      current,
      urls: ticketData.images
    })
  }

  const handleSubmitEvaluation = async () => {
    if (!ticketData || evaluationSubmitted) return

    if (!rating.overall || !rating.efficiency || !rating.attitude) {
      Taro.showToast({ title: '请完成星级评分', icon: 'none' })
      return
    }

    setSubmitting(true)

    try {
      await submitEvaluation({
        ticketId,
        overall: rating.overall,
        efficiency: rating.efficiency,
        attitude: rating.attitude,
        comment: comment.trim()
      })

      setEvaluationSubmitted(true)
      Taro.showToast({
        title: '评价提交成功',
        icon: 'success'
      })
    } catch {
      Taro.showToast({
        title: '评价提交失败',
        icon: 'none'
      })
    } finally {
      setSubmitting(false)
    }
  }

  const renderStars = (type: 'overall' | 'efficiency' | 'attitude', value: number) =>
    Array.from({ length: 5 }, (_, index) => {
      const active = index < value
      return (
        <Text
          key={`${type}-${index}`}
          className={`ticket-detail-page__star ${active ? 'is-active' : ''} ${evaluationSubmitted ? 'is-disabled' : ''}`}
          onClick={() => handleStarClick(type, index + 1)}
        >
          ★
        </Text>
      )
    })

  const renderInfoRow = (label: string, value?: string, multiline = false) => (
    <View className={`ticket-detail-page__info-row ${multiline ? 'is-multiline' : ''}`}>
      <Text className='ticket-detail-page__info-label'>{label}</Text>
      <Text className={`ticket-detail-page__info-value ${multiline ? 'is-multiline' : ''}`}>
        {value || '--'}
      </Text>
    </View>
  )

  if (!ticketData) {
    return (
      <View className='ticket-detail-page'>
        <View className='ticket-detail-page__loading'>加载中...</View>
      </View>
    )
  }

  const statusColor = STATUS_COLOR_MAP[ticketData.status]

  return (
    <View className='ticket-detail-page'>
      <View className='ticket-detail-page__card'>
        <View className='ticket-detail-page__header'>
          <Text className='ticket-detail-page__number'>报修单编号：{ticketData.number}</Text>
          <View className='ticket-detail-page__status' style={{ color: statusColor }}>
            <Text className='ticket-detail-page__status-dot'>●</Text>
            <Text>{ticketData.statusText}</Text>
          </View>
        </View>

        <View className='ticket-detail-page__section'>
          <View className='ticket-detail-page__section-title'>设备信息</View>
          {renderInfoRow('设备编号：', ticketData.deviceCode)}
          {renderInfoRow('设备名称：', ticketData.deviceName)}
          {renderInfoRow('设备型号：', ticketData.deviceModel)}
          {renderInfoRow('出厂日期：', ticketData.productionDate)}
          {renderInfoRow('质保解释时间：', ticketData.warrantyEndDate)}
        </View>

        <View className='ticket-detail-page__section'>
          <View className='ticket-detail-page__section-title'>报修信息</View>
          {renderInfoRow('报修人：', ticketData.repairPerson)}
          {renderInfoRow('联系电话：', ticketData.phone)}
          {renderInfoRow('期望维修时间：', ticketData.expectTime)}
          {renderInfoRow('维修地址：', ticketData.address, true)}
        </View>

        <View className='ticket-detail-page__section'>
          <View className='ticket-detail-page__section-title'>故障类型</View>
          <View className='ticket-detail-page__fault-tags'>
            <View className='ticket-detail-page__fault-tag'>{ticketData.faultType}</View>
          </View>
        </View>

        <View className='ticket-detail-page__section'>
          <View className='ticket-detail-page__section-title'>故障描述</View>
          <Text className='ticket-detail-page__description'>{ticketData.description}</Text>
        </View>

        <View className='ticket-detail-page__section ticket-detail-page__section--images'>
          <View className='ticket-detail-page__section-title'>图片/视频</View>
          <View className='ticket-detail-page__image-grid'>
            {ticketData.images.map((image, index) => (
              <Image
                key={image + index}
                className='ticket-detail-page__image-item'
                src={image}
                mode='aspectFill'
                onClick={() => handlePreviewImage(image)}
              />
            ))}
          </View>
        </View>
      </View>

      {ticketData.repairInfo && (
        <View className='ticket-detail-page__card'>
          <View className='ticket-detail-page__section-title'>维修信息</View>
          {renderInfoRow('维修时间：', ticketData.repairInfo.repairTime)}
          {renderInfoRow('维修师傅：', ticketData.repairInfo.repairPerson)}
        </View>
      )}

      {ticketData.canEvaluate && (
        <View id='ticket-detail-evaluation' className='ticket-detail-page__card'>
          <View className='ticket-detail-page__section-title'>满意度评价</View>

          <View className='ticket-detail-page__rating-row'>
            <Text className='ticket-detail-page__rating-label'>总体满意度:</Text>
            <View className='ticket-detail-page__stars'>{renderStars('overall', rating.overall)}</View>
          </View>

          <View className='ticket-detail-page__rating-row'>
            <Text className='ticket-detail-page__rating-label'>维修效率:</Text>
            <View className='ticket-detail-page__stars'>{renderStars('efficiency', rating.efficiency)}</View>
          </View>

          <View className='ticket-detail-page__rating-row'>
            <Text className='ticket-detail-page__rating-label'>服务态度:</Text>
            <View className='ticket-detail-page__stars'>{renderStars('attitude', rating.attitude)}</View>
          </View>

          <View className='ticket-detail-page__comment-box'>
            <Textarea
              className='ticket-detail-page__comment-input'
              placeholder='请输入评价描述(非必填):'
              placeholderClass='ticket-detail-page__placeholder'
              maxlength={200}
              disabled={evaluationSubmitted}
              value={comment}
              onInput={(e) => setComment(e.detail.value)}
            />
            <Text className='ticket-detail-page__comment-count'>{comment.length}/200</Text>
          </View>

          <View
            className={`ticket-detail-page__submit-btn ${submitting || evaluationSubmitted ? 'is-disabled' : ''}`}
            onClick={handleSubmitEvaluation}
          >
            <Text>{evaluationSubmitted ? '已提交评价' : submitting ? '提交中...' : '提交评价'}</Text>
          </View>
        </View>
      )}
    </View>
  )
}
