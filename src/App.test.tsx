/* eslint-disable testing-library/await-async-query */
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("Adicionar Tarefa", () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Nova Tarefa/i);
  fireEvent.change(input, { target: { value: "Levar o lixo" } });
  const addBtn = screen.getByText(/Adicionar Tarefa/i);
  addBtn.click();
  expect("Levar o lixo").toContain("Levar o lixo");
});
