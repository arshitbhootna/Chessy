import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";

export const ChessBoard = ({ board , socket , setBoard   }: {
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][];
    socket : WebSocket; 
    setBoard: any ;
}) => {
    const [from , setFrom] = useState<null | Square>(null);
    const [to , setTo] = useState<null | Square>(null);
    return <>
        <div className="text-white-200">
            {
                board.map((row, i) => {
                    return <div key={i} className="flex">
                        {
                            row.map((square, j) => {
                                const squareRepresentation = String.fromCharCode(97+ (j%8) ) + ""+ (8-i) as Square ;
                                return <div key={j} className={`w-8 h-8 ${
                                    (i+j)%2 ===0 ? 'bg-green-500' : 'bg-white'
                                }`} onClick={()=>{
                                    if(!from){
                                        setFrom(squareRepresentation);
                                    }
                                    else{
                                        socket.send(JSON.stringify({
                                            type:MOVE,
                                            payLoad:{
                                                from : from ,
                                                to : squareRepresentation
                                            }

                                        }))
                                        setFrom(null);
                                    }
                                }}>
                                    <div className="w-full justify-center flex h-full"
                                    >
                                        <div className="h-full justify-center flex-col"></div>
                                    {square ? square.type : "" }

                                    </div>

                                </div>
                            })
                        }
                    </div>
                })
        }
        </div>


    </>
}