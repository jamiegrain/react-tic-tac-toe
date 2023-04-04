import * as React from "react";
import styles from "@/styles/Grid.module.scss";
import Square from "@/components/Square";
import { GridStateEnum } from "@/utils/enums";
import { GameOver } from "@/components/GameOver";

export interface IGridProps {}

function createDefaultGrid() {
	return [
		[
			GridStateEnum.Unselected,
			GridStateEnum.Unselected,
			GridStateEnum.Unselected,
		],
		[
			GridStateEnum.Unselected,
			GridStateEnum.Unselected,
			GridStateEnum.Unselected,
		],
		[
			GridStateEnum.Unselected,
			GridStateEnum.Unselected,
			GridStateEnum.Unselected,
		],
	];
}

export default function Grid(props: IGridProps) {
	const [xTurn, setXTurn] = React.useState<boolean>(true);
	const [winner, setWinner] = React.useState<
		"naughts" | "crosses" | "draw" | null
	>(null);
	const [gridState, setGridState] = React.useState<
		Array<Array<GridStateEnum>>
	>(createDefaultGrid());

	function updateGridSquare(y: number, x: number) {
		const newGrid = [...gridState];
		newGrid[y][x] = xTurn ? GridStateEnum.Crosses : GridStateEnum.Naughts;
		setGridState(newGrid);
		setXTurn(!xTurn);
	}

	function checkForWin(grid: Array<Array<GridStateEnum>>) {
		let winFound = false;

		//Check for horizontals
		winFound = grid.some((row) => {
			return (
				row.every((val) => val === GridStateEnum.Crosses) ||
				row.every((val) => val === GridStateEnum.Naughts)
			);
		});
		if (winFound) {
			return true;
		}
		//Check for verticals
		for (let i = 0; i < 3; i++) {
			winFound =
				grid
					.map((row) => row[i])
					.every((val) => val === GridStateEnum.Crosses) ||
				grid
					.map((row) => row[i])
					.every((val) => val === GridStateEnum.Naughts);
			if (winFound) return true;
		}
		//Check for diagonals
		let diagonal1 = grid.map((row, i) => row[i]);
		winFound = diagonal1.every((val) => val === GridStateEnum.Crosses);
		if (winFound) return true;
		winFound = diagonal1.every((val) => val === GridStateEnum.Naughts);
		if (winFound) return true;
		let diagonal2 = grid.map((row, i) => row[2 - i]);
		winFound = diagonal2.every((val) => val === GridStateEnum.Crosses);
		if (winFound) return true;
		winFound = diagonal2.every((val) => val === GridStateEnum.Naughts);
		if (winFound) return true;
		return winFound;
	}

	function checkForDraw(grid: Array<Array<GridStateEnum>>) {
		return grid.flat().every((val) => val !== GridStateEnum.Unselected);
	}

	function reset(): void {
		setWinner(null);
		setGridState(createDefaultGrid());
		setXTurn(true);
	}

	React.useEffect(() => {
		if (checkForWin(gridState)) {
			//Have to set the winner to be the previous turn
			xTurn ? setWinner("naughts") : setWinner("crosses");
		} else if (checkForDraw(gridState)) {
			setWinner("draw");
		}
	}, [gridState, xTurn]);

	return (
		<div className={styles.gridContainer}>
			<GameOver winner={winner} resetCallback={reset}></GameOver>
			<Square
				updateGridCallback={() => updateGridSquare(0, 0)}
				currentState={gridState[0][0]}
			/>
			<Square
				updateGridCallback={() => updateGridSquare(0, 1)}
				currentState={gridState[0][1]}
			/>
			<Square
				updateGridCallback={() => updateGridSquare(0, 2)}
				currentState={gridState[0][2]}
			/>
			<Square
				updateGridCallback={() => updateGridSquare(1, 0)}
				currentState={gridState[1][0]}
			/>
			<Square
				updateGridCallback={() => updateGridSquare(1, 1)}
				currentState={gridState[1][1]}
			/>
			<Square
				updateGridCallback={() => updateGridSquare(1, 2)}
				currentState={gridState[1][2]}
			/>
			<Square
				updateGridCallback={() => updateGridSquare(2, 0)}
				currentState={gridState[2][0]}
			/>
			<Square
				updateGridCallback={() => updateGridSquare(2, 1)}
				currentState={gridState[2][1]}
			/>
			<Square
				updateGridCallback={() => updateGridSquare(2, 2)}
				currentState={gridState[2][2]}
			/>
		</div>
	);
}
