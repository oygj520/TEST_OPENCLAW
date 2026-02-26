package com.oa.backend.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 公告 DTO
 */
@Data
public class AnnouncementDTO implements Serializable {
    
    private static final long serialVersionUID = 1L;

    private Integer id;
    private String title;
    private String content;
    private String type;
    private String priority;
    private Date publishDate;
    private Date expirationDate;
    private Integer creatorId;
    private Date createTime;
    private Date updateTime;
    
    // 扩展字段
    private String creatorName;
}
