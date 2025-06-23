package com.mong.mmbs.filter;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import com.mong.mmbs.security.TokenProvider;
@Component //// ( )을 외부에서 주입
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	//// request에 대한 필터를 적용시키겠다. >> 필터 생성
	
	// Request가 들어왔을 때 Request Header의 Authorization 필드의 Bearer Token을 가져옴
	// 가져온 토큰을 검증하고 검증 결과를 SecurityContext에 추가
	
	@Autowired private TokenProvider tokenProvider;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
		////상속받으면 doFilterInternal을 필터로 무엇을 작동시킬것인가 >> 필터에서 실제로 돌아갈 녀석
		//// request에 대한 필터 이기 때문에 Http~를 받고, response 시켜줄거기 때문에 httpRespnse~ 받고, 필터간의 관계에 대한 객체를 받아온다.
			throws ServletException, IOException {
		
		try {
			String token = parseBearerToken(request);
			//// 인증과 관련된 인증 정보를 request header에 포함해서 가져온다. //// 밑에 header에 담아오는
			//// 토큰이 오거나 null이 오게 된다.
			
			if (token != null && !token.equalsIgnoreCase("null")) {
				// 토큰 검증해서 payload의 userId를 가져옴
				//// 문자열로 null 이 아니면서 실제 null값이 아니면
				String userId = tokenProvider.validate(token);
				//// TokenProvider에 있는 token을 복호화한다. 그리고 그곳에 있는 실제 값을 가지고 온다. userId
				
				// SecurityContext에 추가할 객체
				//// 복호화를 하고 가져온 userId를 비즈니스 로직 클래스에서 사용해야한다.
				//// 반환하는 형태가 아니기 때문에메서드가 끝나더라도 비즈니스로직에서 userId를 사용할 수 있도록 어딘가에 담아 두어야 한다.
				AbstractAuthenticationToken authentication =
						//// 이렇게 포장해서 >>
						new UsernamePasswordAuthenticationToken(userId, null, AuthorityUtils.NO_AUTHORITIES);
						//// 객체를 담기 위한 생성 (principal에 userId, credentilas에 null, authorities 지정X)
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				//// 받을 때 request에 담아서 가져온다.
				//// !userId를 가져온다!
				
				// securityContext에 AbstractAuthenticationToken 객체를 추가해서
				// 해당 Thread가 지속적으로 인증 정보를 가질 수 있도록 해줌
				SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
				//// 담을 바구니 생성
				securityContext.setAuthentication(authentication);
				//// 포장한 userId 담기
				SecurityContextHolder.setContext(securityContext);
				//// Holding >> 여기에 담긴다.
				//// 비즈니스 로직에 가기전 데이터를 담아 놓은 상태!!!!
				//// 필터가 Token을 가져와서 인증해서 우리가 실제 비즈니스 로직에서 받아올 수 있도록 담았다.
				
			}
		} catch (Exception exception) {
			exception.printStackTrace();
		}	
		
		filterChain.doFilter(request, response);
		//// 이녀석을 적용 시켜야 다음 필터를 적용한다.
	}
	
	// Request Header에서 Authorization 필드의 Bearer Token을 가져오는 메서드
	private String parseBearerToken(HttpServletRequest request) {
		String bearerToken = request.getHeader("Authorization");
		//// request안에 있는 header에서 authorization라는 필드명으로 파트를 가져올 것이다.
		//// Bearer eyJhbGciOiJIUzUxMiJ9.
		////        여기 부터 가져오는 메서드는 if문
		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer "))
			//// 이 변수가 null이거나 빈 문자열이거나 공백으로 만 구성되어 있으면 false를 나타낸다.
			//// 그리고 이 문자열이 Bearer 공백 으로 시작되느냐
			return bearerToken.substring(7);
		return null;
		//// 아무것도 없으면 null 반환
	}
}
//// 담아놓은 것을 쓰기 위해서 WebSecurityConfig
