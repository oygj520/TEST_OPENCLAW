package com.oa.backend.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 请假/加班申请实体
 */
@Data
@TableName("leaves")
public class Leave implements Serializable {
    
    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;
    
    private Integer userId;
    
    private String type;
    
    private Date startDate;
    
    private Date endDate;
    
    private Integer days;
    
    private String reason;
    
    private String status;
    
    private Integer approvedBy;
    
    private Date approvedAt;
    
    @TableField(fill = FieldFill.INSERT)
    private Date createTime;
    
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private Date updateTime;
}
