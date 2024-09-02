package com.sinhyangERP.ERP.han.visitor;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.sinhyangERP.ERP.starim.items.ItemsVO;



@RestController
@RequestMapping("/web/visitor")
public class VisitorController {
	@Autowired
	VisitorDAO dao;
	
	@Autowired
	PasswordEncoder encoder;
	
	@GetMapping("/check/{visitor_id}")
	public VisitorVO check(@PathVariable("visitor_id") String visitor_id) {
		return dao.check(visitor_id);
	}
	
	@PostMapping("/login")
	public int login(@RequestBody VisitorVO vo) {
	    int result = 0;
	    VisitorVO visitor = dao.login(vo.getVisitor_id());
	    if (visitor != null) {
	        if (visitor.getVisitor_state() == 0) {
	            result = 3; // 탈퇴한 회원 0 리턴
	        } else {
	            // 암호화비번 검증
	            if (encoder.matches(vo.getVisitor_pass(), visitor.getVisitor_pass())) {
	                result = 1; // 로그인 성공 1 리턴
	            } else {
	                result = 2; // 비밀번호 틀림 2 리턴
	            }
	        }
	    } else {
	        // 아이디 미입력 or 아이디 틀림 0리턴
	        result = 0;
	    }
		System.out.println(visitor);
		return result;
	}
	
	@PostMapping("/insert")
	public void insert(@RequestBody VisitorVO vo) {
		//비밀번호 암호화
		String vpass = encoder.encode(vo.getVisitor_pass());
		vo.setVisitor_pass(vpass);
		dao.insert(vo);
				
	}
	
	@GetMapping("/mypage/{visitor_id}")
	public VisitorVO mypage(@PathVariable("visitor_id") String visitor_id) {
		return dao.mypage(visitor_id);
	}
	
	@PostMapping("/update")
	public void update(@RequestBody VisitorVO vo) {
		//비밀번호 암호화
		String vpass = encoder.encode(vo.getVisitor_pass());
		vo.setVisitor_pass(vpass);
		dao.update(vo);
	}
	
	@PostMapping("/updatePhoto")
    public void updatePhoto(@RequestParam("visitor_id") String visitor_id, 
                            @RequestParam("visitor_photo") MultipartFile file) throws IllegalStateException, IOException {
        //파일업로드
        String filePath = "C:/team/sinhyang-ERP-front/public/images/visitor/";
        String fileName = visitor_id + ".jpg";
        File oldFile = new File(filePath + fileName);

        if (oldFile.exists()) {
            oldFile.delete();
        }

        file.transferTo(new File(filePath + fileName));

        //이미지업로드한걸로 업데이트
        VisitorVO vo = new VisitorVO();
        vo.setVisitor_id(visitor_id);
        vo.setVisitor_photo("/display?file=" + filePath + fileName);
        dao.updatePhoto(vo);
    }
	
	@PutMapping("/delete/{visitor_id}")
	public void delete(@PathVariable("visitor_id") String visitor_id) {
		dao.delete(visitor_id);
	}
	

	@Autowired
	private VisitorService visitorService;
	@PostMapping("/searchid")
    public ResponseEntity<String> searchid(@RequestBody VisitorEmailRequest request) {		
        visitorService.searchid(request.getVisitor_email());
        return ResponseEntity.ok("입력한 이메일로 아이디가 전송되었습니다.");
	}

	
    @PostMapping("/searchpass")
    public ResponseEntity<String> resetPassword(@RequestBody VisitorPassRequest request) {
        try {
            visitorService.resetPassword(request.getVisitor_id(), request.getVisitor_email());
            return ResponseEntity.ok("해당 이메일로 새 비밀번호를 전송했습니다.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
	
}