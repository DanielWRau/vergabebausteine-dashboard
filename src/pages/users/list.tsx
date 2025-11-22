import { List, EditButton, ShowButton, DeleteButton } from "@refinedev/mui";
import { useDataGrid } from "@refinedev/mui";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
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
  const { dataGridProps } = useDataGrid<IUser>();

  const columns: GridColDef[] = [
    {
      field: "$id",
      headerName: "ID",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "$createdAt",
      headerName: "Created At",
      minWidth: 180,
      flex: 1,
      renderCell: ({ value }) => new Date(value).toLocaleString(),
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 180,
      sortable: false,
      renderCell: ({ row }) => (
        <>
          <EditButton hideText recordItemId={row.$id} />
          <ShowButton hideText recordItemId={row.$id} />
          <DeleteButton hideText recordItemId={row.$id} />
        </>
      ),
    },
  ];

  return (
    <List>
      <DataGrid
        {...(dataGridProps as any)}
        columns={columns}
        getRowId={(row) => row.$id}
        autoHeight
      />
    </List>
  );
};
