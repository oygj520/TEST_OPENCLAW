package com.oa.backend.dto;

import lombok.Data;

import java.io.Serializable;

/**
 * 登录请求 DTO
 */
@Data
public class LoginRequest implements Serializable {
    
    private static final long serialVersionUID = 1L;

    private String username;
    private String password;
}
