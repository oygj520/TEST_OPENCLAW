package com.oa.backend.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 公告阅读记录
 */
@Data
@TableName("announcement_reads")
public class AnnouncementRead implements Serializable {
    
    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;
    
    /**
     * 公告ID
     */
    private Integer announcementId;
    
    /**
     * 用户ID
     */
    private Integer userId;
    
    /**
     * 阅读时间
     */
    private Date readTime;
    
    /**
     * 创建时间
     */
    @TableField(fill = FieldFill.INSERT)
    private Date createTime;
}
