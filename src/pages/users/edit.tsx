import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";
import type { IResourceComponentsProps } from "@refinedev/core";

export const UserEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter the user's name",
            },
          ]}
        >
          <Input placeholder="Enter user's full name" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter the user's email",
            },
            {
              type: "email",
              message: "Please enter a valid email address",
            },
          ]}
        >
          <Input placeholder="user@example.com" />
        </Form.Item>
        <Form.Item
          label="Role"
          name="role"
          rules={[
            {
              required: true,
              message: "Please select a role",
            },
          ]}
        >
          <Select placeholder="Select user role">
            <Select.Option value="admin">Admin</Select.Option>
            <Select.Option value="user">User</Select.Option>
            <Select.Option value="guest">Guest</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Edit>
  );
};
