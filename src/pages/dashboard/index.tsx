import React from "react";
import { Card, Col, Row, Statistic, Typography } from "antd";
import { useList } from "@refinedev/core";
import {
  UserOutlined,
  TeamOutlined,
  RocketOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

export const DashboardPage: React.FC = () => {
  const { query } = useList({
    resource: "users",
    pagination: { mode: "off" },
  });

  const totalUsers = query.data?.total ?? 0;
  const activeUsers = query.data?.data?.filter((user: any) => user.role === "admin")?.length ?? 0;
  const isLoading = query.isLoading;

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Dashboard</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={isLoading} bordered={false}>
            <Statistic
              title="Total Users"
              value={totalUsers}
              prefix={<UserOutlined style={{ color: "#1890ff" }} />}
              valueStyle={{ color: "#1890ff", fontSize: "24px", fontWeight: 600 }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={isLoading} bordered={false}>
            <Statistic
              title="Admin Users"
              value={activeUsers}
              prefix={<TeamOutlined style={{ color: "#52c41a" }} />}
              valueStyle={{ color: "#52c41a", fontSize: "24px", fontWeight: 600 }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={isLoading} bordered={false}>
            <Statistic
              title="Active Projects"
              value={0}
              prefix={<RocketOutlined style={{ color: "#faad14" }} />}
              valueStyle={{ color: "#faad14", fontSize: "24px", fontWeight: 600 }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={isLoading} bordered={false}>
            <Statistic
              title="Pending Tasks"
              value={0}
              prefix={<ClockCircleOutlined style={{ color: "#ff4d4f" }} />}
              valueStyle={{ color: "#ff4d4f", fontSize: "24px", fontWeight: 600 }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
        <Col xs={24} lg={16}>
          <Card title="Recent Activity" bordered={false}>
            <div style={{ padding: "24px 0", textAlign: "center", color: "#999" }}>
              <ClockCircleOutlined style={{ fontSize: "48px", marginBottom: "16px" }} />
              <p>No recent activity to display</p>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Quick Actions" bordered={false}>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <a href="/users/create" style={{
                padding: "12px",
                border: "1px solid #d9d9d9",
                borderRadius: "6px",
                textAlign: "center",
                display: "block",
                transition: "all 0.3s"
              }}>
                <UserOutlined /> Create New User
              </a>
              <a href="/ai-demo" style={{
                padding: "12px",
                border: "1px solid #d9d9d9",
                borderRadius: "6px",
                textAlign: "center",
                display: "block",
                transition: "all 0.3s"
              }}>
                <RocketOutlined /> Try AI Demo
              </a>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
