import {
  Christmas,
  Gomem,
  Gosegu,
  Halloween,
  Ine,
  Isd,
  Jingburger,
  Jururu,
  KissingYou,
  Lilpa,
  LilpaBirthday,
  Rewind2Year,
  Viichan,
  ViichanBirthday,
  Wakgood,
} from '@/lib/images';

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
    case 'ine':
      return Ine;
    case 'jingburger':
      return Jingburger;
    case 'lilpa':
      return Lilpa;
    case 'jururu':
      return Jururu;
    case 'gosegu':
      return Gosegu;
    case 'viichan':
      return Viichan;
    case 'gomem':
      return Gomem;
    case 'woowakgood':
      return Wakgood;
    default:
      return Isd;
  }
};