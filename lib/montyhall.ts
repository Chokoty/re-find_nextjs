class MontyHall {
  contestantGuess: number;
  doors: number[];
  prizeDoor: number;
  montyDoor: number;
  win: boolean | string;

  constructor(contestantGuess: number) {
    this.contestantGuess = Number(contestantGuess); // 유저가 선택한 문
    this.doors = [1, 2, 3]; // 게임에서 세 개의 문을 나타내는 배열입니다.
    this.prizeDoor = this.getPrizeDoor(); // 상품이 숨겨져 있는 문을 나타냅니다. getPrizeDoor 메소드를 사용하여 무작위로 생성됩니다.
    this.montyDoor = this.montyOpens(); // 몬티 홀(사회자)이 열 문을 나타냅니다. montyOpens 메소드를 사용하여 무작위로 생성됩니다.
    this.win = ''; // 게임 결과를 저장합니다(승리의 경우 'true', 패배의 경우 'false'). 빈 문자열로 초기화되지만 게임 결과에 따라 업데이트됩니다.
  }
  // 게임을 시작합니다.
  start(): number {
    return this.montyOpens();
  }
  // 상품이 숨겨져 있는 문을 무작위로 생성합니다.
  getPrizeDoor(): number {
    return Math.floor(Math.random() * 3) + 1;
  }
  // 몬티 홀이 열 문을 선택하는 방법을 시뮬레이션합니다.
  montyOpens(): number {
    // 유저가 선택한 문이 상품이 숨겨져 있는 문인 경우
    if (this.contestantGuess === this.prizeDoor) {
      const options = this.doors.filter(
        (door) => door !== this.contestantGuess
      );
      return this.randomDoor(options);
      // 유저가 선택한 문이 상품이 숨겨져 있는 문이 아닌 경우
    } else {
      return this.doors.find(
        (door) => door !== this.prizeDoor && door !== this.contestantGuess
      )!;
    }
  }
  // 무작위로 문을 선택합니다.
  randomDoor(doors: number[]): number {
    const randomIndex = Math.floor(Math.random() * doors.length);
    return doors[randomIndex];
  }

  // 유저가 선택한 문을 변경합니다.
  changeAnswer(): string[] {
    return this.checkWinning(
      this.doors.find(
        (door) => door !== this.contestantGuess && door !== this.montyDoor
      )!
    );
  }
  // 게임 결과를 확인합니다.
  checkWinning(guess = this.contestantGuess): string[] {
    const response: string[] = [];
    if (guess === this.contestantGuess) {
      response.push(`You guessed Door ${guess}. `);
    } else {
      response.push(
        `You originally guessed Door ${this.contestantGuess}.`,
        `You switched to choose Door ${guess}. `
      );
    }
    response.push(`The prize was located in Door ${this.prizeDoor}.  `);
    if (guess === this.prizeDoor) {
      this.win = true;
      response.push('Congratulations, you win!');
    } else {
      this.win = false;
      response.push('Better luck next time.');
    }
    return response;
  }
}
