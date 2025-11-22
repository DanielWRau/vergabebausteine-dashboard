import { List, useTable, EditButton, ShowButton, DeleteButton } from "@refinedev/antd";
import { Table, Space } from "antd";
import type { IResourceComponentsProps } from "@refinedev/core";

interface IUser {
  $id: string;
  name: string;
  email: string;
  role: string;
  $createdAt: string;
  $updatedAt: string;
}

export const UserList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable<IUser>({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...(tableProps as any)} rowKey="$id">
        <Table.Column dataIndex="$id" title="ID" width={250} />
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column dataIndex="email" title="Email" />
        <Table.Column dataIndex="role" title="Role" />
        <Table.Column
          dataIndex="$createdAt"
          title="Created At"
          render={(value) => new Date(value).toLocaleString()}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: IUser) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.$id} />
              <ShowButton hideText size="small" recordItemId={record.$id} />
              <DeleteButton hideText size="small" recordItemId={record.$id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
