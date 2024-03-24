import {
  Christmas,
  Halloween,
  Isd,
  KissingYou,
  LilpaBirthday,
  Rewind2Year,
  ViichanBirthday,
} from '@/data/vectors';

export const getStaticImage = (cover: string) => {
  switch (cover) {
    case 'isdPick':
      return Isd;
    case 'kissingYou':
      return KissingYou;
    case 'halloween':
      return Halloween;
    case 'rewind2year':
      return Rewind2Year;
    case 'christmas':
      return Christmas;
    case 'viichanBirthday':
      return ViichanBirthday;
    case 'lilpaBirthday':
      return LilpaBirthday;
    default:
      return KissingYou;
  }
};
