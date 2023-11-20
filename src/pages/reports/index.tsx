import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import Header from "~/components/header/Header";
import BoardSelector from "~/components/report/BoardSelector";
import BoardsTable from "~/components/report/BoardsTable";
import Loader from "~/components/ui/Loader";
import { useHandleError } from "~/hooks/useHandleError";
import { useGetBoardsQuery } from "~/store/api";
import { setCurrentBoard } from "~/store/boardSlice";
import {
  transformData,
  type TransformedData,
} from "~/utils/transformDataForReport";

const Report: NextPage = () => {
  const router = useRouter();
  const [selectedBoardId, setSelectedBoardId] = useState("");

  const dispatch = useDispatch();
  const { data: boards, isLoading, error } = useGetBoardsQuery();
  const currentBoard = boards?.find((board) => board.id === selectedBoardId);

  const handleError = useHandleError();

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

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [dispatch, error, handleError]);

  return (
    <main>
      <Header report boardName={currentBoard?.name} />
      {isLoading ? (
        <div className="flex h-screen justify-center">
          <Loader color="#635fc7" size={24} />
        </div>
      ) : (
        <div className="mx-4">
          <BoardSelector onBoardSelect={handleBoardSelect} />
          <BoardsTable data={transformedData} handleClick={handleClick} />
        </div>
      )}
    </main>
  );
};

export default Report;
