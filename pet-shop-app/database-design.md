# 数据库表设计文档

## 1. 套餐表 (packages)

### 表结构
| 字段名 | 数据类型 | 约束 | 描述 |
| :--- | :--- | :--- | :--- |
| `id` | `SERIAL` | `PRIMARY KEY` | 套餐ID |
| `name` | `VARCHAR(100)` | `NOT NULL` | 套餐名称 |
| `price` | `DECIMAL(10,2)` | `NOT NULL` | 套餐价格 |
| `duration` | `INTEGER` | `NOT NULL` | 服务用时（分钟） |
| `description` | `TEXT` | | 套餐描述 |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | 创建时间 |
| `updated_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | 更新时间 |

### 示例数据
```sql
INSERT INTO packages (name, price, duration, description) VALUES
('基础洗护', 88.00, 60, '包含洗澡、吹干、梳理毛发'),
('深度洗护', 128.00, 90, '包含基础洗护+修剪指甲+清理耳道'),
('豪华洗护', 168.00, 120, '包含深度洗护+造型修剪+精油护理');
```

## 2. 预约表 (appointments)

### 表结构
| 字段名 | 数据类型 | 约束 | 描述 |
| :--- | :--- | :--- | :--- |
| `id` | `SERIAL` | `PRIMARY KEY` | 预约ID |
| `package_id` | `INTEGER` | `REFERENCES packages(id)` | 套餐ID |
| `pet_name` | `VARCHAR(100)` | `NOT NULL` | 宠物昵称 |
| `start_time` | `TIMESTAMP` | `NOT NULL` | 开始时间 |
| `end_time` | `TIMESTAMP` | `NOT NULL` | 结束时间 |
| `notes` | `TEXT` | | 备注信息 |
| `status` | `VARCHAR(20)` | `DEFAULT 'pending'` | 预约状态（pending/confirmed/completed/canceled） |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | 创建时间 |
| `updated_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | 更新时间 |

### 时间冲突检查逻辑
在插入新预约前，需要检查是否与现有预约时间冲突。冲突条件：
- 新预约的开始时间 < 现有预约的结束时间
- 新预约的结束时间 > 现有预约的开始时间

### SQL查询示例
```sql
-- 检查时间冲突
SELECT * FROM appointments 
WHERE start_time < :newEndTime AND end_time > :newStartTime;

-- 如果返回结果不为空，则表示存在时间冲突
```

## 3. 建表SQL语句

### 创建套餐表
```sql
CREATE TABLE IF NOT EXISTS packages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    duration INTEGER NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 创建预约表
```sql
CREATE TABLE IF NOT EXISTS appointments (
    id SERIAL PRIMARY KEY,
    package_id INTEGER REFERENCES packages(id),
    pet_name VARCHAR(100) NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    notes TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 4. 索引设计

为了提高时间冲突检查的查询性能，建议在预约表的开始时间和结束时间字段上创建索引：

```sql
CREATE INDEX idx_appointments_start_time ON appointments(start_time);
CREATE INDEX idx_appointments_end_time ON appointments(end_time);
```