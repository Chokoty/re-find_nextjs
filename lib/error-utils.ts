export interface RefindAppError {
  // 오류 유형 식별자 (12종)
  name:
    | 'Unauthorized'
    | 'Forbidden'
    | 'UserExists'
    | 'WrongCredentials'
    | 'Unknown'
    | 'BadRequest'
    | 'RefreshFailure'
    | 'NotFound'
    | 'InvalidURL'
    | 'AlreadyExists';

  // HTTP 상태 코드 (400~500대)
  statusCode: number;

  // 오류 상세 메시지 (영어/한글 혼용)
  message: string;

  // 추가 데이터 (선택적)
  payload?: any;
}

export function extractRefindAppError(e: unknown): RefindAppError {
  const errorData = e as any;

  // 1. 데이터 구조 정규화
  const statusCode = errorData.statusCode || 500;
  const rawData = errorData.data || {};

  // 2. 메시지 추출 로직
  let message = '';
  if (typeof rawData === 'string') {
    message = rawData; // 문자열 직접 사용
  } else if (typeof rawData === 'object') {
    message = rawData.message || rawData.content || 'Unknown error';
  }

  // 3. 에러 타입 매핑
  const errorTypeMap: Record<number, RefindAppError['name']> = {
    400: 'BadRequest',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'NotFound',
    409: 'AlreadyExists',
    417: 'AlreadyExists',
    500: 'Unknown',
  };

  return {
    statusCode,
    message: message.trim(),
    name: errorTypeMap[statusCode] || 'Unknown',
  };
}

export function translateRefindAppErrorMessage(e: RefindAppError): string {
  const translationMap: Record<string, string> = {
    // 인증/권한
    Unauthorized: '로그인이 필요합니다',
    Forbidden: '권한이 없습니다',
    UserExists: '이미 존재하는 유저입니다',
    WrongCredentials: '잘못된 계정 정보입니다',
    RefreshFailure: '토큰 갱신에 실패했습니다',
    NotFound: '찾을 수 없습니다',
    InvalidURL: '잘못된 URL입니다',
    AlreadyExists: '이미 존재합니다',

    // 로그인/회원가입/이메일 인증
    // '이미 인증되었습니다.': '이미 이메일 인증이 완료되었습니다.',
    // '이미 가입되어 있습니다!': '이미 가입된 계정입니다.',
    // '네이버 메일만 사용할 수 있습니다.': '네이버 메일만 사용할 수 있습니다.',
    // '네이버 ID 형식에 문제가 있습니다.':
    //   '네이버 아이디 형식이 올바르지 않습니다.',
    'Cafe Error': '입력한 네이버 아이디가 왁물원에 가입되어 있지 않습니다.',
    // '왁물원 멤버가 아닙니다!': '왁물원 멤버가 아닙니다!',
    'Bad Request': '잘못된 요청입니다',
    // '토큰이 유효하지 않습니다.': '토큰이 유효하지 않습니다.',
    'Invalid Nickname Format': '닉네임 형식이 잘못되었습니다',
    'Unsafe char in nickname':
      '닉네임에 허용되지 않는 문자가 포함되어 있습니다.',
    // '닉네임은 1~24글자 내로 설정 가능합니다.':
    //   '닉네임은 1~24글자 내로 설정 가능합니다.',

    // 팔로우/언팔로우
    'Already Following': '이미 팔로우 중입니다.',
    'Not Following': '팔로우 상태가 아닙니다.',
    'Follow/Unfollow failed': '팔로우/언팔로우에 실패했습니다.',

    // 앨범/갤러리
    'Album limit reached.': '앨범 생성 한도를 초과했습니다.',
    'Album not found': '앨범을 찾을 수 없습니다.',
    'Gallery does not exist': '갤러리가 존재하지 않습니다',
    'Invalid gallery id': '잘못된 갤러리 ID 입니다.',
    "'articles' field is empty": '삭제할 게시글이 없습니다.',

    // 기타
    'Network Error': '네트워크 연결 상태를 확인해주세요',
    'Unknown error': '알 수 없는 오류가 발생했습니다',
    // '이미 존재합니다.': '이미 존재합니다.',
    // '갤러리를 찾을 수 없습니다.': '갤러리를 찾을 수 없습니다.',
    // 필요시 추가
  };

  // 한국어 감지 정규식
  const koreanRegex = /[\uAC00-\uD7A3]/;
  return koreanRegex.test(e.message)
    ? e.message
    : translationMap[e.message] || '알 수 없는 오류';
}

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public data: { message: string }
  ) {
    super(data.message);
    this.name = 'ApiError';
  }
}
