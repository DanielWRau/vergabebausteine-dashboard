import { Show } from "@refinedev/mui";
import { useShow } from "@refinedev/core";
import { Typography, Stack } from "@mui/material";

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
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          ID
        </Typography>
        <Typography variant="body2">{record?.$id}</Typography>

        <Typography variant="body1" fontWeight="bold">
          Name
        </Typography>
        <Typography variant="body2">{record?.name}</Typography>

        <Typography variant="body1" fontWeight="bold">
          Email
        </Typography>
        <Typography variant="body2">{record?.email}</Typography>

        <Typography variant="body1" fontWeight="bold">
          Role
        </Typography>
        <Typography variant="body2">{record?.role}</Typography>

        <Typography variant="body1" fontWeight="bold">
          Created At
        </Typography>
        <Typography variant="body2">
          {record?.$createdAt ? new Date(record.$createdAt).toLocaleString() : ""}
        </Typography>

        <Typography variant="body1" fontWeight="bold">
          Updated At
        </Typography>
        <Typography variant="body2">
          {record?.$updatedAt ? new Date(record.$updatedAt).toLocaleString() : ""}
        </Typography>
      </Stack>
    </Show>
  );
};
