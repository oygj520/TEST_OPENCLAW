-- MySQL 初始脚本

CREATE DATABASE IF NOT EXISTS oa_db;
USE oa_db;

-- 用户表
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT COMMENT '主键',
  username VARCHAR(50) UNIQUE NOT NULL COMMENT '用户名',
  nickname VARCHAR(50) DEFAULT NULL COMMENT '昵称',
  email VARCHAR(100) DEFAULT NULL COMMENT '邮箱',
  phone VARCHAR(20) DEFAULT NULL COMMENT '手机号',
  password VARCHAR(255) NOT NULL COMMENT '密码',
  avatar VARCHAR(500) DEFAULT NULL COMMENT '头像',
  department VARCHAR(50) DEFAULT NULL COMMENT '部门',
  position VARCHAR(50) DEFAULT NULL COMMENT '职位',
  status TINYINT DEFAULT 1 COMMENT '状态：0-禁用，1-启用',
  role TINYINT DEFAULT 0 COMMENT '角色：0-普通用户，1-管理员',
  create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

-- 请假/加班申请表
CREATE TABLE IF NOT EXISTS leaves (
  id INT PRIMARY KEY AUTO_INCREMENT COMMENT '主键',
  user_id INT NOT NULL COMMENT '申请人ID',
  type VARCHAR(20) NOT NULL COMMENT '类型：leave-事假，overtime-加班，business_trip-出差，sick-病假',
  start_date DATE NOT NULL COMMENT '开始日期',
  end_date DATE NOT NULL COMMENT '结束日期',
  days INT DEFAULT 0 COMMENT '天数',
  reason VARCHAR(500) DEFAULT NULL COMMENT '原因',
  status VARCHAR(20) DEFAULT 'pending' COMMENT '状态：pending-待处理，approved-已批准，rejected-已拒绝',
  approved_by INT DEFAULT NULL COMMENT '审批人ID',
  approved_at TIMESTAMP NULL DEFAULT NULL COMMENT '审批时间',
  create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='请假/加班申请表';

-- 公告表
CREATE TABLE IF NOT EXISTS announcements (
  id INT PRIMARY KEY AUTO_INCREMENT COMMENT '主键',
  title VARCHAR(200) NOT NULL COMMENT '标题',
  content TEXT NOT NULL COMMENT '内容',
  type VARCHAR(20) DEFAULT 'notice' COMMENT '类型：notice-通知，announcement-公告，event-活动',
  priority VARCHAR(20) DEFAULT 'medium' COMMENT '优先级：low-低，medium-中，high-高',
  publish_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '发布日期',
  expiration_date TIMESTAMP NULL DEFAULT NULL COMMENT '过期日期',
  creator_id INT DEFAULT NULL COMMENT '创建人ID',
  create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  FOREIGN KEY (creator_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='公告表';

-- 公告阅读记录表
CREATE TABLE IF NOT EXISTS announcement_reads (
  id INT PRIMARY KEY AUTO_INCREMENT COMMENT '主键',
  announcement_id INT NOT NULL COMMENT '公告ID',
  user_id INT NOT NULL COMMENT '用户ID',
  read_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '阅读时间',
  create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  FOREIGN KEY (announcement_id) REFERENCES announcements(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='公告阅读记录表';

-- 插入测试数据
INSERT INTO users (username, nickname, email, password, department, position, role, status) 
VALUES 
('admin', '管理员', 'admin@example.com', '$2a$10$N9qo8uLOickgx2ZMQZqMyeli51zV5YkC5Z3h4FtlH9vBk1n3eGzKu', 'hr', 'ceo', 1, 1),
('zhangsan', '张三', 'zhangsan@example.com', '$2a$10$N9qo8uLOickgx2ZMQZqMyeli51zV5YkC5Z3h4FtlH9vBk1n3eGzKu', 'it', 'manager', 0, 1),
('lisi', '李四', 'lisi@example.com', '$2a$10$N9qo8uLOickgx2ZMQZqMyeli51zV5YkC5Z3h4FtlH9vBk1n3eGzKu', 'sales', 'employee', 0, 1);

-- 插入公告测试数据
INSERT INTO announcements (title, content, type, priority) 
VALUES 
('关于系统升级的通知', '系统将于本周六进行升级维护，预计需要4小时。', 'notice', 'high'),
('周末团建活动', '本周六下午组织部门团建活动，地点在XX公园。', 'event', 'medium');
