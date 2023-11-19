import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import Header from "~/components/header/Header";
import BoardSelector from "~/components/report/BoardSelector";
import BoardsTable from "~/components/report/BoardsTable";
import { useGetBoardsQuery } from "~/store/api";
import { setCurrentBoard } from "~/store/boardSlice";
import {
  transformData,
  type TransformedData,
} from "~/utils/transformDataForReport";

const Report: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedBoardId, setSelectedBoardId] = useState("");
  const { data: boards, isLoading, isError } = useGetBoardsQuery();

  const currentBoard = boards?.find((board) => board.id === selectedBoardId);

  const transformedData: TransformedData = useMemo(
    () => transformData(boards!, selectedBoardId),
    [boards, selectedBoardId],
  );

  const handleBoardSelect = (boardId: string) => {
    setSelectedBoardId(boardId);
  };

  const handleClick = () => {
    if (currentBoard) {
      dispatch(setCurrentBoard(currentBoard));
    }

    void router.push("/boards");
  };

  if (isError) {
    return <div>There was an error fetching the boards</div>;
  }

  return (
    <main>
      <Header report boardName={currentBoard?.name} />
      {isLoading ? (
        <div className="my-24 flex justify-center">
          <p>Loading</p>
        </div>
      ) : (
        <>
          <BoardSelector onBoardSelect={handleBoardSelect} />
          <BoardsTable data={transformedData} handleClick={handleClick} />
        </>
      )}
    </main>
  );
};

export default Report;
