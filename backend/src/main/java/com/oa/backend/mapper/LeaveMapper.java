package com.oa.backend.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.oa.backend.entity.Leave;
import org.apache.ibatis.annotations.Mapper;

/**
 * 请假/加班 Mapper
 */
@Mapper
public interface LeaveMapper extends BaseMapper<Leave> {
}
