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

test("marca uma tarefa como não finalizada", () => {
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

  // Marca a tarefa como finalizada
  const finalizeButton = screen.getByTestId(/finalize-task-.*/);
  fireEvent.click(finalizeButton);

  // Verifica se a tarefa foi marcada como finalizada
  const finalizedTaskItem = screen.getByText("Finalizada");
  expect(finalizedTaskItem).toBeInTheDocument();

  // Marca a tarefa como não finalizada
  fireEvent.click(finalizeButton);

  // Verifica se a tarefa foi marcada como não finalizada
  const notFinalizedTaskItem = screen.getByText("Tarefa em Andamento");
  expect(notFinalizedTaskItem).toBeInTheDocument();
});

test("adiciona várias tarefas", () => {
  render(<App />);

  // Adiciona três tarefas
  const inputElement = screen.getByPlaceholderText(
    "Nova Tarefa"
  ) as HTMLInputElement;
  const addTaskButton = screen.getByText("Adicionar Tarefa");

  fireEvent.change(inputElement, { target: { value: "Tarefa 1" } });
  fireEvent.click(addTaskButton);

  fireEvent.change(inputElement, { target: { value: "Tarefa 2" } });
  fireEvent.click(addTaskButton);

  fireEvent.change(inputElement, { target: { value: "Tarefa 3" } });
  fireEvent.click(addTaskButton);

  // Verifica se as tarefas foram adicionadas à lista
  const task1 = screen.getByText("Tarefa 1");
  const task2 = screen.getByText("Tarefa 2");
  const task3 = screen.getByText("Tarefa 3");

  expect(task1).toBeInTheDocument();
  expect(task2).toBeInTheDocument();
  expect(task3).toBeInTheDocument();
});

test("limpa o campo de nova tarefa após adicionar", () => {
  render(<App />);

  // Preenche o campo de nova tarefa
  const inputElement = screen.getByPlaceholderText(
    "Nova Tarefa"
  ) as HTMLInputElement;
  fireEvent.change(inputElement, { target: { value: "Nova Tarefa" } });

  // Verifica se o campo foi preenchido corretamente
  expect(inputElement.value).toBe("Nova Tarefa");

  // Adiciona a tarefa
  const addTaskButton = screen.getByText("Adicionar Tarefa");
  fireEvent.click(addTaskButton);

  // Verifica se o campo de nova tarefa foi limpo
  expect(inputElement.value).toBe("");
});
