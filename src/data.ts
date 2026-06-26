import { Actor, ContestItem } from './types';

// Import all local image assets statically so Vite can build and bundle them correctly for GitHub Pages deployment
import suQingyiAvatar from './assets/images/su_qingyi_avatar_1782459087312.jpg';
import chuXinglanAvatar from './assets/images/chu_xinglan_avatar_1782459103543.jpg';
import yeZhiziAvatar from './assets/images/ye_zhizi_avatar_1782459118681.jpg';
import murongLiAvatar from './assets/images/murong_li_avatar_1782459134710.jpg';
import jiangMuqingAvatar from './assets/images/jiang_muqing_avatar_1782459157776.jpg';
import baiZhibaiAvatar from './assets/images/bai_zhibai_avatar_1782459170593.jpg';
import peiXiuningAvatar from './assets/images/pei_xiuning_avatar_1782459196183.jpg';
import shengYuehuaAvatar from './assets/images/sheng_yuehua_avatar_1782459212367.jpg';

export const INITIAL_ACTORS: Actor[] = [
  {
    id: "ACT-001",
    name: "苏清漪 (Su Qingyi)",
    avatar: suQingyiAvatar,
    coverPhoto: suQingyiAvatar,
    gender: "female",
    region: "mainland",
    tags: ["中国古风女真人", "汉服超凡仙子", "短剧绝美神颜", "国风顶流Coser"],
    height: 168,
    weight: 46,
    measurements: "84-59-86",
    location: "浙江横店",
    licensingPrice: 158000,
    isExclusive: true,
    genres: ["古装", "短剧", "仙侠", "言情"],
    videoSampleUrl: "https://assets.mixkit.co/videos/preview/mixkit-portrait-of-a-beautiful-young-woman-with-long-hair-39845-large.mp4",
    media: [
      suQingyiAvatar,
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80"
    ],
    bio: "致力于中国古风华服与玄幻仙侠短剧的真人演员。曾以‘洛神’汉服造型全网破圈，其数字肖像资产被广泛应用于微短剧、漫剧、互动影游中的仙子、神女角色，100%正版确权，AI适配度极高。",
    rating: 4.9,
    cooperationIntent: ["可接短剧", "商业代言", "AI训练", "平面拍摄", "短视频定制"],
    earnings: {
      total: 1890200,
      monthly: 320000,
      yearly: 1890200,
      trend: "up",
      rank: 1
    }
  },
  {
    id: "ACT-002",
    name: "楚星阑 (Chu Xinglan)",
    avatar: chuXinglanAvatar,
    coverPhoto: chuXinglanAvatar,
    gender: "male",
    region: "mainland",
    tags: ["中国古风男真人", "谪仙剑客", "国潮儒雅公子", "冷峻玄幻男主"],
    height: 185,
    weight: 72,
    measurements: "102-78-95",
    location: "浙江横店",
    licensingPrice: 210000,
    isExclusive: true,
    genres: ["短剧", "都市", "古装", "动作"],
    videoSampleUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-holding-his-chin-with-thoughtful-expression-39846-large.mp4",
    media: [
      chuXinglanAvatar,
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80"
    ],
    bio: "横店常驻国风微短剧与互动影游男主角。具有极其深邃古典的东方美男面孔，擅长诠释清冷剑客与深沉帝王。肖像已完成高像素3D动捕点阵及AI拟真声音集确权，支持微短剧高保真数字复刻。",
    rating: 4.8,
    cooperationIntent: ["可接短剧", "商业代言", "AI训练", "游戏脸型建模"],
    earnings: {
      total: 1450000,
      monthly: 240000,
      yearly: 1450000,
      trend: "up",
      rank: 2
    }
  },
  {
    id: "ACT-003",
    name: "叶栀子 (Ye Zhizi)",
    avatar: yeZhiziAvatar,
    coverPhoto: yeZhiziAvatar,
    gender: "female",
    region: "mainland",
    tags: ["中国Coser风女真人", "国风二次元", "元气九尾狐仙", "高拟真动漫脸"],
    height: 163,
    weight: 42,
    measurements: "80-58-84",
    location: "上海",
    licensingPrice: 120000,
    isExclusive: false,
    genres: ["都市", "校园", "言情", "二次元"],
    videoSampleUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-with-cheerful-smile-and-windy-hair-39851-large.mp4",
    media: [
      yeZhiziAvatar,
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80"
    ],
    bio: "国内知名国潮动漫与游戏特约Coser。其绝美面孔与精湛的古装Cos装造在二次元圈内拥有极高人气。其数字肖像和多套古风Cos造型已完成合规授权，深度赋能漫剧和游戏捏脸建模。",
    rating: 4.7,
    cooperationIntent: ["可接短剧", "平面拍摄", "AI训练", "游戏脸型建模"],
    earnings: {
      total: 1210800,
      monthly: 185000,
      yearly: 1120000,
      trend: "up",
      rank: 3
    }
  },
  {
    id: "ACT-004",
    name: "慕容离 (Murong Li)",
    avatar: murongLiAvatar,
    coverPhoto: murongLiAvatar,
    gender: "male",
    region: "hongkong_taiwan",
    tags: ["中国古风男真人", "玄幻修真男神", "硬朗武侠型男", "国风Coser大佬"],
    height: 182,
    weight: 75,
    measurements: "100-80-96",
    location: "香港",
    licensingPrice: 280000,
    isExclusive: false,
    genres: ["广告", "动作", "都市", "悬疑"],
    videoSampleUrl: "https://assets.mixkit.co/videos/preview/mixkit-smiling-handsome-man-profile-portrait-39848-large.mp4",
    media: [
      murongLiAvatar,
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80"
    ],
    bio: "常驻国风微短剧与漫剧的实力派武打男演员，同时也是圈内知名古风Coser。身形健美挺拔，拥有极高辨识度的东方硬朗面庞。其高精度肖像模型及武术动捕数据完美匹配古风动作影游。",
    rating: 4.8,
    cooperationIntent: ["商业代言", "平面拍摄", "AI训练"],
    earnings: {
      total: 980500,
      monthly: 120000,
      yearly: 980500,
      trend: "stable",
      rank: 4
    }
  },
  {
    id: "ACT-005",
    name: "姜慕晴 (Jiang Muqing)",
    avatar: jiangMuqingAvatar,
    coverPhoto: jiangMuqingAvatar,
    gender: "female",
    region: "mainland",
    tags: ["中国Coser风女真人", "国潮冷艳御姐", "汉服超模", "漫剧冷酷女皇"],
    height: 172,
    weight: 50,
    measurements: "86-61-89",
    location: "北京",
    licensingPrice: 195000,
    isExclusive: true,
    genres: ["都市", "广告", "短剧", "科幻"],
    videoSampleUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-turning-and-smiling-at-camera-39850-large.mp4",
    media: [
      jiangMuqingAvatar,
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=80"
    ],
    bio: "国风潮流超模与资深动漫Coser，擅长极具视觉张力的中国古典冷艳大女主、红衣刺客装造。其数字版权及多套国风造型实拍建模已完成上链，是高保真漫剧、互动影游 and 短剧首选。",
    rating: 4.9,
    cooperationIntent: ["可接短剧", "商业代言", "AI训练", "游戏脸型建模", "平面拍摄"],
    earnings: {
      total: 890000,
      monthly: 155000,
      yearly: 890000,
      trend: "up",
      rank: 5
    }
  },
  {
    id: "ACT-006",
    name: "白芷白 (Bai Zhibai)",
    avatar: baiZhibaiAvatar,
    coverPhoto: baiZhibaiAvatar,
    gender: "male",
    region: "overseas",
    tags: ["中国Coser风男真人", "邪魅修真尊上", "视觉系古风男神", "动漫高拟真脸"],
    height: 175,
    weight: 53,
    measurements: "88-60-90",
    location: "上海",
    licensingPrice: 240000,
    isExclusive: false,
    genres: ["广告", "科幻", "二次元", "现代剧"],
    videoSampleUrl: "https://assets.mixkit.co/videos/preview/mixkit-beautiful-woman-smiling-with-glamorous-expression-39855-large.mp4",
    media: [
      baiZhibaiAvatar,
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80"
    ],
    bio: "全网百万级国风视觉系男Coser，以其绝美古典的邪魅玄幻反派角色闻名圈内。其面部骨骼比例和神态极其契合互动影游捏脸、古风漫剧及短剧的高帧AI精细渲染，已全谱系确权。",
    rating: 4.6,
    cooperationIntent: ["商业代言", "平面拍摄", "AI训练"],
    earnings: {
      total: 750000,
      monthly: 95000,
      yearly: 750000,
      trend: "down",
      rank: 6
    }
  },
  {
    id: "ACT-007",
    name: "裴修宁 (Pei Xiuning)",
    avatar: peiXiuningAvatar,
    coverPhoto: peiXiuningAvatar,
    gender: "male",
    region: "mainland",
    tags: ["中国古风男真人", "赤胆少年将军", "竹林隐士", "国潮汉服校草"],
    height: 180,
    weight: 65,
    measurements: "95-74-90",
    location: "杭州",
    licensingPrice: 110000,
    isExclusive: false,
    genres: ["短剧", "校园", "古装", "都市"],
    videoSampleUrl: "https://assets.mixkit.co/videos/preview/mixkit-portrait-of-a-smiling-young-man-39853-large.mp4",
    media: [
      peiXiuningAvatar,
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80"
    ],
    bio: "新生代国风男演员，擅长塑造仗义执言的少侠、一腔热血的少年将军。其3D面部几何网格与武打姿态动捕数据，在古风互动解谜剧、微短剧中得到高溢价授权与应用。",
    rating: 4.7,
    cooperationIntent: ["可接短剧", "平面拍摄", "AI训练", "游戏脸型建模"],
    earnings: {
      total: 620000,
      monthly: 85000,
      yearly: 620000,
      trend: "up",
      rank: 7
    }
  },
  {
    id: "ACT-008",
    name: "盛月华 (Sheng Yuehua)",
    avatar: shengYuehuaAvatar,
    coverPhoto: shengYuehuaAvatar,
    gender: "female",
    region: "hongkong_taiwan",
    tags: ["中国古风女真人", "温婉大家闺秀", "国色天香", "江南汉服佳人"],
    height: 167,
    weight: 48,
    measurements: "85-60-88",
    location: "深圳",
    licensingPrice: 180000,
    isExclusive: false,
    genres: ["都市", "古装", "广告", "悬疑"],
    videoSampleUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-with-vintage-makeup-looking-at-camera-39857-large.mp4",
    media: [
      shengYuehuaAvatar,
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80"
    ],
    bio: "极富东方古典神韵的江南汉服演员。眼神深沉而饱满，极具复古名伶风情。其数字人肖像被多家古风漫剧、微短剧、文旅AR开发商长期授权使用，提供极其逼真的东方温婉佳人互动交互。",
    rating: 4.8,
    cooperationIntent: ["可接短剧", "商业代言", "AI训练", "平面拍摄"],
    earnings: {
      total: 540000,
      monthly: 62000,
      yearly: 540000,
      trend: "stable",
      rank: 8
    }
  }
];

