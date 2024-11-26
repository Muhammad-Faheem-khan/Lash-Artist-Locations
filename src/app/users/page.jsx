"use client";

import React, { useState, useEffect } from "react";
import { Table, Select, message, Spin } from "antd";
import "antd/dist/reset.css";
import "tailwindcss/tailwind.css";
import Loading from "../components/uiComponents/loading";
import { getAllCustomers, updateUserRole } from "../api/user";

const { Option } = Select;

const CustomerTable = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  const fetchCustomers = async (page, pageSize) => {
    console.log(page, pageSize);
    setLoading(true);
    try {
      const response = await getAllCustomers(page, pageSize);
      console.log(response.customers);
      if (response) {
        setData(response.customers);
        setPagination({
          current: page,
          pageSize,
          total: response.pagination.total,
        });
      } else {
        message.error(response.message || "Failed to fetch customers.");
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      const payload = { role: newRole };
      await updateUserRole(id, payload);

      setData((prevData) =>
        prevData.map((item) =>
          item.customerId === id ? { ...item, role: newRole } : item
        )
      );

      message.success("Role updated successfully");
    } catch (error) {
      console.log(error);
      message.error("Failed to update role");
    }
  };

  useEffect(() => {
    fetchCustomers(pagination.current, pagination.pageSize);
  }, [pagination.current]);

  const handleTableChange = (paginationInfo) => {
    setPagination({
      ...pagination,
      current: paginationInfo.current,
      pageSize: paginationInfo.pageSize,
    });
  };

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "firstName",
      key: "firstName",
      render: (text, record) =>
        `${record.firstName} ${record.lastName || ""}`.trim(),
    },
    {
      title: "Business Name",
      dataIndex: "customerId",
      key: "customerId",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (_, record) => (
        <Select
          value={record.role}
          onChange={(value) => handleRoleChange(record.customerId, value)}
          className="w-full"
        >
          <Option value="admin">Admin</Option>
          <Option value="student">Student</Option>
          <Option value="educator">Educator</Option>
          <Option value="partner">Partner</Option>
          <Option value="lightHQ">Light HQ</Option>
        </Select>
      ),
    },
  ];

  if (!isPageLoaded) {
    return <Loading />;
  }

  return (
    <div className="p-4 mt-[5rem]">
      <Spin spinning={loading}>
        <h1 className="text-4xl ml-2 text-center mb-6">Admin Page</h1>
        <h1 className="text-xl text-[#746253] ml-2 mb-3">Customers List</h1>
        <Table
          dataSource={data.map((item) => ({ ...item, key: item.id }))}
          columns={columns}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
          }}
          onChange={handleTableChange}
          bordered
          className="shadow-lg bg-white rounded-lg min-w-[650px]"
        />
      </Spin>
    </div>
  );
};

export default CustomerTable;
