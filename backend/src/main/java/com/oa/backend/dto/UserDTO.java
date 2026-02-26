package com.oa.backend.dto;

import java.io.Serializable;

/**
 * 用户信息 DTO
 */
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

    // Getters and Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    
    public String getNickname() { return nickname; }
    public void setNickname(String nickname) { this.nickname = nickname; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    
    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }
    
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    
    public String getPosition() { return position; }
    public void setPosition(String position) { this.position = position; }
    
    public Integer getRole() { return role; }
    public void setRole(Integer role) { this.role = role; }
    
    public Integer getStatus() { return status; }
    public void setStatus(Integer status) { this.status = status; }
}
