export const convertBoardParams = (selectedView: keyof AuthorCommon | null) => {
  // from board: best_cnt, goldhand_cnt, isd_cnt, gomem_cnt, wak_cnt
  // to board: best, goldhand, wak, isd, gomem

  if (!selectedView) return null;

  return selectedView.replace('_cnt', '');
};

export const convertRankTypeParams = (field: keyof AuthorCommon) => {
  switch (field) {
    case 'total_likes':
      return 'likes';
    case 'total_comments':
      return 'comment';
    case 'total_views':
      return 'view';
    case 'total_subscribers':
      return 'subscriber';
    case 'total_articles':
      return 'num';
    default:
      return 'likes';
  }
};
