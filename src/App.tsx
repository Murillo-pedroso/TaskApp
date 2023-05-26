/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import { List, Input, Button, Col, Row, message } from "antd";
import { AppContainer, StyledRow, TaskTitle } from "./style";
interface Task {
  id: number;
  text: string;
  done: boolean;
}

function App() {
  const [newTaskText, setNewTaskText] = useState("");

  const initialTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTaskText.trim() === "") {
      message.error("A tarefa não pode ser vazia.");
      return;
    }
    const newTasks = [
      ...tasks,
      { id: Date.now(), text: newTaskText, done: false },
    ];
    setTasks(newTasks);
    setNewTaskText("");
    message.success("Tarefa adicionada com sucesso!");
  };

  const toggleTaskDone = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    message.success("Tarefa removida com sucesso!");
  };

  return (
    <AppContainer>
      <Row justify="center">
        <Col xs={22} sm={22} md={22} lg={14}>
          <Row gutter={[16, 16]}>
            <Col xs={14} sm={14} md={14} lg={18}>
              <Input
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                placeholder="Nova Tarefa"
                onPressEnter={addTask}
              />
            </Col>
            <Col xs={10} sm={10} md={10} lg={6}>
              <Button name="addTask" block onClick={addTask}>
                Adicionar Tarefa
              </Button>
            </Col>
          </Row>
          <StyledRow />
          <TaskTitle>Minhas tarefas</TaskTitle>
          <List
            itemLayout="horizontal"
            dataSource={tasks}
            renderItem={(task) => (
              <List.Item
                actions={[
                  <a
                    key="list-loadmore-edit"
                    onClick={() => toggleTaskDone(task.id)}
                  >
                    {task.done ? "Refazer tarefa" : "Finalizar Tarefa"}
                  </a>,
                  <a
                    key="list-loadmore-more"
                    onClick={() => deleteTask(task.id)}
                  >
                    Deletar
                  </a>,
                ]}
              >
                <List.Item.Meta
                  title={
                    <a style={{ fontSize: "18px" }} href="#">
                      {task.text}
                    </a>
                  }
                  description={task.done ? "Finalizada" : "Tarefa em Andamento"}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </AppContainer>
  );
}

export default App;
