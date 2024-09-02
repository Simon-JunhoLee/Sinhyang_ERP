
package com.sinhyangERP.ERP.han.visitor;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class VisitorService {

    @Autowired
    private VisitorDAO visitorDAO;

    @Autowired
    private EmailService emailService;
    
	@Autowired
	PasswordEncoder encoder;
    
	//아이디찾기 이메일 보내기
    public void searchid(String visitor_email) {
    	try {
    	VisitorVO visitor = visitorDAO.searchid(visitor_email);
    	if (visitor != null  && visitor.getVisitor_id() != null) {
    		String subject = "아이디 찾기";
    		String text = "아이디는 " + visitor.getVisitor_id() + " 입니다.";
    		emailService.sendEmail(visitor_email, subject, text);
    	}else {
    		throw new RuntimeException("검색된 아이디가 없습니다.");
    	}
    	}catch(Exception e) {
    		e.printStackTrace();
    		throw new RuntimeException("메일전송중 오류", e);
    	}
    }
    
    //랜덤비번생성함수
    private String generateRandomPassword() {
        int length = 8;
        String charSet = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
        Random random = new Random();
        StringBuilder password = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            password.append(charSet.charAt(random.nextInt(charSet.length())));
        }
        return password.toString();
    }
    //새비번설정 이메일 보내기
    public void resetPassword(String visitor_id, String visitor_email) {
        VisitorVO visitor = visitorDAO.matchpass(visitor_id, visitor_email);
        if (visitor == null) {
            throw new RuntimeException("해당하는 데이터가 없습니다.");
        }

        // 랜덤 비밀번호 생성
        String newPassword = generateRandomPassword();
        System.out.println("랜덤비번만들기 : " + newPassword);
        // 비밀번호 암호화
        String encodedPassword = encoder.encode(newPassword);
        System.out.println("암호화된비번 : " + encodedPassword);
        // DB에 비밀번호 업데이트
        visitorDAO.updatepass(visitor_id, encodedPassword);

        // 이메일 전송
        String subject = "임시 비밀번호 발송";
        String text = "임시 비밀번호는 " + newPassword + " 입니다.";
        emailService.sendEmail(visitor_email, subject, text);
    }
}