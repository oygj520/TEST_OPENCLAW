package com.oa.backend.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.oa.backend.entity.User;
import com.oa.backend.mapper.UserMapper;
import org.springframework.stereotype.Service;

/**
 * 用户服务
 */
@Service
public class UserService extends ServiceImpl<UserMapper, User> {
}
