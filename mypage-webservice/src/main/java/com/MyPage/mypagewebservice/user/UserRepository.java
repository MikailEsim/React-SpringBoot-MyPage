package com.MyPage.mypagewebservice.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {

	User findByuserName(String userName);
	
}
