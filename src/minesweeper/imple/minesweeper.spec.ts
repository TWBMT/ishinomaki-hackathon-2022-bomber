class Minesweeper {
  init() {
    return {
      xLength: 3,
      yLength: 3,
      status: "init",
      cells: [
        [
          { isOpened: false, isBomb: false, bombCount: 1 },
          { isOpened: false, isBomb: false, bombCount: 1 },
          { isOpened: false, isBomb: false, bombCount: 1 },
        ],
        [
          { isOpened: false, isBomb: false, bombCount: 1 },
          { isOpened: false, isBomb: true, bombCount: 0 },
          { isOpened: false, isBomb: false, bombCount: 1 },
        ],
        [
          { isOpened: false, isBomb: false, bombCount: 1 },
          { isOpened: false, isBomb: false, bombCount: 1 },
          { isOpened: false, isBomb: false, bombCount: 1 },
        ],
      ],
    };
  }

  click(clickedCell) {
    const currentCells = {
      xLength: 3,
      yLength: 3,
      status: "init",
      cells: [
        [
          { isOpened: false, isBomb: false, bombCount: 1 },
          { isOpened: false, isBomb: false, bombCount: 1 },
          { isOpened: false, isBomb: false, bombCount: 1 },
        ],
        [
          { isOpened: false, isBomb: false, bombCount: 1 },
          { isOpened: false, isBomb: true, bombCount: 0 },
          { isOpened: false, isBomb: false, bombCount: 1 },
        ],
        [
          { isOpened: false, isBomb: false, bombCount: 1 },
          { isOpened: false, isBomb: false, bombCount: 1 },
          { isOpened: false, isBomb: false, bombCount: 1 },
        ],
      ],
    };

    return {
      xLength: 3,
      yLength: 3,
      status: "playing",
      cells: [
        [
          { isOpened: true, isBomb: false, bombCount: 1 },
          { isOpened: false, isBomb: false, bombCount: 1 },
          { isOpened: false, isBomb: false, bombCount: 1 },
        ],
        [
          { isOpened: false, isBomb: false, bombCount: 1 },
          { isOpened: false, isBomb: true, bombCount: 0 },
          { isOpened: false, isBomb: false, bombCount: 1 },
        ],
        [
          { isOpened: false, isBomb: false, bombCount: 1 },
          { isOpened: false, isBomb: false, bombCount: 1 },
          { isOpened: false, isBomb: false, bombCount: 1 },
        ],
      ],
    };
  }
}

it("マインスイーパーを開始する（初期化）", () => {
  const minesweeper = new Minesweeper();
  const result = minesweeper.init();

  expect(result).toEqual({
    xLength: 3,
    yLength: 3,
    status: "init",
    cells: [
      [
        { isOpened: false, isBomb: false, bombCount: 1 },
        { isOpened: false, isBomb: false, bombCount: 1 },
        { isOpened: false, isBomb: false, bombCount: 1 },
      ],
      [
        { isOpened: false, isBomb: false, bombCount: 1 },
        { isOpened: false, isBomb: true, bombCount: 0 },
        { isOpened: false, isBomb: false, bombCount: 1 },
      ],
      [
        { isOpened: false, isBomb: false, bombCount: 1 },
        { isOpened: false, isBomb: false, bombCount: 1 },
        { isOpened: false, isBomb: false, bombCount: 1 },
      ],
    ],
  });
});

describe("セルをクリックした時の動き", () => {
  it("セルをクリックして、クリックした後の状態を取得できる", () => {
    const minesweeper = new Minesweeper();
    const result = minesweeper.click({ x: 1, y: 1 });
    expect(result).toEqual({
      xLength: 3,
      yLength: 3,
      status: "playing",
      cells: [
        [
          { isOpened: true, isBomb: false, bombCount: 1 },
          { isOpened: false, isBomb: false, bombCount: 1 },
          { isOpened: false, isBomb: false, bombCount: 1 },
        ],
        [
          { isOpened: false, isBomb: false, bombCount: 1 },
          { isOpened: false, isBomb: true, bombCount: 0 },
          { isOpened: false, isBomb: false, bombCount: 1 },
        ],
        [
          { isOpened: false, isBomb: false, bombCount: 1 },
          { isOpened: false, isBomb: false, bombCount: 1 },
          { isOpened: false, isBomb: false, bombCount: 1 },
        ],
      ],
    });
  });

  it("クリックした時に爆弾だったら失敗", () => {
    const minesweeper = new Minesweeper();
    const result = minesweeper.click({ x: 2, y: 2 });
    expect(result).toEqual({
      xLength: 3,
      yLength: 3,
      status: "fail",
      cells: [
        [
          { isOpened: false, isBomb: false, bombCount: 1 },
          { isOpened: false, isBomb: false, bombCount: 1 },
          { isOpened: false, isBomb: false, bombCount: 1 },
        ],
        [
          { isOpened: false, isBomb: false, bombCount: 1 },
          { isOpened: true, isBomb: true, bombCount: 0 },
          { isOpened: false, isBomb: false, bombCount: 1 },
        ],
        [
          { isOpened: false, isBomb: false, bombCount: 1 },
          { isOpened: false, isBomb: false, bombCount: 1 },
          { isOpened: false, isBomb: false, bombCount: 1 },
        ],
      ],
    });
  });
});
