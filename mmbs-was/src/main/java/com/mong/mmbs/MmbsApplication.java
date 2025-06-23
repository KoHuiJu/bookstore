package com.mong.mmbs;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication(exclude= {UserDetailsServiceAutoConfiguration.class})
public class MmbsApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(MmbsApplication.class, args);
	}
	
	// 코스정책 작성
	
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOriginPatterns(); // 모든 것을 받는다. 각각의 controller대신에서 작성
			}
		};
	}
}
