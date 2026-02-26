package com.oa.backend.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.oa.backend.entity.Announcement;
import com.oa.backend.mapper.AnnouncementMapper;
import org.springframework.stereotype.Service;

/**
 * 公告服务
 */
@Service
public class AnnouncementService extends ServiceImpl<AnnouncementMapper, Announcement> {
}
