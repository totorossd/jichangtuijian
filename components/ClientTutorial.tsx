import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

type PlatformKey = 'windows' | 'mac' | 'android' | 'ios';

interface TutorialStep {
  title: string;
  content: React.ReactNode;
  imagePlaceholder?: string; // Using placeholders for now, easy to swap with real assets
  tips?: string;
}

interface TutorialData {
  title: string;
  software: string;
  description: string;
  icon: string;
  downloadLinks: { label: string; url: string; primary?: boolean }[];
  steps: TutorialStep[];
  faq: { question: string; answer: string }[];
}

const TUTORIALS: Record<PlatformKey, TutorialData> = {
  windows: {
    title: "Windows 客户端配置教程",
    software: "Clash Verge Rev",
    description: "Clash Verge Rev 是目前 Windows 平台上体验最好、界面最现代化的代理软件，支持 Clash Meta 内核，性能强大且开源免费。",
    icon: "https://api.iconify.design/logos:microsoft-windows-icon.svg",
    downloadLinks: [
      { label: "Github 官方下载 (推荐)", url: "https://github.com/clash-verge-rev/clash-verge-rev/releases", primary: true },
      { label: "备用下载地址", url: "#", primary: false }
    ],
    steps: [
      {
        title: "下载与安装",
        content: "访问上方下载链接，下载以 .exe 结尾的安装包（通常名为 Clash.Verge_x64-setup.exe）。下载完成后双击安装，安装过程中如提示需要安装 'WebView2 Runtime'，请务必允许，这是软件运行的必要组件。",
        imagePlaceholder: "软件安装界面与WebView2提示",
        tips: "如果安装后无法打开，请右键选择'以管理员身份运行'。"
      },
      {
        title: "获取订阅链接",
        content: "登录您购买的机场官网（例如龙猫云、肥猫云），进入用户中心。找到“一键订阅”区域，点击“复制 Clash 订阅链接”或“复制通用订阅地址”。",
        imagePlaceholder: "机场后台复制订阅链接按钮位置",
      },
      {
        title: "导入配置",
        content: "打开 Clash Verge Rev，点击左侧菜单栏的「订阅 (Profiles)」。在顶部的输入框中粘贴刚才复制的链接，然后点击右侧的「导入 (Import)」按钮。导入成功后，您会看到一张新的卡片，点击它以选中（卡片变色即为选中）。",
        imagePlaceholder: "Clash Verge 订阅界面输入URL示意图",
      },
      {
        title: "开启系统代理",
        content: "点击左侧菜单的「设置 (Settings)」，找到「系统代理 (System Proxy)」开关并打开。此时，软件图标通常会变色，代表代理已接管系统网络。",
        imagePlaceholder: "Clash Verge 设置页面开启开关示意图",
      },
      {
        title: "选择节点",
        content: "点击左侧「代理 (Proxies)」，点击展开「Proxy」或「节点选择」策略组。点击具体的节点名称（如 '香港 01'）即可切换线路。建议点击右上角的闪电图标测试延迟，选择数值较小的绿色节点。",
        imagePlaceholder: "节点选择列表与延迟测试示意图",
      }
    ],
    faq: [
      { question: "为什么开启后无法上网？", answer: "1. 检查电脑时间是否准确。 2. 检查浏览器是否安装了其他代理插件（如 SwitchyOmega），建议先关闭它们。 3. 尝试在软件设置中点击'重启内核'。" },
      { question: "什么是 TUN 模式？", answer: "TUN 模式可以让不支持代理的软件（如部分游戏、UWP应用）强制走代理。在设置中开启 'Tun Mode' 即可，需要管理员权限。" }
    ]
  },
  mac: {
    title: "macOS 客户端配置教程",
    software: "Clash Verge Rev / Shadowrocket",
    description: "macOS 用户根据芯片类型可选择不同方案。M系列芯片推荐直接使用 Shadowrocket（iPad版），Intel 芯片推荐 Clash Verge。",
    icon: "https://api.iconify.design/logos:apple.svg",
    downloadLinks: [
      { label: "Clash Verge (Intel/M芯片通用)", url: "https://github.com/clash-verge-rev/clash-verge-rev/releases", primary: true },
      { label: "Shadowrocket (需美区ID)", url: "https://apps.apple.com/us/app/shadowrocket/id932747118", primary: false }
    ],
    steps: [
      {
        title: "选择合适的版本下载",
        content: "如果是 M1/M2/M3 芯片，强烈建议在 App Store 登录美区 ID 下载 Shadowrocket，体验最稳。如果是 Intel 芯片，请下载 Clash Verge Rev 的 .dmg 安装包（aarch64 为 M 芯片专用，x64 为 Intel 专用）。",
        imagePlaceholder: "Github 下载列表 .dmg 文件示意图",
      },
      {
        title: "安装与权限赋予",
        content: "将软件拖入 Applications 文件夹。首次打开可能会提示'无法验证开发者'，请去「系统设置」->「隐私与安全性」中点击「仍要打开」。首次连接时，macOS 会弹出「Clash Verge 想添加 VPN 配置」，请点击允许并输入开机密码。",
        imagePlaceholder: "MacOS 安全性设置允许运行示意图",
      },
      {
        title: "导入订阅 (Clash Verge)",
        content: "操作逻辑与 Windows 版完全一致：复制机场订阅 -> 打开软件订阅页面 -> 粘贴 URL -> 导入并选中。",
        imagePlaceholder: "Mac版 Clash 界面示意图",
      },
      {
        title: "开启增强模式 (可选)",
        content: "为了获得更好的体验，建议在设置中开启 'Tun Mode'。这会创建一个虚拟网卡，接管所有系统流量，不仅限于浏览器。",
        imagePlaceholder: "开启 Tun 模式后的状态栏图标变化",
      }
    ],
    faq: [
      { question: "状态栏图标显示连接但无法翻墙？", answer: "请检查浏览器是否使用了'系统默认代理'设置。Chrome 用户建议安装 Proxy SwitchyOmega 插件并设置为'系统代理'模式。" }
    ]
  },
  android: {
    title: "Android 客户端配置教程",
    software: "Clash Meta for Android",
    description: "安卓端最推荐的开源客户端。支持新的协议，界面简洁无广告。请勿使用所谓的'破解版'，以免泄露隐私。",
    icon: "https://api.iconify.design/logos:android-icon.svg",
    downloadLinks: [
      { label: "Github 官方下载 (APK)", url: "https://github.com/MetaCubeX/ClashMetaForAndroid/releases", primary: true },
      { label: "Google Play 下载", url: "#", primary: false }
    ],
    steps: [
      {
        title: "下载安装包",
        content: "点击上方链接下载 APK 文件。通常选择 'universal' (通用) 版本或者 'arm64-v8a' 版本。安装时如提示未知来源，请允许安装。",
        imagePlaceholder: "安卓 APK 安装权限提示截图",
      },
      {
        title: "一键导入 (推荐)",
        content: "在手机浏览器登录机场官网，找到“一键导入 Clash”按钮，点击后通常会自动唤起 APP 并进入导入界面。确认右上角的保存图标即可。",
        imagePlaceholder: "机场一键导入按钮点击示意图",
      },
      {
        title: "手动导入 (备用)",
        content: "如果一键导入失败，请复制订阅链接。打开 APP，点击「配置 (Profiles)」 -> 点击右上角「+」 -> 「从 URL 导入」。粘贴链接，名称随意填，点击保存。",
        imagePlaceholder: "安卓端手动粘贴 URL 界面",
      },
      {
        title: "启动与授权",
        content: "回到主界面，点击灰色的「已停止」按钮。系统会弹出“网络连接请求 (VPN)”，请点击“确定”。按钮变蓝即为启动成功。",
        imagePlaceholder: "VPN 授权弹窗截图",
      }
    ],
    faq: [
      { question: "可以分应用代理吗？", answer: "可以。在设置 -> 覆写 -> 模式中，可以选择“仅代理模式”并勾选需要翻墙的 APP，或者排除国内 APP。" }
    ]
  },
  ios: {
    title: "iOS / iPhone 客户端配置教程",
    software: "Shadowrocket (小火箭)",
    description: "iOS 上最强大的代理工具，俗称'小火箭'。注意：中国大陆 App Store 无法下载，您需要一个非中国区（如美区、港区）的 Apple ID。",
    icon: "https://api.iconify.design/logos:ios.svg",
    downloadLinks: [
      { label: "App Store 链接 (需外区ID)", url: "https://apps.apple.com/us/app/shadowrocket/id932747118", primary: true },
      { label: "如何注册美区 ID?", url: "#", primary: false }
    ],
    steps: [
      {
        title: "获取软件",
        content: (
          <span>
            打开 App Store，点击右上角头像，划到最底部点击“退出登录”。输入您的<strong>外区 Apple ID</strong> 并登录。搜索 "Shadowrocket"（图标是一个发射的火箭），付费下载（约 $2.99）。
            <br/><span className="text-red-400 text-xs block mt-1">*千万不要在“设置”中登录 iCloud，只能在 App Store 登录，否则可能导致锁机！</span>
          </span>
        ),
        imagePlaceholder: "App Store 搜索结果页示意图",
      },
      {
        title: "添加订阅",
        content: "登录机场官网，点击“一键导入 Shadowrocket”。如果无法跳转，请复制订阅链接。打开小火箭，软件会自动检测剪贴板，提示“检测到订阅连接”，点击“导入”即可。",
        imagePlaceholder: "小火箭自动检测剪贴板弹窗",
      },
      {
        title: "扫码添加 (电脑辅助)",
        content: "如果电脑在旁边，可以在电脑上打开机场官网显示的二维码。打开小火箭左上角的扫描按钮，扫描屏幕上的二维码即可直接添加。",
        imagePlaceholder: "小火箭扫描二维码界面",
      },
      {
        title: "连接与模式选择",
        content: "打开首页顶部的连接开关。首次连接需要输入 iPhone 锁屏密码。建议点击下方的「全局路由」，选择「配置 (Config)」模式，这样国内网站直连，国外网站走代理，最省电省流量。",
        imagePlaceholder: "全局路由模式选择菜单",
      }
    ],
    faq: [
      { question: "一定要花钱买吗？", answer: "Shadowrocket 是付费软件。如果你不想花钱，可以尝试寻找机场提供的共享 ID（有风险，请谨慎），或者使用免费的 OneClick（功能较弱）。" }
    ]
  }
};

