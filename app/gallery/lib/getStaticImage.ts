import {
  ChanDanCon,
  Christmas,
  deadCat,
  Gomem,
  Gosegu,
  Halloween,
  Ine,
  Isd,
  Jingburger,
  Jururu,
  JururuBirthday,
  KissingYou,
  Lilpa,
  LilpaBirthday,
  newIne,
  newnewLilpa,
  Rewind2Year,
  Thousand,
  TiffanyWouldYouMia,
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
    case 'newIne':
      return newIne;
    case 'newnewLilpa':
      return newnewLilpa;
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
    case 'jururuBirthday':
      return JururuBirthday;
    case 'deadCat':
      return deadCat;
    case 'tiffanyWouldYouMia':
      return TiffanyWouldYouMia;
    case 'chanDanCon':
      return ChanDanCon;
    case 'thousand':
      return Thousand;
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
