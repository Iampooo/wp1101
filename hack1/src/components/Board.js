/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2021 10 ]
****************************************************************************/

import React, { useEffect, useState } from 'react';
import Cell from './Cell';
import Modal from './Modal';
import Dashboard from './Dashboard';
import createBoard from '../util/createBoard';
import { revealed } from '../util/reveal';
import './css/Board.css'


const Board = ({ boardSize, mineNum, backToHome }) => {
    const [board, setBoard] = useState([]);                     // An 2-dimentional array. It is used to store the board.
    const [nonMineCount, setNonMineCount] = useState(0);        // An integer variable to store the number of cells whose value are not '💣'.
    const [mineLocations, setMineLocations] = useState([]);     // An array to store all the coordinate of '💣'.
    const [gameOver, setGameOver] = useState(false);            // A boolean variable. If true, means you lose the game (Game over).
    const [remainFlagNum, setRemainFlagNum] = useState(mineNum);      // An integer variable to store the number of remain flags.
    const [win, setWin] = useState(false);                      // A boolean variable. If true, means that you win the game.

    useEffect(() => {
        // Calling the function
        freshBoard();
    }, []);

    // Creating a board
    const freshBoard = () => {
        {/* -- TODO 3-1 -- */}
        {/* Useful Hint: createBoard(...) */}
        const newBoard = createBoard(boardSize, mineNum);
        setBoard(newBoard.board);
        setMineLocations(newBoard.mineLocations);
        setNonMineCount()
    }
    if(!board){
        return <div>Loading</div>;
    }

    const restartGame = () => {
        {/* -- TODO 5-2 -- */}
        {/* Useful Hint: freshBoard() */}

    }

    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) => {
        // To not have a dropdown on right click
        e.preventDefault();
        if(!board[x][y].revealed) {
            if(remainFlagNum>0){

                let newBoard = JSON.parse(JSON.stringify(board));
                (board[x][y].flagged) ? newBoard[x][y].flagged = false : newBoard[x][y].flagged = true;
                setBoard(newBoard);
                if(board[x][y].flagged) setRemainFlagNum(remainFlagNum+1);
                else setRemainFlagNum(remainFlagNum-1);
            }
        }
        // Deep copy of a state
        {/* -- TODO 3-2 -- */}
        {/* Useful Hint: A cell is going to be flagged. 'x' and 'y' are the xy-coordinate of the cell. */}
        {/* Reminder: If the cell is already flagged, you should unflagged it. Also remember to update the board and the remainFlagNum. */}
        {/* Reminder: The cell can be flagged only when it is not revealed. */}

    };

    const revealCell = (x, y) => {
        {/* -- TODO 4-1 -- */}
        {/* Reveal the cell */}
        {/* Useful Hint: The function in reveal.js may be useful. You should consider if the cell you want to reveal is a location of mines or not. */}
        revealed(board,board.x,board.y,nonMineCount);
        {/* Reminder: Also remember to handle the condition that after you reveal this cell then you win the game. */}

    };
    return(
        <div className = 'boardPage' >
            <div className = 'boardWrapper' >
                 <div className = 'boardContainer'>
                    <Dashboard remainFlagNum={remainFlagNum} gameOver={gameOver}/>
                        {board.map((singleRow, index) => {
                                return(
                                <div id = {`row${index}`}style={{display: 'flex'}}>{singleRow.map((singleBlock, index2) => {
                                    return <Cell rowIdx={index} colIdx={index2} detail={singleBlock} updateFlag={updateFlag} revealCell={revealCell}></Cell>
                                })}</div>
                            );
                        }
                        )}
                </div>
            </div>
         </div>
    );




}

export default Board