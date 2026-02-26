package com.oa.backend.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.oa.backend.entity.AnnouncementRead;
import org.apache.ibatis.annotations.Mapper;

/**
 * 公告阅读记录 Mapper
 */
@Mapper
public interface AnnouncementReadMapper extends BaseMapper<AnnouncementRead> {
}
