package com.oa.backend.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.oa.backend.dto.AnnouncementDTO;
import com.oa.backend.dto.ApiResponse;
import com.oa.backend.entity.Announcement;
import com.oa.backend.service.AnnouncementService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 公告管理 Controller
 */
@RestController
@RequestMapping("/api/announcements")
@RequiredArgsConstructor
public class AnnouncementController {
    
    private final AnnouncementService announcementService;
    
    /**
     * 获取公告列表
     */
    @GetMapping
    public ApiResponse<IPage<AnnouncementDTO>> list(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String priority,
            @RequestParam(defaultValue = "1") int current,
            @RequestParam(defaultValue = "10") int size) {
        
        Page<Announcement> page = new Page<>(current, size);
        
        // 构建条件
        IPage<Announcement> announcementPage = announcementService.page(page, null);
        
        // 转换为 DTO
        List<AnnouncementDTO> dtos = announcementPage.getRecords().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        
        announcementPage.setRecords(dtos);
        
        return ApiResponse.success(announcementPage);
    }
    
    /**
     * 获取公告详情
     */
    @GetMapping("/{id}")
    public ApiResponse<AnnouncementDTO> get(@PathVariable Integer id) {
        Announcement announcement = announcementService.getById(id);
        AnnouncementDTO dto = convertToDTO(announcement);
        return ApiResponse.success(dto);
    }
    
    /**
     * 创建公告
     */
    @PostMapping
    public ApiResponse<AnnouncementDTO> create(@RequestBody AnnouncementDTO dto) {
        Announcement entity = convertToEntity(dto);
        announcementService.save(entity);
        return ApiResponse.success(convertToDTO(entity));
    }
    
    /**
     * 更新公告
     */
    @PutMapping("/{id}")
    public ApiResponse<AnnouncementDTO> update(@PathVariable Integer id, @RequestBody AnnouncementDTO dto) {
        dto.setId(id);
        Announcement entity = convertToEntity(dto);
        announcementService.updateById(entity);
        return ApiResponse.success(convertToDTO(entity));
    }
    
    /**
     * 删除公告
     */
    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Integer id) {
        announcementService.removeById(id);
        return ApiResponse.success("删除成功");
    }
    
    // 转换方法
    private AnnouncementDTO convertToDTO(Announcement entity) {
        if (entity == null) return null;
        AnnouncementDTO dto = new AnnouncementDTO();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setContent(entity.getContent());
        dto.setType(entity.getType());
        dto.setPriority(entity.getPriority());
        dto.setPublishDate(entity.getPublishDate());
        dto.setExpirationDate(entity.getExpirationDate());
        dto.setCreatorId(entity.getCreatorId());
        dto.setCreateTime(entity.getCreateTime());
        dto.setUpdateTime(entity.getUpdateTime());
        return dto;
    }
    
    private Announcement convertToEntity(AnnouncementDTO dto) {
        if (dto == null) return null;
        Announcement entity = new Announcement();
        entity.setId(dto.getId());
        entity.setTitle(dto.getTitle());
        entity.setContent(dto.getContent());
        entity.setType(dto.getType());
        entity.setPriority(dto.getPriority());
        entity.setPublishDate(dto.getPublishDate());
        entity.setExpirationDate(dto.getExpirationDate());
        entity.setCreatorId(dto.getCreatorId());
        return entity;
    }
}
