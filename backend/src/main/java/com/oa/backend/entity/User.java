package com.oa.backend.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 用户实体
 */
@Data
@TableName("users")
public class User implements Serializable {
    
    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;
    
    private String username;
    
    private String nickname;
    
    private String email;
    
    private String phone;
    
    private String password;
    
    private String avatar;
    
    private String department;
    
    private String position;
    
    private Integer status;
    
    private Integer role;
    
    @TableField(fill = FieldFill.INSERT)
    private Date createTime;
    
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private Date updateTime;
}
