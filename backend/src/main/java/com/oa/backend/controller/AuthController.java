package com.oa.backend.controller;

import com.oa.backend.dto.*;
import com.oa.backend.service.AnnouncementService;
import com.oa.backend.service.LeaveService;
import com.oa.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 公共接口，提供登录、用户资料等功能
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    
    private final UserService userService;
    private final LeaveService leaveService;
    private final AnnouncementService announcementService;
    
    /**
     * 登录
     */
    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@RequestBody LoginRequest request) {
        // 模拟登录验证
        if ("admin".equals(request.getUsername()) && "admin123".equals(request.getPassword())) {
            UserDTO user = new UserDTO();
            user.setId(1);
            user.setUsername("admin");
            user.setNickname("管理员");
            user.setEmail("admin@example.com");
            user.setDepartment("hr");
            user.setPosition("ceo");
            user.setRole(1);
            user.setStatus(1);
            
            LoginResponse response = new LoginResponse();
            response.setToken("mock-jwt-token-" + System.currentTimeMillis());
            response.setUser(user);
            
            return ApiResponse.success(response);
        }
        
        return ApiResponse.error("用户名或密码错误");
    }
    
    /**
     * 登出
     */
    @PostMapping("/logout")
    public ApiResponse<Void> logout() {
        return ApiResponse.success("登出成功");
    }
    
    /**
     * 获取用户资料
     */
    @GetMapping("/profile")
    public ApiResponse<UserDTO> getProfile() {
        // 模拟返回当前登录用户
        UserDTO user = new UserDTO();
        user.setId(1);
        user.setUsername("admin");
        user.setNickname("管理员");
        user.setEmail("admin@example.com");
        user.setDepartment("hr");
        user.setPosition("ceo");
        user.setRole(1);
        user.setStatus(1);
        
        return ApiResponse.success(user);
    }
}
