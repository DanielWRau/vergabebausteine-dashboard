import { Show } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography } from "antd";

const { Title, Text } = Typography;

interface IUser {
  $id: string;
  name: string;
  email: string;
  role: string;
  $createdAt: string;
  $updatedAt: string;
}

export const UserShow: React.FC = () => {
  const { query } = useShow<IUser>();
  const { data, isLoading } = query;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>ID</Title>
      <Text>{record?.$id}</Text>

      <Title level={5}>Name</Title>
      <Text>{record?.name}</Text>

      <Title level={5}>Email</Title>
      <Text>{record?.email}</Text>

      <Title level={5}>Role</Title>
      <Text>{record?.role}</Text>

      <Title level={5}>Created At</Title>
      <Text>{record?.$createdAt ? new Date(record.$createdAt).toLocaleString() : ""}</Text>

      <Title level={5}>Updated At</Title>
      <Text>{record?.$updatedAt ? new Date(record.$updatedAt).toLocaleString() : ""}</Text>
    </Show>
  );
};
