package com.oa.backend.dto;

import lombok.Data;

import java.io.Serializable;

/**
 * 登录响应 DTO
 */
@Data
public class LoginResponse implements Serializable {
    
    private static final long serialVersionUID = 1L;

    private String token;
    private UserDTO user;
}
