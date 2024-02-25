import React, { useState, useEffect } from "react";
import { Tree, Button, Modal, Form, Input, Select } from "antd";
import { v4 as uuidv4 } from "uuid";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { TreeNode } = Tree;
const { Option } = Select;

const initialPositions = [
  {
    id: "1",
    name: "CEO",
    parentId: null,
    children: [
      {
        id: "2",
        name: "CTO",
        parentId: "1",
        children: [
          {
            id: "3",
            name: "Project Manager",
            parentId: "2",
            children: [
              {
                id: "4",
                name: "Product Owner",
                parentId: "3",
                children: [
                  {
                    id: "5",
                    name: "Tech Lead",
                    parentId: "4",
                    children: [
                      {
                        id: "6",
                        name: "Frontend Developer",
                        parentId: "5",
                      },
                      {
                        id: "7",
                        name: "Backend Developer",
                        parentId: "5",
                      },
                      {
                        id: "8",
                        name: "DevOps Engineer",
                        parentId: "5",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "9",
        name: "CFO",
        parentId: "1",
        children: [
          {
            id: "10",
            name: "Chef Accountant",
            parentId: "9",
            children: [
              {
                id: "11",
                name: "Financial Analyst",
                parentId: "10",
              },
              {
                id: "12",
                name: "Account and Payable",
                parentId: "10",
              },
            ],
          },
          {
            id: "13",
            name: "Internal Audit",
            parentId: "9",
          },
        ],
      },
    ],
  },
  {
    id: "14",
    name: "COO",
    parentId: null,
    children: [
      {
        id: "15",
        name: "Product Manager",
        parentId: "14",
      },
      {
        id: "16",
        name: "Operation Manager",
        parentId: "14",
      },
    ],
  },
  {
    id: "17",
    name: "HR",
    parentId: null,
  },
];

const initialEmployees = [
  {
    id: "1001",
    positionId: "6",
    name: "John Doe",
    age: 30,
    salary: 50000,
    sex: "Male",
  },
  {
    id: "1002",
    positionId: "7",
    name: "Jane Smith",
    age: 28,
    salary: 45000,
    sex: "Female",
  },
];

function Starting() {
  const [positions, setPositions] = useState(initialPositions);
  const [employees, setEmployees] = useState(initialEmployees);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    // Fetch positions and employees from API or local storage
    // Update the state with fetched positions and employees
  }, []);

  function handleAddPosition() {
    setSelectedPosition(null);
    setIsModalVisible(true);
  }

  function handleEditPosition(position) {
    setSelectedPosition(position);
    setIsModalVisible(true);
  }

  function handleDeletePosition(position) {
    const updatedPositions = deletePositionFromArray(positions, position.id);
    setPositions(updatedPositions);
  }

  function deletePositionFromArray(data, positionId) {
    return data.filter((position) => {
      if (position.children) {
        position.children = deletePositionFromArray(
          position.children,
          positionId
        );
      }
      return position.id !== positionId;
    });
  }
  function handleAddEmployee() {
    setSelectedEmployee(null);
    setIsModalVisible(true);
  }

  function handleEditEmployee(employee) {
    setSelectedEmployee(employee);
    setIsModalVisible(true);
  }

  function handleDeleteEmployee(employee) {
    const updatedEmployees = employees.filter((emp) => emp.id !== employee.id);
    setEmployees(updatedEmployees);
  }

  function handleFormSubmit(values) {
    if (selectedPosition) {
      // Update existing position
      const updatedPositions = [...positions];
      function handleFormSubmit(values) {
        if (selectedPosition) {
          // Update existing position
          const updatedPositions = updatePositionInArray(
            positions,
            selectedPosition.id,
            values.name
          );
          setPositions(updatedPositions);
        }
        // Rest of the code...
      }

      function updatePositionInArray(data, positionId, newName) {
        return data.map((position) => {
          if (position.id === positionId) {
            return { ...position, name: newName };
          } else if (position.children) {
            position.children = updatePositionInArray(
              position.children,
              positionId,
              newName
            );
          }
          return position;
        });
      }
      setPositions(updatedPositions);
    } else if (selectedEmployee) {
      // Update existing employee
      const updatedEmployees = employees.map((emp) => {
        if (emp.id === selectedEmployee.id) {
          return { ...emp, ...values };
        }
        return emp;
      });
      setEmployees(updatedEmployees);
    } else {
      // Add new employee
      const newEmployee = {
        id: uuidv4(),
        ...values,
      };
      setEmployees([...employees, newEmployee]);
    }

    form.resetFields();
    setIsModalVisible(false);
  }

  function handleCancel() {
    form.resetFields();
    setIsModalVisible(false);
  }

  function renderTreeNodes(data) {
    return data.map((position) => {
      if (position.children) {
        return (
          <TreeNode
            key={position.id}
            title={
              <span>
                {position.name}
                <Button
                  type="link"
                  size="small"
                  icon={<PlusOutlined />}
                  onClick={handleAddPosition}
                />
                <Button
                  type="link"
                  size="small"
                  icon={<EditOutlined />}
                  onClick={() => handleEditPosition(position)}
                />
                <Button
                  type="link"
                  size="small"
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeletePosition(position)}
                />
              </span>
            }
            dataRef={position}
          >
            {renderTreeNodes(position.children)}
          </TreeNode>
        );
      }

      return (
        <TreeNode
          key={position.id}
          title={
            <span>
              {position.name}
              <Button
                type="link"
                size="small"
                icon={<PlusOutlined />}
                onClick={handleAddPosition}
              />
              <Button
                type="link"
                size="small"
                icon={<EditOutlined />}
                onClick={() => handleEditPosition(position)}
              />
              <Button
                type="link"
                size="small"
                icon={<DeleteOutlined />}
                onClick={() => handleDeletePosition(position)}
              />
            </span>
          }
          dataRef={position}
        />
      );
    });
  }

  const renderEmployees = () => {
    if (selectedPosition) {
      return employees.map((employee) => {
        if (employee.positionId === selectedPosition.id) {
          return (
            <div key={employee.id}>
              <span>{employee.name}</span>
              <Button
                type="link"
                size="small"
                icon={<EditOutlined />}
                onClick={() => handleEditEmployee(employee)}
              />
              <Button
                type="link"
                size="small"
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteEmployee(employee)}
              />
            </div>
          );
        }
        return null;
      });
    }
    return null;
  };

  return (
    <div>
      <Tree>{renderTreeNodes(positions)}</Tree>

      {selectedPosition && (
        <div>
          <h2>Employees in {selectedPosition.name}</h2>
          {renderEmployees()}
          <Button type="primary" onClick={handleAddEmployee}>
            Add Employee
          </Button>
        </div>
      )}

      <Modal
        visible={isModalVisible}
        title={selectedPosition ? "Edit Position" : "Add Position"}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={form.submit}>
            {selectedPosition ? "Update" : "Add"}
          </Button>,
        ]}
      >
        <Form form={form} onFinish={handleFormSubmit}>
          <Form.Item
            name="name"
            label="Name"
            initialValue={selectedPosition ? selectedPosition.name : ""}
            rules={[
              {
                required: true,
                message: "Please enter the position name",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* Additional form fields for age, salary, and sex */}
          {/* Implement form fields for age, salary, and sex */}
        </Form>
      </Modal>
    </div>
  );
}

export default Starting;
