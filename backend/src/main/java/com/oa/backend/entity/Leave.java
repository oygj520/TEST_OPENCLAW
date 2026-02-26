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

    /**
     * 主键
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;
    
    /**
     * 申请人ID
     */
    private Integer userId;
    
    /**
     * 类型：leave-事假，overtime-加班，business_trip-出差，sick-病假
     */
    private String type;
    
    /**
     * 开始日期
     */
    private Date startDate;
    
    /**
     * 结束日期
     */
    private Date endDate;
    
    /**
     * 天数
     */
    private Integer days;
    
    /**
     * 原因
     */
    private String reason;
    
    /**
     * 状态：pending-待处理，approved-已批准，rejected-已拒绝
     */
    private String status;
    
    /**
     * 审批人ID
     */
    private Integer approvedBy;
    
    /**
     * 审批时间
     */
    private Date approvedAt;
    
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
