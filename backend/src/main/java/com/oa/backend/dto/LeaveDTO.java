package com.oa.backend.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 请假/加班 DTO
 */
@Data
public class LeaveDTO implements Serializable {
    
    private static final long serialVersionUID = 1L;

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
    private Date createTime;
    private Date updateTime;
    
    // 扩展字段
    private String leaveTypeName;
    private String userName;
}
