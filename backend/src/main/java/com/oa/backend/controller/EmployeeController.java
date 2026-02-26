package com.oa.backend.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.oa.backend.dto.UserDTO;
import com.oa.backend.dto.ApiResponse;
import com.oa.backend.entity.User;
import com.oa.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 员工管理 Controller
 */
@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
public class EmployeeController {
    
    private final UserService userService;
    
    /**
     * 获取员工列表
     */
    @GetMapping
    public ApiResponse<IPage<UserDTO>> list(
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "1") int current,
            @RequestParam(defaultValue = "10") int size) {
        
        Page<User> page = new Page<>(current, size);
        
        IPage<User> userPage = userService.page(page, null);
        
        List<UserDTO> dtos = userPage.getRecords().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        
        userPage.setRecords(dtos);
        
        return ApiResponse.success(userPage);
    }
    
    /**
     * 获取员工详情
     */
    @GetMapping("/{id}")
    public ApiResponse<UserDTO> get(@PathVariable Integer id) {
        User user = userService.getById(id);
        UserDTO dto = convertToDTO(user);
        return ApiResponse.success(dto);
    }
    
    /**
     * 创建员工
     */
    @PostMapping
    public ApiResponse<UserDTO> create(@RequestBody UserDTO dto) {
        User entity = convertToEntity(dto);
        userService.save(entity);
        return ApiResponse.success(convertToDTO(entity));
    }
    
    /**
     * 更新员工
     */
    @PutMapping("/{id}")
    public ApiResponse<UserDTO> update(@PathVariable Integer id, @RequestBody UserDTO dto) {
        dto.setId(id);
        User entity = convertToEntity(dto);
        userService.updateById(entity);
        return ApiResponse.success(convertToDTO(entity));
    }
    
    /**
     * 删除员工
     */
    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Integer id) {
        userService.removeById(id);
        return ApiResponse.success("删除成功");
    }
    
    // 转换方法
    private UserDTO convertToDTO(User entity) {
        if (entity == null) return null;
        UserDTO dto = new UserDTO();
        dto.setId(entity.getId());
        dto.setUsername(entity.getUsername());
        dto.setNickname(entity.getNickname());
        dto.setEmail(entity.getEmail());
        dto.setPhone(entity.getPhone());
        dto.setAvatar(entity.getAvatar());
        dto.setDepartment(entity.getDepartment());
        dto.setPosition(entity.getPosition());
        dto.setRole(entity.getRole());
        dto.setStatus(entity.getStatus());
        return dto;
    }
    
    private User convertToEntity(UserDTO dto) {
        if (dto == null) return null;
        User entity = new User();
        entity.setId(dto.getId());
        entity.setUsername(dto.getUsername());
        entity.setNickname(dto.getNickname());
        entity.setEmail(dto.getEmail());
        entity.setPhone(dto.getPhone());
        entity.setAvatar(dto.getAvatar());
        entity.setDepartment(dto.getDepartment());
        entity.setPosition(dto.getPosition());
        entity.setRole(dto.getRole());
        entity.setStatus(dto.getStatus());
        return entity;
    }
}
