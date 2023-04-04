import { GridStateEnum } from "@/utils/enums";
import * as React from "react";
import styles from "@/styles/Square.module.scss";

export interface props {
	updateGridCallback: () => void;
	currentState: GridStateEnum;
}

export default function Square({ updateGridCallback, currentState }: props) {
	let displayValue: string = "";
	let style: string = "";

	switch (currentState) {
		case GridStateEnum.Unselected:
			break;
		case GridStateEnum.Naughts:
			displayValue = "O";
			style = styles.naught;
			break;
		case GridStateEnum.Crosses:
			displayValue = "X";
			style = styles.cross;
			break;
		default:
			console.error("Unexpected value for square detected");
			break;
	}

	return (
		<div
			onClick={() => updateGridCallback()}
			className={[styles.square, style].join(" ")}
		>
			{displayValue}
		</div>
	);
}
