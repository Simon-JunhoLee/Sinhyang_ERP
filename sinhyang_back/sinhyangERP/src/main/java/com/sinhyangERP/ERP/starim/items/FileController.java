package com.sinhyangERP.ERP.starim.items;


import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FileController {
	
	//이미지보기
	@GetMapping("/display")
	public ResponseEntity<Resource> display(@RequestParam("file") String file) {
		 try {
		        // URL 디코딩을 통해 공백을 처리하고, 역슬래시를 슬래시로 변환
		        String filePath = URLDecoder.decode(file, StandardCharsets.UTF_8.name()).replace("\\", "/");
		        // 파일 시스템 리소스 경로 설정
		        String absolutePath = "c:" + filePath;
		        Resource resource = new FileSystemResource(absolutePath);
		        // 파일의 MIME 타입 추출하여 설정
		        HttpHeaders headers = new HttpHeaders();
		        headers.add("Content-Type", Files.probeContentType(Paths.get(absolutePath)));
		        // 이미지 파일 반환
		        return ResponseEntity.ok()
		                             .headers(headers)
		                             .body(resource);
		    } catch (Exception e) {
		        System.out.println("오류:" + e.toString());
		        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		    }
	}

}
