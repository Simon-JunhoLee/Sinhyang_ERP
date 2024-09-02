package com.sinhyangERP.ERP;

import javax.sql.DataSource;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.mybatis.spring.SqlSessionFactoryBean;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

@Configuration
@PropertySource("classpath:/application.properties")
public class MysqlConfig {	
	@Bean
	@ConfigurationProperties(prefix="spring.datasource.hikari")
	HikariConfig hikariConfig() {
		return new HikariConfig();
	}

	@Bean
	DataSource dataSource() throws Exception {
		DataSource dataSource = new HikariDataSource(hikariConfig());
		System.out.println("dataSource:" + dataSource.toString());
		return dataSource;
	}

	@Bean
	SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
		SqlSessionFactoryBean sessionFactory=new SqlSessionFactoryBean();
		sessionFactory.setDataSource(dataSource);
		Resource[] resources=new PathMatchingResourcePatternResolver().getResources("classpath:/mapper/*/*Mapper.xml");
		sessionFactory.setMapperLocations(resources);
		return sessionFactory.getObject();
	}

	@Bean
	SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sqlSessionFactioy) throws Exception {
		return new SqlSessionTemplate(sqlSessionFactioy);
	}
	
    @Bean
    DataSourceTransactionManager txManager(DataSource dataSource) {
       return new DataSourceTransactionManager(dataSource);
    }
	
	@Bean
	PasswordEncoder endcoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http)throws Exception{
		http.csrf(csrf->csrf.disable());
		return http.build();
	}	
	
}
