package com.revature.REIMBURSEMENT.PROJECT.DAOS;


import com.revature.REIMBURSEMENT.PROJECT.models.DTOs.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserDAO extends JpaRepository<User, Integer> {

    //We need to add a custom method to find a user by username and password
    //This is what we'll use to check for valid login credentials
    public Optional<User> findByUsernameAndPassword(String username, String password);
    Optional<User> findByUsername(String username);

}