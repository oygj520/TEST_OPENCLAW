package com.oa.backend.dto;

import lombok.Data;

import java.io.Serializable;

/**
 * 用户信息 DTO
 */
@Data
public class UserDTO implements Serializable {
    
    private static final long serialVersionUID = 1L;

    private Integer id;
    private String username;
    private String nickname;
    private String email;
    private String phone;
    private String avatar;
    private String department;
    private String position;
    private Integer role;
    private Integer status;
}
