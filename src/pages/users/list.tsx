import { List, useTable, EditButton, ShowButton, DeleteButton } from "@refinedev/antd";
import { Space } from "antd";
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
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
            <th style={{ padding: "12px", textAlign: "left", fontWeight: 600 }}>ID</th>
            <th style={{ padding: "12px", textAlign: "left", fontWeight: 600 }}>Name</th>
            <th style={{ padding: "12px", textAlign: "left", fontWeight: 600 }}>Email</th>
            <th style={{ padding: "12px", textAlign: "left", fontWeight: 600 }}>Role</th>
            <th style={{ padding: "12px", textAlign: "left", fontWeight: 600 }}>Created At</th>
            <th style={{ padding: "12px", textAlign: "left", fontWeight: 600 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {(tableProps.dataSource || []).map((record: IUser) => (
            <tr key={record.$id} style={{ borderBottom: "1px solid #f0f0f0" }}>
              <td style={{ padding: "12px" }}>{record.$id}</td>
              <td style={{ padding: "12px" }}>{record.name}</td>
              <td style={{ padding: "12px" }}>{record.email}</td>
              <td style={{ padding: "12px" }}>{record.role}</td>
              <td style={{ padding: "12px" }}>{new Date(record.$createdAt).toLocaleString()}</td>
              <td style={{ padding: "12px" }}>
                <Space>
                  <EditButton hideText size="small" recordItemId={record.$id} />
                  <ShowButton hideText size="small" recordItemId={record.$id} />
                  <DeleteButton hideText size="small" recordItemId={record.$id} />
                </Space>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </List>
  );
};
