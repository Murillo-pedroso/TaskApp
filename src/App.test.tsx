/* eslint-disable testing-library/await-async-query */
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("Adicionar Tarefa", () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Nova Tarefa/i);
  fireEvent.change(input, { target: { value: "Levar o lixo" } });
  const addBtn = screen.getByText(/Adicionar Tarefa/i);
  fireEvent.click(addBtn);
  expect(screen.getByText("Levar o lixo")).toBeInTheDocument();
});

test("Finalizar Tarefa", () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Nova Tarefa/i);
  fireEvent.change(input, { target: { value: "Comprar pão" } });
  const addBtn = screen.getByText(/Adicionar Tarefa/i);
  fireEvent.click(addBtn);
  const finalizeBtn = screen.getByText(/Finalizar Tarefa/i);
  fireEvent.click(finalizeBtn);
  expect(screen.getByText(/Finalizada/i)).toBeInTheDocument();
});

test("Deletar Tarefa", () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Nova Tarefa/i);
  fireEvent.change(input, { target: { value: "Fazer jantar" } });
  const addBtn = screen.getByText(/Adicionar Tarefa/i);
  fireEvent.click(addBtn);
  const deleteBtn = screen.getByText(/Deletar/i);
  fireEvent.click(deleteBtn);
  expect(screen.queryByText("Fazer jantar")).toBeNull();
});
