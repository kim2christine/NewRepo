package com.revature.REIMBURSEMENT.PROJECT.controllers;

import com.revature.REIMBURSEMENT.PROJECT.models.DTOs.IncomingUserDTO;
import com.revature.REIMBURSEMENT.PROJECT.models.DTOs.OutgoingUserDTO;
import com.revature.REIMBURSEMENT.PROJECT.services.UserService;
import jakarta.servlet.http.HttpSession;
import com.revature.REIMBURSEMENT.PROJECT.models.DTOs.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/users")
//approving our frontend to talk to this controller
//we're ALSO saying that we're going to allow session data to be passed back and forth
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {

    //autowire user service
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<String> registerUser(@RequestBody IncomingUserDTO userDTO){

        //try to register the user
        try{
            userService.registerUser(userDTO);
            return ResponseEntity.status(201).body(userDTO.getRole() + " was created!");
            //If this all works, send back a 201 CREATED, plus a confirmation message
        } catch (IllegalArgumentException e){
            return ResponseEntity.status(400).body(e.getMessage());
            //If something goes wrong, send back a 400 BAD REQUEST, plus the error message
        }
        //TODO: We'll have checks for DB issues here as well

    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody IncomingUserDTO userDTO, HttpSession session){

        //Get the User object from the service (which talks to the DB)
        Optional<User> optionalUser = userService.loginUser(userDTO);

        //If login fails (which will return an empty optional), tell the user they failed
        if(optionalUser.isEmpty()){
            return ResponseEntity.status(401).body("Login Failed!");
        }

        //If login succeeds store the user info in our session
        User u = optionalUser.get();

        //Storing the user info in our session
        session.setAttribute("userId", u.getUserId());
        session.setAttribute("username", u.getUsername()); //probably won't use this

        //Hypothetical role save to session
        //session.setAttribute("role", u.getRole());

        //Finally, send back a 200 (OK) as well as a OutgoingUserDTO
        return ResponseEntity.ok(new OutgoingUserDTO(u.getUserId(), u.getUsername(), u.getRole()));

    }


    @GetMapping("/allEmployees")
    public ResponseEntity<?> getAllEmployees(HttpSession session){

        //Login check
        if(session.getAttribute("userId") == null && session.getAttribute("role") != "Manager"){
            return ResponseEntity.status(401).body("You must be logged in to see your Employees!");
        }

        //Get the userId from the session
        int userId = (int) session.getAttribute("userId");

        //Why return in many line when one line do trick?
        return ResponseEntity.ok(userService.getAllEmployees());

    }





@PostMapping("/logout")
    public ResponseEntity<String> logoutUser(HttpSession session){
        //If the user is not logged in, send back a 401
        if(session.getAttribute("userId") == null){
            return ResponseEntity.status(401).body("You must be logged in to log out!");
        }

        //If the user is logged in, log them out
        session.invalidate();
        return ResponseEntity.ok("You have been logged out!");
    }






    //delete use by ID
    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable int userId){

        //TODO: take in HttpSession to do the necessary checks
        //delete a user By Id

        try{
            userService.deleteUser(userId);
            return ResponseEntity.ok("User was deleted!");
        } catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }


    @GetMapping
    public ResponseEntity<?> getAllUsers(HttpSession session){
        if(session.getAttribute("userId") == null){
            return ResponseEntity.status(401).body("You must login in to see users");
        }
        if(!"manager".equalsIgnoreCase((String)session.getAttribute("role"))){
            return ResponseEntity.status(401).body("Only managers are allowed to see users");
        }
        return ResponseEntity.ok(userService.allUsers());
    }


}
