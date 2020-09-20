package com.MyPage.mypagewebservice.user;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

public class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername, String> {
	
	@Autowired
	UserRepository userRepository;

	@Override
	public boolean isValid(String userName, ConstraintValidatorContext context) {
		User user = userRepository.findByuserName(userName);
		if(user != null) {
			return false;
		}
		return true;
	}

}
