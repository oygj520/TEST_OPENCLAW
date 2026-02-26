# 数据库初始化完成后的 SQL 脚本

-- 确认数据库和表创建成功
SHOW DATABASES;
USE oa_db;
SHOW TABLES;

-- 查询测试数据
SELECT * FROM users;
SELECT * FROM announcements;
