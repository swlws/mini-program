import type {
  EvaluationParams,
  FaultType,
  RepairDevice,
  RepairSubmitParams,
  Ticket,
  TicketDetail
} from '@/types/repair'

const mockFaultTypes: FaultType[] = [
  { id: 1, label: '视觉昏暗、亮度不足' },
  { id: 2, label: '重影、像散、色彩畸变' },
  { id: 3, label: '调焦故障' },
  { id: 4, label: '载物台故障' },
  { id: 5, label: '灯光闪烁忽明忽暗' },
  { id: 6, label: '其他' }
]

const mockRepairDevices: RepairDevice[] = [
  {
    id: 1,
    name: 'VMS系列手动影像测量仪',
    code: 'WH00000001',
    model: 'VMS-3020',
    productionDate: '2025年6月30日',
    warrantyEndDate: '2028年6月30日'
  },
  {
    id: 2,
    name: '全自动三坐标测量仪',
    code: 'WH00000002',
    model: 'CMM-8106',
    productionDate: '2024年3月15日',
    warrantyEndDate: '2027年3月15日'
  }
]

const mockImages = [
  'https://picsum.photos/seed/repair-1/240/240',
  'https://picsum.photos/seed/repair-2/240/240',
  'https://picsum.photos/seed/repair-3/240/240',
  'https://picsum.photos/seed/repair-4/240/240',
  'https://picsum.photos/seed/repair-5/240/240'
]

const mockTickets: Ticket[] = [
  {
    id: 3,
    number: 'NO000003',
    status: 'repairing',
    statusText: '报修中',
    deviceName: 'VMS系列手动影像测量仪',
    deviceCode: 'WH00000001',
    deviceModel: 'VMS-3020',
    repairTime: '2025年6月30日 12:23:12',
    faultType: '视觉昏暗、亮度不足',
    description: '显微镜在使用过程中反复出现视觉昏暗，亮度不足',
    canEvaluate: false
  },
  {
    id: 2,
    number: 'NO000002',
    status: 'in_progress',
    statusText: '维修中',
    deviceName: 'VMS系列手动影像测量仪',
    deviceCode: 'WH00000001',
    deviceModel: 'VMS-3020',
    repairTime: '2025年6月30日 12:23:12',
    faultType: '视觉昏暗、亮度不足',
    description: '显微镜在使用过程中反复出现视觉昏暗，亮度不足',
    canEvaluate: true
  },
  {
    id: 1,
    number: 'NO000001',
    status: 'completed',
    statusText: '已完成',
    deviceName: 'VMS系列手动影像测量仪',
    deviceCode: 'WH00000001',
    deviceModel: 'VMS-3020',
    repairTime: '2025年6月30日 12:23:12',
    faultType: '视觉昏暗、亮度不足',
    description: '显微镜在使用过程中反复出现视觉昏暗，亮度不足',
    canEvaluate: true
  },
  {
    id: 4,
    number: 'NO000004',
    status: 'completed',
    statusText: '已完成',
    deviceName: 'VMS系列手动影像测量仪',
    deviceCode: 'WH00000001',
    deviceModel: 'VMS-3020',
    repairTime: '2025年6月30日 12:23:12',
    faultType: '视觉昏暗、亮度不足',
    description: '显微镜在使用过程中反复出现视觉昏暗，亮度不足',
    canEvaluate: false
  }
]

