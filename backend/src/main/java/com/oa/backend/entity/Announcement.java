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

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;
    
    private String title;
    
    private String content;
    
    private String type;
    
    private String priority;
    
    private Date publishDate;
    
    private Date expirationDate;
    
    private Integer creatorId;
    
    @TableField(fill = FieldFill.INSERT)
    private Date createTime;
    
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private Date updateTime;
}
