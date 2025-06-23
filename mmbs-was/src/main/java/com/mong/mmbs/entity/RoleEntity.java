package com.mong.mmbs.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "role")
@Entity(name = "role")
public class RoleEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int roleId;
    private String roleName;
    private String description;
}