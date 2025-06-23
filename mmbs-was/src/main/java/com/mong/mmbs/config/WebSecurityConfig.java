package com.mong.mmbs.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.mong.mmbs.filter.JwtAuthenticationFilter;
@Configuration
//// config로 환경설정된다.
@EnableWebSecurity
//// WebSecurity 작업을 할 것이다. >>을 하면
public class WebSecurityConfig {
	
	@Autowired JwtAuthenticationFilter jwtAuthencationFilter;
	
	
	//// 자바 빈으로 설정 이 공간에서만 사용..?
	@Bean
	protected SecurityFilterChain configure(HttpSecurity httpSecurity) throws Exception {
//	httpSecurity.csrf().disable();
		// >> 매개변수를 httpSecurity로 받는다. //// http통신에서 보안과 관련된 객체
		
		httpSecurity //// 설정 맞추기
			// cors 정책 (현재는 Application에서 작업을 해두었으므로 기본 설정 사용)
			.cors().and()
			// csrf 대책 (현재는 CSRF에 대한 대책을 비활성화)
			.csrf().disable()
			// Basic 인증 (현재는 Bearer token 인증방법을 사용하기 때문에 비활성화)
			.httpBasic().disable()
			// 세션 기반 인증 (현재는 Session 기반 인증을 사용하지 않기 때문에 상태를 없앤다.)
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
			// '/', '/api/auth' 모듈에 대해서는 모두 허용 (인증을 하지 않고 사용 가능하게 함) //// 실제 구현되는 곳 //// request와 관련된 인증의 규칙을 만드는 것 

			.authorizeRequests().antMatchers("/", "/api/auth/**", "/api/book/**", "/api/paymentInfo/**", "/api/orderInfo/**", "/api/orderPayment/**","/api/dtl/**","/api/best/**","/api/gift/**","/api/Image/**","/api/serch**", "/api/pay/**", "/api/searchEmail/**", "/sendPwd/**" ).permitAll() 

			// 나머지 Request에 대해서는 모두 인증된 사용자만 사용가능하게 함 (인증을 해야만 사용가능!)
			.anyRequest().authenticated();
		
		httpSecurity.addFilterBefore(jwtAuthencationFilter, UsernamePasswordAuthenticationFilter.class);
		// 인증과 관련된 httpSecurity 객체에 여러가지 필터 중에서 >>
		// >> UsernamePasswordAuthenticationFilter.class 필터 이전에 jwtAuthencationFilter을 붙일 것이다.
		
		return httpSecurity.build();
		// 수정한 것을 적용 시키는 단계
	}
}

//// 필터들이 돌때 httpSecurity가 필터집단들 중에 우리가 만든 필터가 포함되어서 거치게 된다.
//// 거치게 되면 userId를 받아서 비즈니스 로직으로 가게 된다. 
//// >> BoardController
