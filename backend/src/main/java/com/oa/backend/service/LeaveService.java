package com.oa.backend.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.oa.backend.entity.Leave;
import com.oa.backend.mapper.LeaveMapper;
import org.springframework.stereotype.Service;

/**
 * 请假/加班服务
 */
@Service
public class LeaveService extends ServiceImpl<LeaveMapper, Leave> {
}
