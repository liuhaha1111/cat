# 宠物店铺数据库表设计

## 1. 套餐表 (packages)

| 字段名 | 数据类型 | 约束 | 描述 |
| :--- | :--- | :--- | :--- |
| `id` | `SERIAL` | `PRIMARY KEY` | 套餐ID |
| `name` | `VARCHAR(100)` | `NOT NULL` | 套餐名称 |
| `price` | `DECIMAL(10,2)` | `NOT NULL` | 套餐价格 |
| `duration` | `INTEGER` | `NOT NULL` | 服务用时（分钟） |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | 创建时间 |
| `updated_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | 更新时间 |

## 2. 预约表 (appointments)

| 字段名 | 数据类型 | 约束 | 描述 |
| :--- | :--- | :--- | :--- |
| `id` | `SERIAL` | `PRIMARY KEY` | 预约ID |
| `package_id` | `INTEGER` | `REFERENCES packages(id)` | 套餐ID |
| `pet_name` | `VARCHAR(50)` | `NOT NULL` | 宠物昵称 |
| `start_time` | `TIMESTAMP` | `NOT NULL` | 开始时间 |
| `end_time` | `TIMESTAMP` | `NOT NULL` | 结束时间 |
| `notes` | `TEXT` | | 备注 |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | 创建时间 |
| `updated_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | 更新时间 |

## 3. 索引设计

为了提高查询性能，建议在以下字段上创建索引：

1. `appointments` 表：
   - `start_time` 和 `end_time` 字段上创建索引，用于快速查询时间冲突
   - `package_id` 字段上创建外键索引

2. `packages` 表：
   - 无需额外索引，主键已自动创建索引

## 4. 数据约束

1. 时间约束：
   - `start_time` 必须小于 `end_time`
   - 新预约的时间范围不能与现有预约重叠

2. 价格约束：
   - `price` 必须大于 0

3. 时间约束：
   - `duration` 必须大于 0

## 5. 示例数据

### 套餐表示例数据：

| id | name | price | duration |
| :--- | :--- | :--- | :--- |
| 1 | 基础洗护 | 88.00 | 60 |
| 2 | 深度洗护 | 128.00 | 90 |
| 3 | 豪华洗护 | 168.00 | 120 |

### 预约表示例数据：

| id | package_id | pet_name | start_time | end_time | notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 1 | 小白 | 2026-01-29 10:00:00 | 2026-01-29 11:00:00 | 敏感肌 |
| 2 | 2 | 小黑 | 2026-01-29 14:00:00 | 2026-01-29 15:30:00 | 掉毛严重 |