const mockTicketDetails: Record<number, TicketDetail> = {
  1: {
    id: 1,
    number: 'NO000001',
    status: 'completed',
    statusText: '已完成',
    deviceName: 'VMS系列手动影像测量仪',
    deviceCode: 'WH00000001',
    deviceModel: 'VMS-3020',
    productionDate: '2025年6月30日',
    warrantyEndDate: '2028年6月30日',
    repairPerson: '张三',
    phone: '18300231896',
    expectTime: '2026年6月05日',
    address: '湖北省武汉市东湖高新技术开发区清风路8号天琪集团3号厂房3楼',
    faultType: '视觉昏暗、亮度不足',
    description: '这是一段故障描述文字这是一段故障描述文字这是一段故障描述文字这是一段故障描述文字这是一段故障描述文字这是一段故障描述文字；',
    images: mockImages,
    repairInfo: {
      repairTime: '2026年6月04日 13:23:56',
      repairPerson: '李四'
    },
    canEvaluate: true
  },
  2: {
    id: 2,
    number: 'NO000002',
    status: 'in_progress',
    statusText: '维修中',
    deviceName: 'VMS系列手动影像测量仪',
    deviceCode: 'WH00000001',
    deviceModel: 'VMS-3020',
    productionDate: '2025年6月30日',
    warrantyEndDate: '2028年6月30日',
    repairPerson: '张三',
    phone: '18300231896',
    expectTime: '2026年6月05日',
    address: '湖北省武汉市东湖高新技术开发区清风路8号天琪集团3号厂房3楼',
    faultType: '视觉昏暗、亮度不足',
    description: '这是一段故障描述文字这是一段故障描述文字这是一段故障描述文字这是一段故障描述文字这是一段故障描述文字这是一段故障描述文字；',
    images: mockImages,
    repairInfo: {
      repairTime: '2026年6月04日 13:23:56',
      repairPerson: '李四'
    },
    canEvaluate: true
  },
  3: {
    id: 3,
    number: 'NO000003',
    status: 'repairing',
    statusText: '报修中',
    deviceName: 'VMS系列手动影像测量仪',
    deviceCode: 'WH00000001',
    deviceModel: 'VMS-3020',
    productionDate: '2025年6月30日',
    warrantyEndDate: '2028年6月30日',
    repairPerson: '张三',
    phone: '18300231896',
    expectTime: '2026年6月05日',
    address: '湖北省武汉市东湖高新技术开发区清风路8号天琪集团3号厂房3楼',
    faultType: '视觉昏暗、亮度不足',
    description: '这是一段故障描述文字这是一段故障描述文字这是一段故障描述文字这是一段故障描述文字这是一段故障描述文字这是一段故障描述文字；',
    images: mockImages,
    canEvaluate: false
  },
  4: {
    id: 4,
    number: 'NO000004',
    status: 'completed',
    statusText: '已完成',
    deviceName: 'VMS系列手动影像测量仪',
    deviceCode: 'WH00000001',
    deviceModel: 'VMS-3020',
    productionDate: '2025年6月30日',
    warrantyEndDate: '2028年6月30日',
    repairPerson: '张三',
    phone: '18300231896',
    expectTime: '2026年6月05日',
    address: '湖北省武汉市东湖高新技术开发区清风路8号天琪集团3号厂房3楼',
    faultType: '视觉昏暗、亮度不足',
    description: '这是一段故障描述文字这是一段故障描述文字这是一段故障描述文字这是一段故障描述文字这是一段故障描述文字这是一段故障描述文字；',
    images: mockImages,
    repairInfo: {
      repairTime: '2026年6月04日 13:23:56',
      repairPerson: '李四'
    },
    canEvaluate: false
  }
}

export function mockGetFaultTypes(): Promise<FaultType[]> {
  console.info('[RepairServiceMock] Returning mock fault types.')
  return Promise.resolve(mockFaultTypes)
}

export function mockGetRepairDevices(): Promise<RepairDevice[]> {
  console.info('[RepairServiceMock] Returning mock repair devices.')
  return Promise.resolve(mockRepairDevices)
}

export function mockGetTicketList(): Promise<Ticket[]> {
  console.info('[RepairServiceMock] Returning mock ticket list.')
  return Promise.resolve(mockTickets)
}

export function mockGetTicketDetail(id: number): Promise<TicketDetail> {
  console.info('[RepairServiceMock] Returning mock ticket detail.')
  return Promise.resolve(mockTicketDetails[id] || mockTicketDetails[3])
}

export function mockSubmitRepair(_params: RepairSubmitParams): Promise<{ ticketId: number }> {
  console.info('[RepairServiceMock] Mock repair submitted.')
  return Promise.resolve({ ticketId: Date.now() })
}

export function mockSubmitEvaluation(_params: EvaluationParams): Promise<void> {
  console.info('[RepairServiceMock] Mock evaluation submitted.')
  return Promise.resolve()
}
