/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import logo from "./logo.svg";
import { List, Input, Button, Col, Row } from "antd";

interface Task {
  id: number;
  text: string;
  done: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState("");

  const addTask = () => {
    setTasks([...tasks, { id: Date.now(), text: newTaskText, done: false }]);
    setNewTaskText("");
  };

  const toggleTaskDone = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div style={{ padding: "2%" }}>
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
          <hr style={{ marginTop: "3%" }}></hr>
          <h1 style={{ textAlign: "center" }}>Minhas tarefas</h1>
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
    </div>
  );
}

export default App;
