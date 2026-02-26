package com.oa.backend.dto;

import java.io.Serializable;

/**
 * 登录响应 DTO
 */
public class LoginResponse implements Serializable {
    
    private static final long serialVersionUID = 1L;

    private String token;
    private UserDTO user;

    // Getters and Setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    
    public UserDTO getUser() { return user; }
    public void setUser(UserDTO user) { this.user = user; }
}
