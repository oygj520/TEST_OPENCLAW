package com.oa.backend.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.oa.backend.dto.LeaveDTO;
import com.oa.backend.dto.ApiResponse;
import com.oa.backend.service.LeaveService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 请假/加班管理 Controller
 */
@RestController
@RequestMapping("/api/leaves")
@RequiredArgsConstructor
public class LeaveController {
    
    private final LeaveService leaveService;
    
    /**
     * 获取请假列表
     */
    @GetMapping
    public ApiResponse<IPage<LeaveDTO>> list(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String type,
            @RequestParam(defaultValue = "1") int current,
            @RequestParam(defaultValue = "10") int size) {
        
        Page<Leave> page = new Page<>(current, size);
        
        IPage<Leave> leavePage = leaveService.page(page, null);
        
        List<LeaveDTO> dtos = leavePage.getRecords().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        
        leavePage.setRecords(dtos);
        
        return ApiResponse.success(leavePage);
    }
    
    /**
     * 获取请假详情
     */
    @GetMapping("/{id}")
    public ApiResponse<LeaveDTO> get(@PathVariable Integer id) {
        Leave leave = leaveService.getById(id);
        LeaveDTO dto = convertToDTO(leave);
        return ApiResponse.success(dto);
    }
    
    /**
     * 创建请假申请
     */
    @PostMapping
    public ApiResponse<LeaveDTO> create(@RequestBody LeaveDTO dto) {
        Leave entity = convertToEntity(dto);
        leaveService.save(entity);
        return ApiResponse.success(convertToDTO(entity));
    }
    
    /**
     * 更新请假申请
     */
    @PutMapping("/{id}")
    public ApiResponse<LeaveDTO> update(@PathVariable Integer id, @RequestBody LeaveDTO dto) {
        dto.setId(id);
        Leave entity = convertToEntity(dto);
        leaveService.updateById(entity);
        return ApiResponse.success(convertToDTO(entity));
    }
    
    /**
     * 删除请假申请
     */
    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Integer id) {
        leaveService.removeById(id);
        return ApiResponse.success("删除成功");
    }
    
    /**
     * 审批请假申请
     */
    @PatchMapping("/{id}/approve")
    public ApiResponse<LeaveDTO> approve(@PathVariable Integer id, 
                                         @RequestParam String status) {
        Leave leave = leaveService.getById(id);
        if (leave != null) {
            leave.setStatus(status);
            leaveService.updateById(leave);
            return ApiResponse.success(convertToDTO(leave));
        }
        return ApiResponse.error("请假申请不存在");
    }
    
    // 转换方法
    private LeaveDTO convertToDTO(Leave entity) {
        if (entity == null) return null;
        LeaveDTO dto = new LeaveDTO();
        dto.setId(entity.getId());
        dto.setUserId(entity.getUserId());
        dto.setType(entity.getType());
        dto.setStartDate(entity.getStartDate());
        dto.setEndDate(entity.getEndDate());
        dto.setDays(entity.getDays());
        dto.setReason(entity.getReason());
        dto.setStatus(entity.getStatus());
        dto.setApprovedBy(entity.getApprovedBy());
        dto.setApprovedAt(entity.getApprovedAt());
        dto.setCreateTime(entity.getCreateTime());
        dto.setUpdateTime(entity.getUpdateTime());
        
        // 设置扩展字段
        dto.setLeaveTypeName(getLeaveTypeName(entity.getType()));
        
        return dto;
    }
    
    private Leave convertToEntity(LeaveDTO dto) {
        if (dto == null) return null;
        Leave entity = new Leave();
        entity.setId(dto.getId());
        entity.setUserId(dto.getUserId());
        entity.setType(dto.getType());
        entity.setStartDate(dto.getStartDate());
        entity.setEndDate(dto.getEndDate());
        entity.setDays(dto.getDays());
        entity.setReason(dto.getReason());
        entity.setStatus(dto.getStatus());
        entity.setApprovedBy(dto.getApprovedBy());
        entity.setApprovedAt(dto.getApprovedAt());
        return entity;
    }
    
    private String getLeaveTypeName(String type) {
        switch (type) {
            case "leave": return "事假";
            case "overtime": return "加班";
            case "business_trip": return "出差";
            case "sick": return "病假";
            default: return type;
        }
    }
}
