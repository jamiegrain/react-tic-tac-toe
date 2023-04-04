import * as React from "react";
import styles from "@/styles/GameOver.module.scss";
import Button from "@mui/material/Button";

export interface props {
	winner: "naughts" | "crosses" | "draw" | null;
	resetCallback: () => void;
}

export function GameOver({ winner, resetCallback }: props) {
	let message: string = "";

	switch (winner) {
		case "naughts":
			message = "naughts wins!";
			break;
		case "crosses":
			message = "Crosses wins!";
			break;
		case "draw":
			message = "It's a tie!";
			break;
		case null:
			break;
		default:
			console.error("Unexpected value found for winner");
	}

	return (
		<div
			className={[
				styles.layout,
				winner !== null ? styles.visibile : styles.invisible,
			].join(" ")}
		>
			<div className={styles.displayBox}>
				<h2>{message}</h2>
				<Button
					onClick={resetCallback}
					variant={"contained"}
					className={styles.resetButton}
				>
					Reset
				</Button>
			</div>
		</div>
	);
}
