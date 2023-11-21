import type { SearchResult } from "~/types";

export const getSearchContext = (result: SearchResult, searchTerm: string) => {
  const { item, type } = result;

  if (type === "Board" && "name" in item && item.name.includes(searchTerm)) {
    return { location: `Board: ${item.name}`, preview: item.name };
  }

  if (type === "Column" && "name" in item && item.name.includes(searchTerm)) {
    return { location: `Column: ${item.name}`, preview: item.name };
  }

  if (
    type === "Task" &&
    "title" in item &&
    "description" in item &&
    (item.title.includes(searchTerm) || item.description.includes(searchTerm))
  ) {
    const searchTermIndex = item.description
      .toLowerCase()
      .indexOf(searchTerm.toLowerCase());
    const previewStart = Math.max(0, searchTermIndex - 20);
    const previewEnd = Math.min(
      item.description.length,
      searchTermIndex + searchTerm.length + 20,
    );
    const preview =
      item.description.substring(previewStart, previewEnd) + "...";
    return {
      location: `Task: '${item.title}'`,
      preview,
    };
  }

  if (
    type === "Subtask" &&
    "title" in item &&
    item.title.includes(searchTerm)
  ) {
    return {
      location: `Subtask: '${item.title}'`,
      preview: item.title,
    };
  }

  return { location: "", preview: "" };
};
