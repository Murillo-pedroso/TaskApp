// App.tsx
import React, { useEffect, useState } from "react";
import { List, Input, Button, Col, Row, message } from "antd";
import { AppContainer, StyledRow, TaskTitle } from "./style";

interface Task {
  id: number;
  text: string;
  done: boolean;
}

function App() {
  const [newTaskText, setNewTaskText] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const initialTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(initialTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTaskText.trim() === "") {
      message.error("A tarefa não pode ser vazia.");
      return;
    }
    const newTask: Task = {
      id: Date.now(),
      text: newTaskText,
      done: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskText("");
    message.success("Tarefa adicionada com sucesso!");
  };

  const handleToggleTaskDone = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id: number) => {
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
                onPressEnter={handleAddTask}
              />
            </Col>
            <Col xs={10} sm={10} md={10} lg={6}>
              <Button name="addTask" block onClick={handleAddTask}>
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
                key={task.id}
                actions={[
                  <Button
                    key={`finalize-task-${task.id}`}
                    onClick={() => handleToggleTaskDone(task.id)}
                    data-testid={`finalize-task-${task.id}`}
                  >
                    {task.done ? "Refazer tarefa" : "Finalizar Tarefa"}
                  </Button>,
                  <Button
                    key={`delete-task-${task.id}`}
                    onClick={() => handleDeleteTask(task.id)}
                    data-testid={`delete-task-${task.id}`}
                  >
                    Deletar
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={<span style={{ fontSize: "18px" }}>{task.text}</span>}
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
