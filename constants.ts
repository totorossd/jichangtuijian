import { Provider, FilterType } from './types';

const COMMON_REVIEWS = [
  { user: "User_192", rating: 5, date: "2024-10-15", content: "速度真的很快，晚高峰看4K完全不卡，这钱花得值！" },
  { user: "CloudWalker", rating: 4, date: "2024-09-28", content: "稳定性不错，但是偶尔节点会维护，客服响应速度还可以。" },
  { user: "NetflixLover", rating: 5, date: "2024-11-02", content: "解锁奈飞非常丝滑，几乎所有节点都能看非自制剧。" },
];

export const PROVIDERS: Provider[] = [
  {
    id: 'longmao',
    name: '龙猫云 (Dragon Cat)',
    description: '高端全专线机场，主打稳定性与流媒体解锁。拥有自研隧道技术，晚高峰表现优异，适合对网络质量有极高要求的用户。',
    longDescription: '龙猫云是目前市面上稳定性第一梯队的机场服务商。它全线采用 IPLC 专线传输，不过墙，彻底解决了敏感时期被封锁的烦恼。对于需要频繁访问 Google、ChatGPT 以及观看 Netflix/Disney+ 4K 流媒体的高端用户来说，龙猫云提供了几乎零丢包的极致体验。虽然价格稍高于平均水平，但考虑到其提供的 SLA 99.9% 在线率保证，绝对物超所值。',
    tags: ['IPLC专线', '流媒体解锁', '低延迟'],
    badge: '热点推荐',
    rating: 4.9,
    startPrice: 15,
    speedScore: 98,
    stabilityScore: 99,
    logoUrl: 'https://picsum.photos/seed/longmao/100/100',
    features: ['全节点解锁 Netflix/Disney+', '不限制设备数量', 'SLA 99.9% 保证'],
    plans: [
      { name: "入门版", price: 15, period: "月付", traffic: "100G", features: ["IPLC专线", "流媒体解锁", "3个在线设备"] },
      { name: "标准版", price: 55, period: "月付", traffic: "500G", features: ["IPLC专线", "全节点解锁", "5个在线设备"] },
      { name: "至尊版", price: 99, period: "月付", traffic: "1000G", features: ["IPLC专线", "优先客服", "不限设备"] },
    ],
    reviews: COMMON_REVIEWS
  },
  {
    id: 'feimao',
    name: '肥猫云 (Fat Cat)',
    description: '性价比之选，线路丰富，能够满足各类流媒体和ChatGPT访问需求。拥有非常友好的新手教程和客服支持。',
    longDescription: '肥猫云主打“好用不贵”，是很多刚接触科学上网用户的首选。它提供了覆盖全球 20+ 个国家和地区的节点，无论是冷门地区 IP 需求，还是主流的港美日韩节点，都能轻松满足。肥猫云的客户端适配做得非常好，小白用户也能一键导入使用，无需复杂的配置。',
    tags: ['高性价比', '新手友好', '客服优'],
    badge: '热点推荐',
    rating: 4.7,
    startPrice: 20,
    speedScore: 92,
    stabilityScore: 94,
    logoUrl: 'https://picsum.photos/seed/feimao/100/100',
    features: ['4K 秒开', '多种订阅格式支持', '晚高峰速率保障'],
    plans: [
      { name: "小猫套餐", price: 20, period: "月付", traffic: "150G", features: ["中转线路", "流媒体解锁", "2个在线设备"] },
      { name: "大猫套餐", price: 35, period: "月付", traffic: "400G", features: ["高速中转", "全节点解锁", "5个在线设备"] },
    ],
    reviews: [
       { user: "Newbie001", rating: 5, date: "2024-10-20", content: "第一次买机场，客服手把手教我怎么设置，太感动了！" },
       ...COMMON_REVIEWS
    ]
  },
  {
    id: 'shanhu',
    name: '闪狐云 (Flash Fox)',
    description: '以速度著称，采用顶级 BGP 接入，不仅网页浏览飞快，下载大文件也能跑满带宽。',
    longDescription: '如果你的宽带是千兆网络，那么闪狐云绝对能跑满你的带宽。它接入了顶级运营商的 BGP 线路，并进行了深度的路由优化，确保数据包走最短路径。非常适合下载大文件、更新 Steam 游戏或者进行跨国数据传输。',
    tags: ['极速下载', 'BGP中转', '游戏加速'],
    rating: 4.6,
    startPrice: 25,
    speedScore: 96,
    stabilityScore: 90,
    logoUrl: 'https://picsum.photos/seed/shanhu/100/100',
    features: ['原生 IP 节点', '支持 UDP 转发', '游戏低延迟'],
    plans: [
      { name: "极速版", price: 25, period: "月付", traffic: "300G", features: ["BGP中转", "游戏优化", "3个在线设备"] },
      { name: "旗舰版", price: 45, period: "月付", traffic: "800G", features: ["BGP中转", "UDP全开", "5个在线设备"] },
    ],
    reviews: COMMON_REVIEWS
  },
  {
    id: 'xiaoxuanfeng',
    name: '小旋风 (Whirlwind)',
    description: '老牌平价机场，专注于提供稳定且廉价的服务。适合学生党和轻度用户，流量充裕。',
    tags: ['学生优惠', '大流量', '老牌'],
    rating: 4.5,
    startPrice: 15,
    speedScore: 88,
    stabilityScore: 92,
    logoUrl: 'https://picsum.photos/seed/xiaoxuanfeng/100/100',
    features: ['不限速', '月付低至一杯奶茶', '简单易用'],
    plans: [
      { name: "学生套餐", price: 15, period: "月付", traffic: "500G", features: ["基础线路", "部分解锁", "2个在线设备"] },
    ],
    reviews: COMMON_REVIEWS
  },
  {
    id: 'fastlink',
    name: 'FastLink',
    description: 'Anycast 全球加速技术，自动选择最优路径。节点分布极广，涵盖全球主流国家和冷门地区。',
    tags: ['Anycast', '全球覆盖', '抗封锁'],
    rating: 4.8,
    startPrice: 30,
    speedScore: 95,
    stabilityScore: 96,
    logoUrl: 'https://picsum.photos/seed/fastlink/100/100',
    features: ['智能分流', '企业级线路', '隐私保护'],
    plans: [
      { name: "基础版", price: 30, period: "月付", traffic: "200G", features: ["Anycast", "全球节点", "3个在线设备"] },
      { name: "专业版", price: 50, period: "月付", traffic: "500G", features: ["Anycast", "专线加速", "5个在线设备"] },
    ],
    reviews: COMMON_REVIEWS
  },
  {
    id: 'speedcat',
    name: 'SpeedCat',
    description: '正如其名，速度极快。采用 IEPL 内网专线，不仅快而且稳，特殊时期依然坚挺。',
    tags: ['IEPL专线', '特殊时期稳', '高速'],
    rating: 4.7,
    startPrice: 28,
    speedScore: 97,
    stabilityScore: 95,
    logoUrl: 'https://picsum.photos/seed/speedcat/100/100',
    features: ['无视敏感时期', '全平台客户端', '快速工单响应'],
    plans: [
      { name: "闪电版", price: 28, period: "月付", traffic: "250G", features: ["IEPL专线", "流媒体解锁", "3个在线设备"] },
    ],
    reviews: COMMON_REVIEWS
  },
  {
    id: 'feitianzhu',
    name: '飞天猪 (Flying Pig)',
    description: '名字可爱但实力强悍，主打便宜大碗，入门套餐流量给的非常足，适合视频重度依赖者。',
    tags: ['便宜大碗', '视频专用', '流量多'],
    rating: 4.4,
    startPrice: 12,
    speedScore: 85,
    stabilityScore: 88,
    logoUrl: 'https://picsum.photos/seed/feitianzhu/100/100',
    features: ['超大流量包', '注册即用', '多设备同时在线'],
    plans: [
      { name: "吃饱饱", price: 12, period: "月付", traffic: "1000G", features: ["直连/中转", "基础解锁", "5个在线设备"] },
    ],
    reviews: COMMON_REVIEWS
  },
  {
    id: 'qingyunti',
    name: '青云梯 (Cloud Ladder)',
    description: '中高端定位，线路质量非常扎实。不追求极致低价，而是追求极致的连接成功率。',
    tags: ['连接率高', '商务首选', '稳定'],
    rating: 4.8,
    startPrice: 40,
    speedScore: 93,
    stabilityScore: 98,
    logoUrl: 'https://picsum.photos/seed/qingyunti/100/100',
    features: ['商务级 SLA', '独享带宽选项', '多地中转'],
    plans: [
      { name: "商务版", price: 40, period: "月付", traffic: "300G", features: ["高SLA", "企业线路", "不限设备"] },
    ],
    reviews: COMMON_REVIEWS
  },
  {
    id: 'tntcloud',
    name: 'TNT Cloud',
    description: '爆发力强，瞬间连接速度快。拥有独特的隧道加密协议，安全性高，不易被识别。',
    tags: ['高安全', '加密隧道', '快速连接'],
    rating: 4.6,
    startPrice: 22,
    speedScore: 91,
    stabilityScore: 93,
    logoUrl: 'https://picsum.photos/seed/tntcloud/100/100',
    features: ['零日志记录', '自定义加密', '抗干扰强'],
    plans: [
      { name: "标准版", price: 22, period: "月付", traffic: "200G", features: ["加密隧道", "隐私保护", "3个在线设备"] },
    ],
    reviews: COMMON_REVIEWS
  },
  {
    id: 'feiniao',
    name: '飞鸟机场 (Flying Bird)',
    description: '运营多年的老牌机场，积累了良好的口碑。节点维护及时，很少出现大面积瘫痪的情况。',
    tags: ['口碑好', '运营久', '维护及时'],
    rating: 4.7,
    startPrice: 25,
    speedScore: 89,
    stabilityScore: 97,
    logoUrl: 'https://picsum.photos/seed/feiniao/100/100',
    features: ['老牌信誉', '节点丰富', '退款保证'],
    plans: [
      { name: "Pro版", price: 25, period: "月付", traffic: "300G", features: ["稳定中转", "流媒体支持", "3个在线设备"] },
    ],
    reviews: COMMON_REVIEWS
  },
  {
    id: 'yinhe',
    name: '银河云 (Galaxy)',
    description: '致力打造银河系最强连接。全线 IPLC/IEPL 专线，价格稍贵但体验绝对是顶级的。',
    tags: ['顶级体验', '全专线', '土豪首选'],
    rating: 4.9,
    startPrice: 50,
    speedScore: 99,
    stabilityScore: 99,
    logoUrl: 'https://picsum.photos/seed/yinhe/100/100',
    features: ['至尊VIP服务', '定制客户端', '专线直连'],
    plans: [
      { name: "银河版", price: 50, period: "月付", traffic: "500G", features: ["全线IEPL", "流媒体全解锁", "不限设备"] },
      { name: "宇宙版", price: 90, period: "月付", traffic: "1000G", features: ["全线IEPL", "专属客服", "不限设备"] },
    ],
    reviews: COMMON_REVIEWS
  },
  {
    id: 'kuku',
    name: '酷酷云 (KuKu Cloud)',
    description: '新晋高性价比混合线路机场，采用 IEPL 专线与优质中转节点混合负载，在保证核心应用体验的同时大幅降低了成本。',
    longDescription: '酷酷云是近期表现非常亮眼的“黑马”机场。它巧妙地结合了 IEPL 专线（用于游戏和敏感数据）和优质公网中转（用于流媒体和下载），实现了价格与体验的完美平衡。对于预算有限但又不想牺牲稳定性的用户来说，酷酷云是一个极佳的折中方案。其晚高峰表现稳定，且对冷门流媒体的解锁支持也相当不错。',
    tags: ['混合线路', '性价比黑马', '流媒体解锁'],
    rating: 4.6,
    startPrice: 15.9,
    speedScore: 91,
    stabilityScore: 92,
    logoUrl: 'https://picsum.photos/seed/kuku/100/100',
    features: ['IEPL+中转混合', '流媒体全解锁', '晚高峰不限速'],
    plans: [
      { name: "基础版", price: 15.9, period: "月付", traffic: "150G", features: ["混合线路", "流媒体解锁", "2个在线设备"] },
      { name: "进阶版", price: 29.9, period: "月付", traffic: "400G", features: ["优先IEPL", "全节点解锁", "4个在线设备"] },
    ],
    reviews: [
       { user: "Geek_007", rating: 5, date: "2024-11-10", content: "这价格能有专线真的是惊喜，打游戏延迟很低。" },
       ...COMMON_REVIEWS
    ]
  }
];

export const FILTER_OPTIONS = [
  { label: '全部显示', value: FilterType.ALL },
  { label: '超高性价比', value: FilterType.BUDGET },
  { label: '极致体验', value: FilterType.PREMIUM },
  { label: '流媒体解锁', value: FilterType.STREAMING },
];