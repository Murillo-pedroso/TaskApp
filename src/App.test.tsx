import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("deleta uma tarefa", () => {
  render(<App />);

  // Adiciona uma tarefa
  const addTaskButton = screen.getByText("Adicionar Tarefa");
  const inputElement = screen.getByPlaceholderText(
    "Nova Tarefa"
  ) as HTMLInputElement;
  fireEvent.change(inputElement, { target: { value: "Nova Tarefa" } });
  fireEvent.click(addTaskButton);

  // Verifica se a tarefa foi adicionada à lista
  const taskItem = screen.getByText("Nova Tarefa");
  expect(taskItem).toBeInTheDocument();

  // Deleta a tarefa
  const deleteButton = screen.getByTestId(/delete-task-.*/);
  fireEvent.click(deleteButton);

  // Verifica se a tarefa foi removida da lista
  expect(taskItem).not.toBeInTheDocument();
});
