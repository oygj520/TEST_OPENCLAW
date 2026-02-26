package com.oa.backend.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 公告实体
 */
@Data
@TableName("announcements")
public class Announcement implements Serializable {
    
    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;
    
    /**
     * 标题
     */
    private String title;
    
    /**
     * 内容
     */
    private String content;
    
    /**
     * 类型：notice-通知，announcement-公告，event-活动
     */
    private String type;
    
    /**
     * 优先级：low-低，medium-中，high-高
     */
    private String priority;
    
    /**
     * 发布日期
     */
    private Date publishDate;
    
    /**
     * 过期日期
     */
    private Date expirationDate;
    
    /**
     * 创建人ID
     */
    private Integer creatorId;
    
    /**
     * 创建时间
     */
    @TableField(fill = FieldFill.INSERT)
    private Date createTime;
    
    /**
     * 更新时间
     */
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private Date updateTime;
}
