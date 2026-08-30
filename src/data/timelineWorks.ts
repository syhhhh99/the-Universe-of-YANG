import { timelineStillPositions, timelineStills } from '@/data/timelineStills';
import { timelineProductionDates } from '@/data/timelineProductionDates';

export interface TimelineWork {
  id: string;
  title: string;
  role: string | null;
  releaseDate: string | null;
  medium?: 'film' | 'variety';
  image?: string;
  imagePosition?: string;
  productionStartDate?: string | null;
  wrapDate?: string | null;
}

const timelineWorkData: TimelineWork[] = [
  {
    id: 'YY001',
    title: '红楼梦',
    role: '贾宝玉',
    releaseDate: '2010-06-24',
  },
  { id: 'YY002', title: '青春旋律', role: '宁浩', releaseDate: '2011-02-09' },
  { id: 'YY004', title: '建党伟业', role: '杨开智', releaseDate: '2011-06-15', medium: 'film' },
  { id: 'YY005', title: '饮食男女：好远又好近', role: '唐士哲（年轻）', releaseDate: '2012-03-23', medium: 'film' },
  { id: 'YY006', title: '战争不相信眼泪', role: '杜长友', releaseDate: '2012-05-28' },
  {
    id: 'YY003',
    title: '疯狂办公室',
    role: '刘新杰',
    releaseDate: '2012-09-21',
  },
  { id: 'YY007', title: '刷新3+7', role: '何天泽', releaseDate: '2012-10-27' },
  { id: 'YY009', title: '新洛神', role: '曹植', releaseDate: '2013-07-04' },
  { id: 'YY010', title: '武间道', role: '白念生', releaseDate: '2013-07-14' },
  { id: 'YY011', title: '花开半夏', role: '陆元', releaseDate: '2013-11-30' },
  { id: 'YY008', title: '防务精英之星兵报到', role: null, releaseDate: '2013-12-28', medium: 'variety' },
  { id: 'YY013', title: '小时代之折纸时代', role: 'Neil', releaseDate: '2014-07-10' },
  { id: 'YY012', title: '花灯满城', role: '陈飞渝', releaseDate: '2014-07-11' },
  { id: 'YY015', title: '暴走神探', role: '占士吴', releaseDate: '2015-01-16', medium: 'film' },
  { id: 'YY016', title: '少年四大名捕', role: '无情', releaseDate: '2015-03-17' },
  { id: 'YY017', title: '左耳', role: '许弋', releaseDate: '2015-04-24', medium: 'film' },
  { id: 'YY014', title: '花儿与少年 第二季', role: null, releaseDate: '2015-04-25', medium: 'variety' },
  { id: 'YY018', title: '盗墓笔记', role: '张起灵', releaseDate: '2015-06-12' },
  { id: 'YY019', title: '旋风少女', role: '若白', releaseDate: '2015-07-07' },
  { id: 'YY020', title: '微微一笑很倾城', role: '肖奈', releaseDate: '2016-08-22' },
  { id: 'YY021', title: '我的蠢萌老公', role: '杨慷', releaseDate: '2016-09-14' },
  { id: 'YY022', title: '从你的全世界路过', role: '茅十八', releaseDate: '2016-09-29', medium: 'film' },
  { id: 'YY023', title: '三生三世十里桃花', role: '夜华', releaseDate: '2017-08-03', medium: 'film' },
  { id: 'YY024', title: '茧镇奇缘', role: '黄莫如', releaseDate: '2018-01-01' },
  { id: 'YY025', title: '武动乾坤', role: '林动', releaseDate: '2018-08-07' },
  { id: 'YY026', title: '全职高手', role: '叶修/叶秋', releaseDate: '2019-07-24' },
  { id: 'YY027', title: '元气满满的哥哥', role: null, releaseDate: '2020-07-31', medium: 'variety' },
  { id: 'YY028', title: '在一起', role: '乐彬', releaseDate: '2020-09-29' },
  { id: 'YY029', title: '急先锋', role: '雷震宇', releaseDate: '2020-09-30', medium: 'film' },
  { id: 'YY031', title: '你是我的荣耀', role: '于途', releaseDate: '2021-07-26' },
  { id: 'YY030', title: '青春环游记 第三季', role: null, releaseDate: '2021-11-06', medium: 'variety' },
  { id: 'YY032', title: '特战荣耀', role: '燕破岳', releaseDate: '2022-04-05' },
  { id: 'YY033', title: '且试天下', role: '丰兰息', releaseDate: '2022-04-18' },
  { id: 'YY034', title: '我的人间烟火', role: '宋焰', releaseDate: '2023-07-05' },
  { id: 'YY035', title: '凡人修仙传', role: '韩立', releaseDate: '2025-07-27' },
  { id: 'YY036', title: '雨霖铃', role: '展昭', releaseDate: '2026-05-13' },
  { id: 'YY037', title: '不让江山', role: '李叱', releaseDate: null },
  { id: 'YY038', title: '援军明日到达', role: '井启第', releaseDate: null, medium: 'film' },
];

export const timelineWorks: TimelineWork[] = timelineWorkData.map((work) => ({
  ...work,
  image: timelineStills[work.id],
  imagePosition: timelineStillPositions[work.id] ?? '50% 50%',
  productionStartDate: timelineProductionDates[work.id]?.productionStartDate ?? null,
  wrapDate: timelineProductionDates[work.id]?.wrapDate ?? null,
}));
