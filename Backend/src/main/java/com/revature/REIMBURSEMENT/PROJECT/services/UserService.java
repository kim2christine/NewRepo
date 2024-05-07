package com.revature.REIMBURSEMENT.PROJECT.services;


import com.revature.REIMBURSEMENT.PROJECT.DAOS.UserDAO;
import com.revature.REIMBURSEMENT.PROJECT.models.DTOs.IncomingUserDTO;

import com.revature.REIMBURSEMENT.PROJECT.models.DTOs.OutgoingUserDTO;
import com.revature.REIMBURSEMENT.PROJECT.models.DTOs.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


//Service Classes are used for data processing between controllers and DAOs
//anything we need to do between HTTP and the Database is done here
//Error handling
//Data mutations
//Data validations
//more!

@Service
public class UserService {

    //autowire the UserDAO
    private UserDAO userDAO;

    @Autowired
    public UserService(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    //register user
    public User registerUser(IncomingUserDTO userDTO) throws IllegalArgumentException {

        //Check the username and password are not empty/null
        if (userDTO.getUsername().isBlank() || userDTO.getUsername() == null) {
            throw new IllegalArgumentException("Username cannot be empty");
        }

        if (userDTO.getPassword().isBlank() || userDTO.getPassword() == null) {
            throw new IllegalArgumentException("Password cannot be empty");
        }

        //also check that the username isn't vulgar
        if (userDTO.getUsername().equals("JavaScript")) {
            throw new IllegalArgumentException("Username cannot be JavaScript");
        }

        //we could definitely check if the DTO is null too,
        //but we're going to assume we've written good code
        if (userDTO == null) {
            throw new IllegalArgumentException("This probably won't get thrown if we've written good code");
        }

        //TODO: We could have made an exception handling service to clean all this up, which is typical

        //if all checks pass, we can create a new User based off the DTO and send it to the DAO
        User newUser = new User(userDTO.getUsername(), userDTO.getPassword(), userDTO.getRole());

        //save the user to the database and return that user at the same time
        return userDAO.save(newUser);

    }

    //This service will facilitate login - get a user from the DAO (or null)
    public Optional<User> loginUser(IncomingUserDTO userDTO) throws IllegalArgumentException {

        //TODO: validity checks

        //if all checks pass, return a User OR null, and send it to the controller
        return userDAO.findByUsernameAndPassword(userDTO.getUsername(), userDTO.getPassword());

    }

    public void deleteUser(int userId) {
        //delete a user by id
        userDAO.deleteById(userId);

    }

    public List<OutgoingUserDTO> getAllEmployees() {


        List<User> allUser = UserDAO.findAll();

        List<OutgoingUserDTO> outUser = new ArrayList<>();

        for (User p : allUser) {
            OutgoingUserDTO outP = new OutgoingUserDTO(
                    p.getUserId(),
                    p.getUsername(),
                    p.getRole()
            );

            outUser.add(outP);
        }
        return outUser;
    }
}