export const CONTEST_ITEMS: ContestItem[] = [
  {
    id: "CON-001",
    title: "《仙剑奇侠》神女Cosplay金奖",
    actorName: "苏清漪",
    actorAvatar: suQingyiAvatar,
    role: "灵霄九天剑姬",
    votes: 24510,
    image: suQingyiAvatar,
    category: "cos"
  },
  {
    id: "CON-002",
    title: "国潮Cosplay大赏最具人气第一名",
    actorName: "叶栀子",
    actorAvatar: yeZhiziAvatar,
    role: "青丘九尾妖狐",
    votes: 18230,
    image: yeZhiziAvatar,
    category: "cos"
  },
  {
    id: "CON-003",
    title: "玄幻大女主漫剧最佳人气代言人",
    actorName: "姜慕晴",
    actorAvatar: jiangMuqingAvatar,
    role: "九幽修罗女帝",
    votes: 16800,
    image: jiangMuqingAvatar,
    category: "cos"
  },
  {
    id: "CON-004",
    title: "微短剧《长风啸》最佳男主角评选",
    actorName: "楚星阑",
    actorAvatar: chuXinglanAvatar,
    role: "清冷仙尊谪仙",
    votes: 15400,
    image: chuXinglanAvatar,
    category: "short_drama"
  },
  {
    id: "CON-005",
    title: "温婉汉服风情系列挑战赛总冠军",
    actorName: "盛月华",
    actorAvatar: shengYuehuaAvatar,
    role: "江南绝色才女",
    votes: 12900,
    image: shengYuehuaAvatar,
    category: "modern"
  },
  {
    id: "CON-006",
    title: "国风视觉系邪魅角色挑战赛金奖",
    actorName: "白芷白",
    actorAvatar: baiZhibaiAvatar,
    role: "红衣妖尊",
    votes: 11200,
    image: baiZhibaiAvatar,
    category: "cos"
  }
];