const ClientTutorial: React.FC = () => {
  const { platform } = useParams<{ platform: string }>();
  const key = (platform?.toLowerCase() || 'windows') as PlatformKey;
  const data = TUTORIALS[key] || TUTORIALS.windows;

  useEffect(() => {
    document.title = `${data.title} - Cloudfly机场推荐 | 科学上网指南`;
    window.scrollTo(0, 0);
  }, [key, data.title]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex mb-8 text-sm text-gray-500 dark:text-slate-400">
        <Link to="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">首页</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600 dark:text-slate-300">客户端教程</span>
        <span className="mx-2">/</span>
        <span className="text-gray-900 dark:text-white font-medium capitalize">{key}</span>
      </nav>

      {/* Hero Section */}
      <div className="bg-white dark:bg-slate-850 rounded-2xl border border-gray-200 dark:border-slate-700 overflow-hidden shadow-xl mb-10 transition-colors">
        <div className="p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="w-24 h-24 bg-gray-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center p-4 shadow-inner border border-gray-200 dark:border-slate-700 shrink-0">
            <img src={data.icon} alt={key} className="w-full h-full object-contain" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{data.title}</h1>
            <p className="text-gray-600 dark:text-slate-300 text-lg mb-6 leading-relaxed">{data.description}</p>
            
            <div className="flex flex-wrap gap-4">
              {data.downloadLinks.map((link, idx) => (
                <a 
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all transform hover:-translate-y-1 ${
                    link.primary 
                      ? 'bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-600/30' 
                      : 'bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300 border border-gray-300 dark:border-slate-600'
                  }`}
                >
                  {link.primary && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-12 relative">
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-slate-800 z-0 hidden md:block"></div>
        
        {data.steps.map((step, index) => (
          <div key={index} className="relative z-10 md:pl-24 group">
            {/* Step Number Bubble */}
            <div className="hidden md:flex absolute left-0 w-16 h-16 rounded-full bg-white dark:bg-slate-900 border-4 border-gray-200 dark:border-slate-800 items-center justify-center font-bold text-2xl text-gray-400 dark:text-slate-500 group-hover:text-primary-600 dark:group-hover:text-primary-500 group-hover:border-primary-600 dark:group-hover:border-primary-500 transition-colors shadow-xl">
              {index + 1}
            </div>

            {/* Mobile Step Header */}
            <div className="md:hidden flex items-center gap-3 mb-4">
               <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold">
                 {index + 1}
               </div>
               <h3 className="text-xl font-bold text-gray-900 dark:text-white">{step.title}</h3>
            </div>

            <div className="bg-white dark:bg-slate-850 border border-gray-200 dark:border-slate-700 rounded-2xl overflow-hidden hover:border-gray-300 dark:hover:border-slate-600 transition-colors">
              <div className="p-6 md:p-8">
                <h3 className="hidden md:block text-2xl font-bold text-gray-900 dark:text-white mb-4">{step.title}</h3>
                <div className="prose prose-gray dark:prose-invert max-w-none text-gray-600 dark:text-slate-300 mb-6">
                  <p>{step.content}</p>
                </div>
                
                {/* Visual Placeholder for Image */}
                <div className="relative aspect-video bg-gray-100 dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 flex items-center justify-center group/img overflow-hidden">
                   {/* Placeholder Pattern */}
                   <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-500 via-gray-900 to-gray-900 dark:from-slate-500 dark:via-slate-900 dark:to-slate-900"></div>
                   <div className="text-center p-4 relative z-10">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 dark:text-slate-600 mx-auto mb-2 group-hover/img:text-primary-600 dark:group-hover/img:text-primary-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-500 dark:text-slate-500 text-sm font-medium block mb-1">此处应展示图片：</span>
                      <span className="text-gray-400 dark:text-slate-400 text-sm font-bold">"{step.imagePlaceholder}"</span>
                   </div>
                </div>

                {step.tips && (
                  <div className="mt-6 bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 rounded-lg p-4 flex gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-yellow-800 dark:text-yellow-200/80">{step.tips}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mt-16 pt-12 border-t border-gray-200 dark:border-slate-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">常见问题 (FAQ)</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {data.faq.map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-start gap-2">
                <span className="text-primary-600 dark:text-primary-500">Q:</span>
                {item.question}
              </h3>
              <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed pl-6">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/40 dark:to-purple-900/40 rounded-2xl p-8 text-center border border-primary-100 dark:border-primary-500/30">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">还是无法连接？</h3>
        <p className="text-gray-600 dark:text-slate-300 mb-6">大多数机场提供商都拥有 24 小时在线客服。如果按照教程配置后仍无法使用，建议联系机场客服获取帮助。</p>
        <Link to="/" className="inline-flex items-center justify-center px-8 py-3 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white dark:border-slate-600 rounded-lg font-medium transition-colors">
          返回首页选择优质机场
        </Link>
      </div>
    </div>
  );
};

export default ClientTutorial;